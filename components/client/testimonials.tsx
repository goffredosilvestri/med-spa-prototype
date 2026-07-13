import { Star } from "lucide-react"

const REVIEWS = [
  {
    quote:
      "The only place I trust with my skin. The results are natural, and the experience feels like a genuine escape from the city.",
    name: "Isabella M.",
    detail: "Radiance member · Beverly Hills",
  },
  {
    quote:
      "From the consultation to the aftercare, every detail is considered. My complexion has never looked better.",
    name: "Sophia C.",
    detail: "Icon member · Manhattan",
  },
  {
    quote:
      "Clinical expertise without the clinical feeling. I leave glowing every single time and the concierge team is impeccable.",
    name: "Olivia B.",
    detail: "Radiance member · Miami",
  },
]

export function Testimonials() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs tracking-[0.2em] uppercase opacity-70">In their words</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            Trusted by those who value discretion
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col rounded-2xl bg-primary-foreground/10 p-7 backdrop-blur-sm"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-serif text-lg leading-relaxed text-pretty">
                {`"${r.quote}"`}
              </blockquote>
              <figcaption className="mt-6 border-t border-primary-foreground/20 pt-4">
                <p className="font-medium">{r.name}</p>
                <p className="text-sm opacity-70">{r.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
