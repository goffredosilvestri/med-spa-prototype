"use client"

import { useEffect, useState } from "react"
import { LayoutDashboard, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnalyticsOverview } from "./analytics-overview"
import { AppointmentTable } from "./appointment-table"
import { LeadList } from "./lead-list"
import { getBookings } from "@/app/actions/bookings"
import { getSubscribers } from "@/app/actions/subscribers"
import type { Booking, Subscriber } from "@/lib/types"

export function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const [b, s] = await Promise.all([getBookings(), getSubscribers()])
    setBookings(b as Booking[])
    setSubscribers(s as Subscriber[])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <header className="glass sticky top-0 z-30 border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <LayoutDashboard className="size-4" />
            </div>
            <div>
              <p className="font-serif text-lg leading-tight">AURA Admin</p>
              <p className="text-xs text-muted-foreground">Business Intelligence Dashboard</p>
            </div>
          </div>
          <Button
            onClick={load}
            variant="outline"
            disabled={loading}
            className="rounded-full"
          >
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">
        {loading ? (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted/50" />
              ))}
            </div>
            <div className="h-40 animate-pulse rounded-2xl bg-muted/50" />
            <div className="h-64 animate-pulse rounded-2xl bg-muted/50" />
          </div>
        ) : (
          <>
            <AnalyticsOverview bookings={bookings} subscribers={subscribers} />
            <AppointmentTable bookings={bookings} onStatusChange={load} />
            <LeadList subscribers={subscribers} />
          </>
        )}
      </main>
    </div>
  )
}
