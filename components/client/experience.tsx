import Image from "next/image"
import { Leaf, ShieldCheck, Sparkles } from "lucide-react"

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Physician-led",
    copy: "Every treatment is overseen by board-certified aesthetic doctors.",
  },
  {
    icon: Leaf,
    title: "Clean science",
    copy: "Medical-grade, cruelty-free formulations chosen for real results.",
  },
  {
    icon: Sparkles,
    title: "Quiet luxury",
    copy: "Private suites and a concierge team devoted to your comfort.",
  },
]

export function Experience() {
  return (
    <section id="experience" className="bg-card/40">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div className="relative">
          <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] sm:aspect-3/2 lg:aspect-4/5">
            <Image
              src="/interior.png"
              alt="The serene interior of an AURA medical spa atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-xs tracking-[0.2em] text-primary uppercase">The AURA difference</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
            A sanctuary where science meets serenity
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
            We believe results and relaxation are not a trade-off. Our ateliers are designed to feel
            like a private retreat, while our clinical standards remain uncompromising.
          </p>

          <div className="mt-10 flex flex-col gap-6">
            {PILLARS.map((p) => (
              <div key={p.title} className="flex gap-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <p.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg">{p.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
