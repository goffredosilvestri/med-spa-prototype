"use client"

import { useState } from "react"
import { Eye, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { Navbar } from "@/components/client/navbar"
import { Hero } from "@/components/client/hero"
import { TrustStrip } from "@/components/client/trust-strip"
import { Treatments } from "@/components/client/treatments"
import { Memberships } from "@/components/client/memberships"
import { Experience } from "@/components/client/experience"
import { Testimonials } from "@/components/client/testimonials"
import { FaqAccordion } from "@/components/client/faq-accordion"
import { CtaSection } from "@/components/client/cta-section"
import { Footer } from "@/components/client/footer"
import { ChatConcierge } from "@/components/client/chat-concierge"
import { BookingProvider } from "@/components/booking/booking-provider"

function ClientHomepage() {
  return (
    <BookingProvider>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Treatments />
        <Memberships />
        <Experience />
        <Testimonials />
        <FaqAccordion />
        <CtaSection />
      </main>
      <Footer />
      <ChatConcierge />
    </BookingProvider>
  )
}

export function ViewToggle() {
  const [view, setView] = useState<"client" | "admin">("client")

  return (
    <>
      <div className="fixed left-4 top-4 z-[60] flex items-center gap-1 rounded-full border border-border/60 bg-card/80 p-1 shadow-sm backdrop-blur-md">
        <button
          onClick={() => setView("client")}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
            view === "client" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Eye className="size-3.5" />
          Client
        </button>
        <button
          onClick={() => setView("admin")}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
            view === "admin" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <LayoutDashboard className="size-3.5" />
          Admin
        </button>
      </div>

      {view === "client" ? <ClientHomepage /> : <AdminDashboard />}
    </>
  )
}
