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
    id: "hydrafacial",
    name: "HydraFacial Signature",
    tagline: "Instant luminous glow",
    description:
      "A medical-grade resurfacing facial that cleanses, extracts, and hydrates for immediate radiance with zero downtime.",
    price: 350,
    duration: "60 min",
    image: "/treatments/hydrafacial.png",
  },
  {
    id: "botox-fillers",
    name: "Botox & Fillers",
    tagline: "Refined, natural definition",
    description:
      "Precision injectables administered by board-certified physicians to soften lines and restore youthful contour.",
    price: 650,
    duration: "45 min",
    image: "/treatments/injectables.png",
  },
  {
    id: "laser-resurfacing",
    name: "Laser Skin Resurfacing",
    tagline: "Renew from within",
    description:
      "Fractional laser therapy that stimulates collagen, evens tone, and dramatically improves texture over time.",
    price: 900,
    duration: "90 min",
    image: "/treatments/laser.png",
  },
  {
    id: "microneedling-rf",
    name: "Microneedling RF",
    tagline: "Tighten & sculpt",
    description:
      "Radiofrequency microneedling that firms lax skin and refines pores for a lifted, sculpted appearance.",
    price: 550,
    duration: "75 min",
    image: "/treatments/microneedling.png",
  },
  {
    id: "iv-wellness",
    name: "IV Wellness Drip",
    tagline: "Hydration from the inside",
    description:
      "Custom vitamin infusions designed to boost energy, immunity, and skin vitality in a serene lounge setting.",
    price: 250,
    duration: "45 min",
    image: "/treatments/iv-drip.png",
  },
  {
    id: "chemical-peel",
    name: "Signature Chemical Peel",
    tagline: "Reveal fresh skin",
    description:
      "A tailored resurfacing peel that fades pigmentation and reveals brighter, smoother skin beneath.",
    price: 300,
    duration: "50 min",
    image: "/treatments/peel.png",
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
    id: "essential",
    name: "The Essential",
    description: "A perfect introduction to medical aesthetics.",
    price: 350,
    cadence: "per visit",
    perks: ["1 Signature HydraFacial", "Skin analysis consultation", "Complimentary LED therapy"],
  },
  {
    id: "radiance",
    name: "The Radiance Membership",
    description: "Our most-loved monthly ritual for lasting results.",
    price: 890,
    cadence: "per month",
    perks: [
      "2 treatments of your choice monthly",
      "Priority concierge booking",
      "15% off all injectables",
      "Quarterly physician review",
    ],
    featured: true,
  },
  {
    id: "icon",
    name: "The Icon",
    description: "Unlimited access to the full AURA experience.",
    price: 2400,
    cadence: "per quarter",
    perks: [
      "Unlimited facials & peels",
      "Dedicated aesthetic physician",
      "Complimentary IV wellness drips",
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

export const BOOKING_STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const
export type BookingStatus = (typeof BOOKING_STATUSES)[number]
