"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"
import type { Treatment } from "@/lib/constants"
import { BookingDialog } from "./booking-dialog"

type BookingContextValue = {
  open: boolean
  treatment: Treatment | null
  openBooking: (treatment?: Treatment | null) => void
  closeBooking: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error("useBooking must be used within BookingProvider")
  return ctx
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [treatment, setTreatment] = useState<Treatment | null>(null)

  const openBooking = useCallback((t?: Treatment | null) => {
    setTreatment(t ?? null)
    setOpen(true)
  }, [])

  const closeBooking = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({ open, treatment, openBooking, closeBooking }),
    [open, treatment, openBooking, closeBooking],
  )

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingDialog open={open} onOpenChange={setOpen} initialTreatment={treatment} />
    </BookingContext.Provider>
  )
}
