/**
 * Mock API layer — localStorage-backed state machine.
 * Completely replaces Supabase for local development / preview.
 * Every async endpoint wraps results in an 800 ms setTimeout promise
 * to force beautiful loading states in the UI.
 */

import type { Booking, Subscriber } from "./types"

// ── Pricing catalog (used for analytics) ────────────────────────────
export const PRICING_CATALOG = {
    treatments: {
        "Smooth & Tighten": 400,
        "Sculpt & Contour": 800,
        "Brighten & Hydrate": 250,
        "HydraFacial Signature": 350,
        "Botox & Fillers": 650,
        "Laser Skin Resurfacing": 900,
        "Microneedling RF": 550,
        "IV Wellness Drip": 250,
        "Signature Chemical Peel": 300,
    },
    packages: {
        "The Event Glow Bundle": 295,
        "The Contour & Lift": 850,
        "The Skin Renewal Trilogy": 1200,
        "The Essential": 350,
        "The Radiance Membership": 890,
        "The Icon": 2400,
    },
} as const

// ── Storage helpers ─────────────────────────────────────────────────
const BOOKINGS_KEY = "aura_bookings"
const SUBSCRIBERS_KEY = "aura_subscribers"
const LATENCY = 800 // ms

function delay<T>(value: T): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY))
}

let bookingId = 0
let subscriberId = 0

function readBookings(): Booking[] {
    if (typeof window === "undefined") return []
    try {
        const raw = localStorage.getItem(BOOKINGS_KEY)
        if (!raw) return []
        return JSON.parse(raw)
    } catch {
        return []
    }
}

function writeBookings(bookings: Booking[]) {
    if (typeof window === "undefined") return
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
}

function readSubscribers(): Subscriber[] {
    if (typeof window === "undefined") return []
    try {
        const raw = localStorage.getItem(SUBSCRIBERS_KEY)
        if (!raw) return []
        return JSON.parse(raw)
    } catch {
        return []
    }
}

function writeSubscribers(subscribers: Subscriber[]) {
    if (typeof window === "undefined") return
    localStorage.setItem(SUBSCRIBERS_KEY, JSON.stringify(subscribers))
}

function nextBookingId(): number {
    const existing = readBookings()
    bookingId = existing.reduce((max, b) => Math.max(max, b.id), 0) + 1
    return bookingId
}

function nextSubscriberId(): number {
    const existing = readSubscribers()
    subscriberId = existing.reduce((max, s) => Math.max(max, s.id), 0) + 1
    return subscriberId
}

// ── Event system for cross-component reactivity ─────────────────────
type Listener = () => void
const listeners = new Set<Listener>()

export function onDataChange(fn: Listener): () => void {
    listeners.add(fn)
    return () => { listeners.delete(fn) }
}

function notifyChange() {
    listeners.forEach((fn) => fn())
}

// ── Bookings API ────────────────────────────────────────────────────
export type CreateBookingInput = {
    fullName: string
    email: string
    phone: string
    treatment: string
    branch: string
    price: number
    bookingDate: string
    bookingTime: string
    notes?: string
}

export type ActionResult = { ok: true; id: number } | { ok: false; error: string }

export async function getBookedSlots(branch: string, bookingDate: string): Promise<string[]> {
    if (!branch || !bookingDate) return delay([])
    const bookings = readBookings()
    const slots = bookings
        .filter((b) => b.branch === branch && b.booking_date === bookingDate)
        .map((b) => b.booking_time)
    return delay(slots)
}

export async function createBooking(input: CreateBookingInput): Promise<ActionResult> {
    const { fullName, email, phone, treatment, branch, bookingDate, bookingTime } = input

    if (!fullName || !email || !phone || !treatment || !branch || !bookingDate || !bookingTime) {
        return delay({ ok: false, error: "Please complete every field to confirm your appointment." } as ActionResult)
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailValid) return delay({ ok: false, error: "Please enter a valid email address." } as ActionResult)

    // Double-booking check
    const bookings = readBookings()
    const taken = bookings
        .filter((b) => b.branch === branch && b.booking_date === bookingDate)
        .map((b) => b.booking_time)
    if (taken.includes(bookingTime)) {
        return delay({ ok: false, error: "That time was just reserved. Please choose another slot." } as ActionResult)
    }

    const id = nextBookingId()
    const newBooking: Booking = {
        id,
        full_name: fullName,
        email,
        phone,
        treatment,
        branch,
        price: input.price,
        booking_date: bookingDate,
        booking_time: bookingTime,
        notes: input.notes ?? null,
        status: "pending",
        created_at: new Date().toISOString(),
    }

    bookings.unshift(newBooking)
    writeBookings(bookings)
    notifyChange()

    return delay({ ok: true, id } as ActionResult)
}

export async function updateBookingStatus(id: number, status: string): Promise<ActionResult> {
    const bookings = readBookings()
    const idx = bookings.findIndex((b) => b.id === id)
    if (idx === -1) return delay({ ok: false, error: "Booking not found." } as ActionResult)

    bookings[idx] = { ...bookings[idx], status }
    writeBookings(bookings)
    notifyChange()

    return delay({ ok: true, id } as ActionResult)
}

export async function getBookings(): Promise<Booking[]> {
    return delay(readBookings())
}

// ── Subscribers API ─────────────────────────────────────────────────
export type SubscribeResult = { ok: true } | { ok: false; error: string }

export async function subscribe(email: string, source = "footer"): Promise<SubscribeResult> {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailValid) return delay({ ok: false, error: "Please enter a valid email address." } as SubscribeResult)

    const subscribers = readSubscribers()
    const exists = subscribers.some((s) => s.email === email.toLowerCase())
    if (exists) return delay({ ok: true } as SubscribeResult) // silently accept duplicates

    const id = nextSubscriberId()
    const newSub: Subscriber = {
        id,
        email: email.toLowerCase(),
        source,
        created_at: new Date().toISOString(),
    }

    subscribers.unshift(newSub)
    writeSubscribers(subscribers)
    notifyChange()

    return delay({ ok: true } as SubscribeResult)
}

export async function getSubscribers(): Promise<Subscriber[]> {
    return delay(readSubscribers())
}
