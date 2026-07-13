const ENDORSEMENTS = [
  "Allergan Aesthetics",
  "Hydrafacial",
  "SkinCeuticals",
  "Board-Certified Medical Staff",
]

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6 py-10 md:justify-between">
        {ENDORSEMENTS.map((end) => (
          <p
            key={end}
            className="font-serif text-lg text-muted-foreground transition-colors hover:text-foreground md:text-xl"
          >
            {end}
          </p>
        ))}
      </div>
    </section>
  )
}
