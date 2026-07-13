export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="font-serif text-lg text-muted-foreground">Loading AURA…</p>
      </div>
    </div>
  )
}
