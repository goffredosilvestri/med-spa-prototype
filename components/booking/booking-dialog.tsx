"use client"

import { Dialog } from "@base-ui/react/dialog"
import { useEffect, useMemo, useState, useTransition } from "react"
import { Check, ChevronLeft, Loader as Loader2, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BRANCHES, TIME_SLOTS, TREATMENTS, PACKAGES, toBookableItem, toBookablePackage, type BookableItem } from "@/lib/constants"
import { createBooking, getBookedSlots } from "@/lib/api"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialItem: BookableItem | null
}

const ALL_ITEMS: BookableItem[] = [
  ...TREATMENTS.map(toBookableItem),
  ...PACKAGES.map(toBookablePackage),
]

function toISODate(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function buildDates(count: number) {
  const out: Date[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = 0; i < count; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    out.push(d)
  }
  return out
}

function parseSlotToDate(dateISO: string, slot: string) {
  const [time, meridiem] = slot.split(" ")
  const [hStr, mStr] = time.split(":")
  let h = Number(hStr)
  const m = Number(mStr)
  if (meridiem === "PM" && h !== 12) h += 12
  if (meridiem === "AM" && h === 12) h = 0
  const d = new Date(`${dateISO}T00:00:00`)
  d.setHours(h, m, 0, 0)
  return d
}

const STEPS = ["Treatment", "Date & Time", "Your details"]

export function BookingDialog({ open, onOpenChange, initialItem }: Props) {
  const dates = useMemo(() => buildDates(21), [])
  const [step, setStep] = useState(0)
  const [itemId, setItemId] = useState<string>("")
  const [branch, setBranch] = useState<string>("")
  const [dateISO, setDateISO] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [error, setError] = useState("")
  const [confirmed, setConfirmed] = useState(false)
  const [isPending, startTransition] = useTransition()

  const item = ALL_ITEMS.find((t) => t.id === itemId) ?? null

  // Reset when opened, applying any preselected treatment.
  useEffect(() => {
    if (open) {
      setStep(0)
      setItemId(initialItem?.id ?? "")
      setBranch("")
      setDateISO("")
      setTime("")
      setFullName("")
      setEmail("")
      setPhone("")
      setNotes("")
      setError("")
      setConfirmed(false)
    }
  }, [open, initialItem])

  // Fetch booked slots whenever branch + date are set.
  useEffect(() => {
    if (!branch || !dateISO) {
      setBookedSlots([])
      return
    }
    let active = true
    setLoadingSlots(true)
    getBookedSlots(branch, dateISO)
      .then((slots) => {
        if (active) setBookedSlots(slots)
      })
      .finally(() => {
        if (active) setLoadingSlots(false)
      })
    return () => {
      active = false
    }
  }, [branch, dateISO])

  const canContinueStep0 = itemId && branch
  const canContinueStep1 = dateISO && time
  const canConfirm = fullName.trim() && email.trim() && phone.trim()

  function next() {
    setError("")
    setStep((s) => Math.min(s + 1, 2))
  }
  function back() {
    setError("")
    setStep((s) => Math.max(s - 1, 0))
  }

  function handleConfirm() {
    if (!item) return
    setError("")
    startTransition(async () => {
      const res = await createBooking({
        fullName,
        email,
        phone,
        treatment: item.name,
        branch,
        price: item.price,
        bookingDate: dateISO,
        bookingTime: time,
        notes,
      })
      if (res.ok) {
        setConfirmed(true)
      } else {
        setError(res.error)
        if (res.error.toLowerCase().includes("reserved")) {
          const slots = await getBookedSlots(branch, dateISO)
          setBookedSlots(slots)
          setStep(1)
          setTime("")
        }
      }
    })
  }

  const now = new Date()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup
          className={cn(
            "fixed z-50 flex flex-col bg-card text-card-foreground shadow-2xl outline-none transition-all duration-300",
            // mobile: bottom sheet
            "inset-x-0 bottom-0 max-h-[92vh] rounded-t-3xl data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full",
            // desktop: centered modal
            "sm:inset-auto sm:top-1/2 sm:left-1/2 sm:max-h-[88vh] sm:w-[min(42rem,92vw)] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:data-[ending-style]:translate-y-[-46%] sm:data-[starting-style]:translate-y-[-46%] sm:data-[ending-style]:opacity-0 sm:data-[starting-style]:opacity-0",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div className="flex items-center gap-3">
              {step > 0 && !confirmed && (
                <button
                  onClick={back}
                  aria-label="Go back"
                  className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <ChevronLeft className="size-4" />
                </button>
              )}
              <div>
                <Dialog.Title className="font-serif text-xl leading-tight">
                  {confirmed ? "You're booked" : "Reserve your visit"}
                </Dialog.Title>
                {!confirmed && (
                  <Dialog.Description className="text-xs tracking-wide text-muted-foreground uppercase">
                    Step {step + 1} of 3 · {STEPS[step]}
                  </Dialog.Description>
                )}
              </div>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          {/* Progress */}
          {!confirmed && (
            <div className="flex gap-1.5 px-6 pt-4">
              {STEPS.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-300",
                    i <= step ? "bg-primary" : "bg-border",
                  )}
                />
              ))}
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {confirmed ? (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-8" />
                </div>
                <h3 className="mt-5 font-serif text-2xl">Your appointment is requested</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  A concierge will confirm your {item?.name} at our {branch} atelier shortly. A
                  confirmation has been sent to {email}.
                </p>
                <div className="mt-6 w-full max-w-sm rounded-xl border border-border bg-muted/40 p-4 text-left text-sm">
                  <Row label="Service" value={item?.name ?? ""} />
                  <Row label="Location" value={branch} />
                  <Row label="Date" value={formatLong(dateISO)} />
                  <Row label="Time" value={time} />
                </div>
                <Button
                  onClick={() => onOpenChange(false)}
                  className="mt-6 h-11 rounded-full px-8"
                >
                  Done
                </Button>
              </div>
            ) : step === 0 ? (
              <div className="flex flex-col gap-6">
                <div>
                  <p className="mb-3 text-sm font-medium">Choose your treatment or package</p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {ALL_ITEMS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setItemId(t.id)}
                        className={cn(
                          "flex items-center justify-between rounded-xl border p-3.5 text-left transition-all duration-200",
                          itemId === t.id
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:border-primary/40 hover:bg-muted/50",
                        )}
                      >
                        <span>
                          <span className="block text-sm font-medium">{t.name}</span>
                          <span className="block text-xs text-muted-foreground">
                            {t.kind === "package" ? "Package" : t.duration}
                          </span>
                        </span>
                        <span className="text-sm font-medium text-primary">${t.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-sm font-medium">Select a location</p>
                  <div className="grid gap-2.5 sm:grid-cols-3">
                    {BRANCHES.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBranch(b)}
                        className={cn(
                          "flex items-center gap-2 rounded-xl border p-3.5 text-left text-sm transition-all duration-200",
                          branch === b
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:border-primary/40 hover:bg-muted/50",
                        )}
                      >
                        <MapPin className="size-4 text-primary" />
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : step === 1 ? (
              <div className="flex flex-col gap-6">
                <div>
                  <p className="mb-3 text-sm font-medium">Select a date</p>
                  <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
                    {dates.map((d) => {
                      const iso = toISODate(d)
                      const active = iso === dateISO
                      return (
                        <button
                          key={iso}
                          onClick={() => {
                            setDateISO(iso)
                            setTime("")
                          }}
                          className={cn(
                            "flex min-w-15 shrink-0 flex-col items-center rounded-xl border px-3 py-2.5 transition-all duration-200",
                            active
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-primary/40 hover:bg-muted/50",
                          )}
                        >
                          <span className="text-[0.65rem] tracking-wide uppercase opacity-80">
                            {d.toLocaleDateString("en-US", { weekday: "short" })}
                          </span>
                          <span className="text-lg font-medium leading-tight">{d.getDate()}</span>
                          <span className="text-[0.65rem] opacity-80">
                            {d.toLocaleDateString("en-US", { month: "short" })}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium">Available times</p>
                    {loadingSlots && <Loader2 className="size-4 animate-spin text-muted-foreground" />}
                  </div>
                  {!dateISO ? (
                    <p className="text-sm text-muted-foreground">Please select a date first.</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                      {TIME_SLOTS.map((slot) => {
                        const taken = bookedSlots.includes(slot)
                        const past = parseSlotToDate(dateISO, slot).getTime() < now.getTime()
                        const disabled = taken || past
                        const active = time === slot
                        return (
                          <button
                            key={slot}
                            disabled={disabled}
                            onClick={() => setTime(slot)}
                            className={cn(
                              "rounded-lg border py-2.5 text-sm transition-all duration-200",
                              active
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary/40 hover:bg-muted/50",
                              disabled &&
                              "cursor-not-allowed border-transparent bg-muted/40 text-muted-foreground/40 line-through hover:border-transparent hover:bg-muted/40",
                            )}
                          >
                            {slot}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Field label="Full name">
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Isabella Moreau"
                    className="input-luxe"
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="input-luxe"
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="input-luxe"
                    />
                  </Field>
                </div>
                <Field label="Notes (optional)">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Anything we should know before your visit?"
                    className="input-luxe resize-none"
                  />
                </Field>
                <div className="mt-1 rounded-xl border border-border bg-muted/40 p-4 text-sm">
                  <Row label="Service" value={item?.name ?? ""} />
                  <Row label="Location" value={branch} />
                  <Row label="Date" value={formatLong(dateISO)} />
                  <Row label="Time" value={time} />
                  <div className="mt-2 flex items-center justify-between border-t border-border pt-2 font-medium">
                    <span>Total</span>
                    <span className="text-primary">${item?.price ?? 0}</span>
                  </div>
                </div>
              </div>
            )}

            {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          </div>

          {/* Footer */}
          {!confirmed && (
            <div className="border-t border-border px-6 py-4">
              {step < 2 ? (
                <Button
                  onClick={next}
                  disabled={step === 0 ? !canContinueStep0 : !canContinueStep1}
                  className="h-12 w-full rounded-full text-sm tracking-wide"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleConfirm}
                  disabled={!canConfirm || isPending}
                  className="h-12 w-full rounded-full text-sm tracking-wide"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Confirming
                    </>
                  ) : (
                    `Confirm booking · $${item?.price ?? 0}`
                  )}
                </Button>
              )}
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-0.5">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

function formatLong(iso: string) {
  if (!iso) return ""
  const d = new Date(`${iso}T00:00:00`)
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
}
