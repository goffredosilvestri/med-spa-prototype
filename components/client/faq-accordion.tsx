"use client"

import { Accordion } from "@base-ui/react/accordion"
import { ChevronDown } from "lucide-react"

const FAQS = [
  {
    q: "Is there downtime after injectables?",
    a: "Most clients resume normal activities immediately. Mild swelling or bruising may occur for 24–48 hours. Your physician will tailor aftercare to your treatment.",
  },
  {
    q: "What happens during a skin mapping consultation?",
    a: "Our board-certified providers analyze your skin with clinical imaging, assess concerns, and build a personalized treatment plan. The consultation is complimentary with any booked service.",
  },
  {
    q: "Do you offer financing options?",
    a: "Yes. We partner with PatientFi and CareCredit to offer flexible payment plans. Many treatments qualify for 0% APR for up to 12 months.",
  },
  {
    q: "How often should I schedule treatments?",
    a: "It depends on your goals. Most facial treatments are recommended every 4–6 weeks. Injectables typically last 3–4 months. Your physician will recommend an ideal cadence.",
  },
  {
    q: "Are your providers board-certified?",
    a: "Every injectable and laser treatment is performed by a board-certified aesthetic physician or licensed nurse practitioner under physician supervision.",
  },
]

export function FaqAccordion() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <div className="text-center">
        <p className="text-xs tracking-[0.2em] text-primary uppercase">The Journal</p>
        <h2 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-balance sm:text-5xl">
          Answers to what matters most
        </h2>
      </div>

      <Accordion.Root className="mt-12 divide-y divide-border border-y border-border" defaultValue={null}>
        {FAQS.map((faq, i) => (
          <Accordion.Item key={i} value={`item-${i}`} className="group">
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary">
                <span className="font-serif text-lg">{faq.q}</span>
                <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[panel-open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Panel className="overflow-hidden transition-all duration-200 data-[ending-style]:h-0 data-[starting-style]:h-0">
              <p className="pb-5 pr-8 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  )
}
