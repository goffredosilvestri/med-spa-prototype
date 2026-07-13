"use client"

import Image from "next/image"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBooking } from "@/components/booking/booking-provider"

export function Hero() {
  const { openBooking } = useBooking()

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Copy */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs tracking-wide text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-primary" />
            Physician-led medical aesthetics
          </span>

          <h1 className="mt-6 font-serif text-5xl leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            The art of
            <br />
            <span className="italic text-primary">effortless</span> radiance
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
            AURA blends clinical precision with quiet luxury. Bespoke facials, injectables, and
            wellness rituals, designed around you by board-certified physicians.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              onClick={() => openBooking()}
              className="group h-13 rounded-full px-7 text-sm tracking-wide"
            >
              Book your consultation
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
            <a
              href="#treatments"
              className="inline-flex h-13 items-center rounded-full border border-border px-7 text-sm transition-colors hover:bg-muted"
            >
              Explore treatments
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {["S", "M", "O", "A"].map((c, i) => (
                <span
                  key={i}
                  className="grid size-9 place-items-center rounded-full border-2 border-background bg-secondary text-xs font-medium text-secondary-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground">
                Loved by <span className="font-medium text-foreground">12,000+</span> members
              </p>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] sm:aspect-square lg:aspect-4/5">
            <Image
              src="/hero.png"
              alt="A woman receiving a luxury facial treatment at AURA medical spa"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          {/* Floating glass card */}
          <div className="glass absolute -bottom-5 -left-3 w-52 rounded-2xl border border-border/60 p-4 shadow-xl sm:left-6">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Next availability</p>
            <p className="mt-1 font-serif text-lg">Tomorrow, 11:00 AM</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Beverly Hills atelier</p>
          </div>
        </div>
      </div>
    </section>
  )
}
