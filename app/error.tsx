"use client"

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <p className="text-xs tracking-[0.2em] text-primary uppercase">Something went wrong</p>
        <h2 className="mt-3 font-serif text-3xl">We apologize for the inconvenience</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Please try again. If the problem persists, call us at (555) 123-4567.
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
