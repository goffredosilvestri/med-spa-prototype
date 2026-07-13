"use client"

import Image from "next/image"
import { Plus } from "lucide-react"
import { TREATMENTS } from "@/lib/constants"
import { useBooking } from "@/components/booking/booking-provider"

export function Treatments() {
  const { openBooking } = useBooking()

  return (
    <section id="treatments" className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-xs tracking-[0.2em] text-primary uppercase">The menu</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            Treatments, refined to a ritual
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Every service begins with a physician consultation, so your plan is tailored to your skin,
          not a template.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TREATMENTS.map((t) => (
          <button
            key={t.id}
            onClick={() => openBooking(t)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative aspect-4/3 overflow-hidden">
              <Image
                src={t.image || "/placeholder.svg"}
                alt={t.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="glass absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium">
                {t.duration}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-xs tracking-wide text-primary uppercase">{t.tagline}</p>
              <h3 className="mt-1.5 font-serif text-xl">{t.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {t.description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm">
                  <span className="text-muted-foreground">from </span>
                  <span className="font-serif text-lg text-foreground">${t.price}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Book
                  <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-200 group-hover:rotate-90">
                    <Plus className="size-3.5" />
                  </span>
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
