const STATS = [
  { value: "18", label: "Years of practice" },
  { value: "40k+", label: "Treatments delivered" },
  { value: "3", label: "Flagship ateliers" },
  { value: "4.9", label: "Average member rating" },
]

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <p className="font-serif text-4xl text-primary">{s.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
