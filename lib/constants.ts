export type Treatment = {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  duration: string
  image: string
}

export const TREATMENTS: Treatment[] = [
  {
    id: "smooth-tighten",
    name: "Smooth & Tighten",
    tagline: "Refined, natural definition",
    description:
      "Precision injectables and subtle firming protocols administered by board-certified physicians to soften lines and restore youthful contour.",
    price: 400,
    duration: "45 min",
    image: "/treatments/injectables.png",
  },
  {
    id: "brighten-hydrate",
    name: "Brighten & Hydrate",
    tagline: "Instant luminous glow",
    description:
      "A medical-grade resurfacing facial that cleanses, extracts, and hydrates for immediate radiance with zero downtime.",
    price: 250,
    duration: "60 min",
    image: "/treatments/hydrafacial.png",
  },
  {
    id: "sculpt-contour",
    name: "Sculpt & Contour",
    tagline: "Tighten & sculpt",
    description:
      "Advanced structural rejuvenation that firms lax skin and defines facial topography for a lifted, sculpted appearance.",
    price: 800,
    duration: "90 min",
    image: "/treatments/microneedling.png",
  },
]

export type Package = {
  id: string
  name: string
  description: string
  price: number
  cadence: string
  perks: string[]
  featured?: boolean
}

export const PACKAGES: Package[] = [
  {
    id: "event-glow",
    name: "The Event Glow Bundle",
    description: "A perfect pre-event protocol for immediate radiance.",
    price: 295,
    cadence: "per visit",
    perks: ["Brighten & Hydrate treatment", "Skin analysis consultation", "Complimentary LED therapy"],
  },
  {
    id: "contour-lift",
    name: "The Contour & Lift",
    description: "Our most-loved protocol for structural rejuvenation.",
    price: 850,
    cadence: "per visit",
    perks: [
      "Sculpt & Contour session",
      "Priority concierge booking",
      "Targeted firming enhancements",
      "Physician review",
    ],
    featured: true,
  },
  {
    id: "skin-renewal",
    name: "The Skin Renewal Trilogy",
    description: "A comprehensive reset for cellular vitality.",
    price: 1200,
    cadence: "per package",
    perks: [
      "Series of 3 Smooth & Tighten",
      "Dedicated aesthetic physician",
      "Accelerated recovery protocol",
      "Private VIP suite access",
    ],
  },
]

export const BRANCHES = ["Beverly Hills", "Manhattan", "Miami"] as const

export const TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
]

export type BookableItem = {
  id: string
  name: string
  price: number
  duration?: string
  kind: "treatment" | "package"
}

export function toBookableItem(t: Treatment): BookableItem {
  return { id: t.id, name: t.name, price: t.price, duration: t.duration, kind: "treatment" }
}

export function toBookablePackage(p: Package): BookableItem {
  return { id: p.id, name: p.name, price: p.price, kind: "package" }
}

export const BOOKING_STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const
export type BookingStatus = (typeof BOOKING_STATUSES)[number]
