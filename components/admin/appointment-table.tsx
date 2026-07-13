"use client"

import { useTransition } from "react"
import { Loader as Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { updateBookingStatus } from "@/app/actions/bookings"
import { BOOKING_STATUSES, type BookingStatus } from "@/lib/constants"
import type { Booking } from "@/lib/types"

type Props = {
  bookings: Booking[]
}

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: "bg-gold/15 text-gold border-gold/30",
  confirmed: "bg-primary/15 text-primary border-primary/30",
  completed: "bg-primary/10 text-primary border-primary/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
}

export function AppointmentTable({ bookings }: Props) {
  const [isPending, startTransition] = useTransition()

  function cycleStatus(booking: Booking) {
    const currentIdx = BOOKING_STATUSES.indexOf(booking.status as BookingStatus)
    const next = BOOKING_STATUSES[(currentIdx + 1) % BOOKING_STATUSES.length]
    startTransition(async () => {
      await updateBookingStatus(booking.id, next)
    })
  }

  if (bookings.length === 0) {
    return (
      <div className="glass rounded-2xl border border-border/60 p-12 text-center">
        <p className="font-serif text-xl">No appointments yet</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Bookings from the client homepage will appear here in real time.
        </p>
      </div>
    )
  }

  return (
    <div className="glass overflow-hidden rounded-2xl border border-border/60">
      <div className="border-b border-border px-6 py-5">
        <h3 className="font-serif text-lg">Appointments</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Click a status badge to cycle through states
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Service</th>
              <th className="px-6 py-3 font-medium">Location</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Time</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bookings.map((b) => (
              <tr key={b.id} className="transition-colors hover:bg-muted/30">
                <td className="px-6 py-4">
                  <p className="font-medium">{b.full_name}</p>
                  <p className="text-xs text-muted-foreground">{b.email}</p>
                </td>
                <td className="px-6 py-4">{b.treatment}</td>
                <td className="px-6 py-4 text-muted-foreground">{b.branch}</td>
                <td className="px-6 py-4 text-muted-foreground">
                  {new Date(b.booking_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="px-6 py-4 text-muted-foreground">{b.booking_time}</td>
                <td className="px-6 py-4 font-medium">${b.price}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => cycleStatus(b)}
                    disabled={isPending}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium capitalize transition-all hover:opacity-80",
                      STATUS_STYLES[b.status as BookingStatus] ?? STATUS_STYLES.pending,
                    )}
                  >
                    {isPending && <Loader2 className="size-3 animate-spin" />}
                    {b.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
