"use client"

import { TrendingUp, Calendar, Mail, DollarSign } from "lucide-react"
import type { Booking, Subscriber } from "@/lib/types"

type Props = {
  bookings: Booking[]
  subscribers: Subscriber[]
}

const TREATMENT_NAMES = [
  "HydraFacial Signature",
  "Botox & Fillers",
  "Laser Skin Resurfacing",
  "Microneedling RF",
  "IV Wellness Drip",
  "Signature Chemical Peel",
]

export function AnalyticsOverview({ bookings, subscribers }: Props) {
  const totalAppointments = bookings.length
  const totalLeads = subscribers.length
  const projectedRevenue = bookings.reduce((sum, b) => sum + (b.price ?? 0), 0)

  const packageRevenue = bookings
    .filter((b) => !TREATMENT_NAMES.includes(b.treatment))
    .reduce((sum, b) => sum + (b.price ?? 0), 0)
  const treatmentRevenue = bookings
    .filter((b) => TREATMENT_NAMES.includes(b.treatment))
    .reduce((sum, b) => sum + (b.price ?? 0), 0)

  const total = packageRevenue + treatmentRevenue || 1
  const packagePct = Math.round((packageRevenue / total) * 100)
  const treatmentPct = 100 - packagePct

  const kpis = [
    { label: "Total Appointments", value: totalAppointments.toString(), icon: Calendar, accent: "text-primary" },
    { label: "Newsletter Leads", value: totalLeads.toString(), icon: Mail, accent: "text-gold" },
    { label: "Projected Revenue", value: `$${projectedRevenue.toLocaleString()}`, icon: DollarSign, accent: "text-primary" },
    { label: "Avg. Booking Value", value: `$${totalAppointments ? Math.round(projectedRevenue / totalAppointments) : 0}`, icon: TrendingUp, accent: "text-gold" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="glass rounded-2xl border border-border/60 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs tracking-wide text-muted-foreground uppercase">{k.label}</p>
              <k.icon className={`size-4 ${k.accent}`} />
            </div>
            <p className="mt-3 font-serif text-3xl">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-border/60 p-6">
        <h3 className="font-serif text-lg">Revenue Origin</h3>
        <p className="mt-1 text-sm text-muted-foreground">Breakdown by service category</p>

        <div className="mt-5 space-y-4">
          <RevenueBar label="Core Treatments" amount={treatmentRevenue} pct={treatmentPct} color="bg-primary" />
          <RevenueBar label="Packages & Memberships" amount={packageRevenue} pct={packagePct} color="bg-gold" />
        </div>
      </div>
    </div>
  )
}

function RevenueBar({ label, amount, pct, color }: { label: string; amount: number; pct: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">${amount.toLocaleString()} · {pct}%</span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
