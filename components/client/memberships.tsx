"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PACKAGES } from "@/lib/constants"
import { useBooking } from "@/components/booking/booking-provider"

export function Memberships() {
  const { openBooking } = useBooking()

  return (
    <section id="memberships" className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs tracking-[0.2em] text-primary uppercase">Memberships</p>
        <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
          Beauty as a considered ritual
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
          Choose a rhythm that suits you. Every tier includes physician oversight and priority
          concierge access.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PACKAGES.map((p) => (
          <div
            key={p.id}
            className={cn(
              "flex flex-col rounded-2xl border p-7 transition-all duration-300",
              p.featured
                ? "border-primary bg-primary text-primary-foreground shadow-xl lg:-translate-y-3"
                : "border-border bg-card hover:-translate-y-1 hover:shadow-lg",
            )}
          >
            {p.featured && (
              <span className="mb-4 inline-flex w-fit rounded-full bg-primary-foreground/15 px-3 py-1 text-xs tracking-wide uppercase">
                Most loved
              </span>
            )}
            <h3 className="font-serif text-2xl">{p.name}</h3>
            <p
              className={cn(
                "mt-1.5 text-sm leading-relaxed",
                p.featured ? "text-primary-foreground/80" : "text-muted-foreground",
              )}
            >
              {p.description}
            </p>
            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="font-serif text-4xl">${p.price.toLocaleString()}</span>
              <span
                className={cn(
                  "text-sm",
                  p.featured ? "text-primary-foreground/80" : "text-muted-foreground",
                )}
              >
                {p.cadence}
              </span>
            </div>

            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {p.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5 text-sm">
                  <Check
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      p.featured ? "text-primary-foreground" : "text-primary",
                    )}
                  />
                  <span className={p.featured ? "text-primary-foreground/90" : ""}>{perk}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => openBooking()}
              variant={p.featured ? "secondary" : "default"}
              className="mt-7 h-12 w-full rounded-full text-sm tracking-wide"
            >
              {p.featured ? "Become a member" : "Get started"}
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
