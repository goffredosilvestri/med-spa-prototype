"use client"

import type { Subscriber } from "@/lib/types"

type Props = {
  subscribers: Subscriber[]
}

export function LeadList({ subscribers }: Props) {
  if (subscribers.length === 0) {
    return (
      <div className="glass rounded-2xl border border-border/60 p-12 text-center">
        <p className="font-serif text-xl">No leads captured yet</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Newsletter signups from the footer will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="glass overflow-hidden rounded-2xl border border-border/60">
      <div className="border-b border-border px-6 py-5">
        <h3 className="font-serif text-lg">Newsletter Leads</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""} captured
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Source</th>
              <th className="px-6 py-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {subscribers.map((s) => (
              <tr key={s.id} className="transition-colors hover:bg-muted/30">
                <td className="px-6 py-4 font-medium">{s.email}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs capitalize text-secondary-foreground">
                    {s.source}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {new Date(s.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}{" "}
                  · {new Date(s.created_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
