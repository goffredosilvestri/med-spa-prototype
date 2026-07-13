"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBooking } from "@/components/booking/booking-provider"
import { Reveal } from "@/components/ui/reveal"

export function CtaSection() {
  const { openBooking } = useBooking()

  return (
    <section className="relative overflow-hidden border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:py-28">
        <Reveal>
          <p className="text-xs tracking-[0.2em] text-primary-foreground/70 uppercase">
            Your journey begins here
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Step into a quieter kind of confidence
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/80 text-pretty">
            Book a complimentary consultation with our board-certified physicians and discover a
            treatment plan designed exclusively for you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={() => openBooking()}
              className="group h-13 rounded-full bg-primary-foreground px-7 text-sm tracking-wide text-primary hover:bg-primary-foreground/90"
            >
              Book your consultation
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
            <a
              href="#treatments"
              className="inline-flex h-13 items-center rounded-full border border-primary-foreground/30 px-7 text-sm transition-colors hover:bg-primary-foreground/10"
            >
              Explore treatments
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
