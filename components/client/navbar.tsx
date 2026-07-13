"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useBooking } from "@/components/booking/booking-provider"

const LINKS = [
  { label: "Treatments", href: "#treatments" },
  { label: "Memberships", href: "#memberships" },
  { label: "Experience", href: "#experience" },
  { label: "Journal", href: "#faq" },
]

export function Navbar() {
  const { openBooking } = useBooking()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled ? "glass border-b border-border/60 py-3" : "py-5",
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6">
          <a href="#top" className="font-serif text-2xl tracking-tight">
            AURA
            <span className="align-super text-xs text-primary">°</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => openBooking()}
              className="hidden h-10 rounded-full px-6 sm:inline-flex"
            >
              Book a visit
            </Button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="grid size-10 place-items-center rounded-full text-foreground md:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-background transition-all duration-300 md:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-serif text-2xl">AURA°</span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="grid size-10 place-items-center rounded-full text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>
        <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block border-b border-border py-4 font-serif text-3xl transition-transform duration-300",
                  mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{ transitionDelay: mobileOpen ? `${i * 60 + 80}ms` : "0ms" }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-6 pb-10">
          <Button
            onClick={() => {
              setMobileOpen(false)
              openBooking()
            }}
            className="h-13 w-full rounded-full text-base"
          >
            Book a visit
          </Button>
        </div>
      </div>
    </>
  )
}
