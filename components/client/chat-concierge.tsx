"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, Send, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = { role: "bot" | "user"; text: string }

const INITIAL_MESSAGE =
  "Welcome to AURA. I'm your virtual concierge — ask me about treatments, pricing, downtime, or our locations."

function generateResponse(input: string): string {
  const lower = input.toLowerCase()

  if (/\b(price|cost|how much|pricing)\b/.test(lower)) {
    return "Our treatments range from $250 (IV Wellness Drip) to $900 (Laser Skin Resurfacing). Memberships start at $350 per visit. Would you like to book a consultation to discuss the best option for you?"
  }
  if (/\b(downtime|recovery|heal)\b/.test(lower)) {
    return "Most facials have zero downtime. Injectables may cause mild swelling for 24–48 hours. Laser resurfacing requires 3–5 days of gentle aftercare. Your physician will provide a detailed plan."
  }
  if (/\b(location|where|address|atelier|branch)\b/.test(lower)) {
    return "We have three flagship ateliers: Beverly Hills, Manhattan, and Miami. All feature private suites and physician-led care. You can select your preferred location during booking."
  }
  if (/\b(book|appointment|schedule|reservation)\b/.test(lower)) {
    return "I'd be happy to help you book. Use the 'Book a visit' button at the top of the page to choose your treatment, date, and time — it takes less than a minute."
  }
  if (/\b(membership|member|package|bundle)\b/.test(lower)) {
    return "We offer three memberships: The Essential ($350/visit), The Radiance ($890/month, our most loved), and The Icon ($2,400/quarter). Each includes physician oversight and concierge booking."
  }
  if (/\b(injectable|botox|filler)\b/.test(lower)) {
    return "Our injectables are administered exclusively by board-certified physicians. Botox & Fillers start at $650 for a 45-minute session. Results are natural and refined."
  }
  if (/\b(facial|hydrafacial|glow)\b/.test(lower)) {
    return "Our HydraFacial Signature ($350, 60 min) is our most popular treatment — instant radiance with zero downtime. We also offer chemical peels and laser resurfacing."
  }

  return "I am a virtual assistant. For highly personalized medical advice or complex booking inquiries, please call our clinical reception team at (555) 123-4567."
}

export function ChatConcierge() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: INITIAL_MESSAGE }])
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, thinking])

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || thinking) return

    setMessages((m) => [...m, { role: "user", text }])
    setInput("")
    setThinking(true)

    setTimeout(() => {
      const reply = generateResponse(text)
      setMessages((m) => [...m, { role: "bot", text: reply }])
      setThinking(false)
    }, 700)
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat concierge"
        className={cn(
          "fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl transition-all duration-200 hover:bg-primary/90 sm:bottom-6 sm:right-6",
          open && "rotate-90",
        )}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-5 z-50 flex w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-200 sm:right-6",
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <div className="flex items-center gap-3 border-b border-border bg-primary px-5 py-4 text-primary-foreground">
          <div className="grid size-9 place-items-center rounded-full bg-primary-foreground/15">
            <Sparkles className="size-4" />
          </div>
          <div>
            <p className="font-serif text-base leading-tight">AURA Concierge</p>
            <p className="text-xs opacity-70">Typically replies instantly</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-background/60 px-4 py-4" style={{ maxHeight: "24rem" }}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                m.role === "bot"
                  ? "bg-secondary text-secondary-foreground"
                  : "ml-auto bg-primary text-primary-foreground",
              )}
            >
              {m.text}
            </div>
          ))}
          {thinking && (
            <div className="flex items-center gap-1.5 rounded-2xl bg-secondary px-4 py-3 w-fit">
              <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
              <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
              <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border bg-card px-3 py-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about treatments, pricing..."
            className="flex-1 rounded-full bg-muted/60 px-4 py-2.5 text-sm outline-none transition-colors focus:bg-muted"
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            aria-label="Send message"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40"
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </>
  )
}
