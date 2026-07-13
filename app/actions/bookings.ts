"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { BOOKING_STATUSES, type BookingStatus } from "@/lib/constants"

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
  if (!branch || !bookingDate) return []
  const { data, error } = await supabase
    .from("bookings")
    .select("booking_time")
    .eq("branch", branch)
    .eq("booking_date", bookingDate)
  if (error) return []
  return (data ?? []).map((r) => r.booking_time as string)
}

export async function createBooking(input: CreateBookingInput): Promise<ActionResult> {
  const { fullName, email, phone, treatment, branch, bookingDate, bookingTime } = input

  if (!fullName || !email || !phone || !treatment || !branch || !bookingDate || !bookingTime) {
    return { ok: false, error: "Please complete every field to confirm your appointment." }
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailValid) return { ok: false, error: "Please enter a valid email address." }

  const taken = await getBookedSlots(branch, bookingDate)
  if (taken.includes(bookingTime)) {
    return { ok: false, error: "That time was just reserved. Please choose another slot." }
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert({
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
    })
    .select("id")
    .single()

  if (error) return { ok: false, error: "Something went wrong. Please try again." }

  revalidatePath("/")
  return { ok: true, id: data.id }
}

export async function updateBookingStatus(id: number, status: BookingStatus): Promise<ActionResult> {
  if (!BOOKING_STATUSES.includes(status)) {
    return { ok: false, error: "Invalid status." }
  }
  const { error } = await supabase.from("bookings").update({ status }).eq("id", id)
  if (error) return { ok: false, error: "Failed to update status." }
  revalidatePath("/")
  return { ok: true, id }
}

export async function getBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) return []
  return data ?? []
}
