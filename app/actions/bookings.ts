"use server"

import { db } from "@/lib/db"
import { bookings } from "@/lib/db/schema"
import { and, desc, eq } from "drizzle-orm"
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
  const rows = await db
    .select({ bookingTime: bookings.bookingTime })
    .from(bookings)
    .where(
      and(
        eq(bookings.branch, branch),
        eq(bookings.bookingDate, bookingDate),
      ),
    )
  return rows.map((r) => r.bookingTime)
}

export async function createBooking(input: CreateBookingInput): Promise<ActionResult> {
  const { fullName, email, phone, treatment, branch, bookingDate, bookingTime } = input

  if (!fullName || !email || !phone || !treatment || !branch || !bookingDate || !bookingTime) {
    return { ok: false, error: "Please complete every field to confirm your appointment." }
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailValid) return { ok: false, error: "Please enter a valid email address." }

  // Prevent double-booking the same slot at the same branch.
  const taken = await getBookedSlots(branch, bookingDate)
  if (taken.includes(bookingTime)) {
    return { ok: false, error: "That time was just reserved. Please choose another slot." }
  }

  const [row] = await db
    .insert(bookings)
    .values({
      fullName,
      email,
      phone,
      treatment,
      branch,
      price: input.price,
      bookingDate,
      bookingTime,
      notes: input.notes ?? null,
      status: "pending",
    })
    .returning({ id: bookings.id })

  revalidatePath("/")
  return { ok: true, id: row.id }
}

export async function updateBookingStatus(id: number, status: BookingStatus): Promise<ActionResult> {
  if (!BOOKING_STATUSES.includes(status)) {
    return { ok: false, error: "Invalid status." }
  }
  await db.update(bookings).set({ status }).where(eq(bookings.id, id))
  revalidatePath("/")
  return { ok: true, id }
}

export async function getBookings() {
  return db.select().from(bookings).orderBy(desc(bookings.createdAt))
}
