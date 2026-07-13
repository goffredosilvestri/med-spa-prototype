"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"
import type { BookableItem } from "@/lib/constants"
import { BookingDialog } from "./booking-dialog"

type BookingContextValue = {
  open: boolean
  item: BookableItem | null
  openBooking: (item?: BookableItem | null) => void
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
  const [item, setItem] = useState<BookableItem | null>(null)

  const openBooking = useCallback((i?: BookableItem | null) => {
    setItem(i ?? null)
    setOpen(true)
  }, [])

  const closeBooking = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({ open, item, openBooking, closeBooking }),
    [open, item, openBooking, closeBooking],
  )

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingDialog open={open} onOpenChange={setOpen} initialItem={item} />
    </BookingContext.Provider>
  )
}
