"use client"

import { useState, useTransition } from "react"
import { ArrowRight, Check, Loader as Loader2 } from "lucide-react"

import { subscribe } from "@/app/actions/subscribers"

export function Footer() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setError("")
    startTransition(async () => {
      const res = await subscribe(email, "footer")
      if (res.ok) {
        setDone(true)
      } else {
        setError(res.error)
      }
    })
  }

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          {/* Newsletter */}
          <div>
            <p className="text-xs tracking-[0.2em] text-primary uppercase">The Inner Circle</p>
            <h3 className="mt-3 font-serif text-2xl leading-tight">
              Exclusive access, early bookings, and rituals worth savoring.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Join our private list for seasonal offerings and member-only events.
            </p>

            {done ? (
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
                <div className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-4" />
                </div>
                <p className="font-serif text-lg">You&apos;re in. Welcome to the Inner Circle.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="group mt-6 flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="input-luxe flex-1 border-transparent bg-background/60"
                  disabled={isPending}
                />
                <button
                  type="submit"
                  disabled={isPending || !email.trim()}
                  className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  {isPending ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  )}
                </button>
              </form>
            )}
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>

          {/* Links */}
          <div>
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Explore</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li><a href="#treatments" className="transition-colors hover:text-primary">Treatments</a></li>
              <li><a href="#memberships" className="transition-colors hover:text-primary">Memberships</a></li>
              <li><a href="#experience" className="transition-colors hover:text-primary">The Experience</a></li>
              <li><a href="#faq" className="transition-colors hover:text-primary">Journal</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Ateliers</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <li>Beverly Hills · (310) 555-0148</li>
              <li>Manhattan · (212) 555-0192</li>
              <li>Miami · (305) 555-0177</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} AURA Medical Aesthetics. All rights reserved.</p>
          <p>Physician-led. Results-driven. Quietly luxurious.</p>
        </div>
      </div>
    </footer>
  )
}
