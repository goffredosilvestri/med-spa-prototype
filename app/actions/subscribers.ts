"use server"

import { db } from "@/lib/db"
import { subscribers } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export type SubscribeResult = { ok: true } | { ok: false; error: string }

export async function subscribe(email: string, source = "footer"): Promise<SubscribeResult> {
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailValid) return { ok: false, error: "Please enter a valid email address." }

  try {
    await db.insert(subscribers).values({ email: email.toLowerCase(), source }).onConflictDoNothing()
    revalidatePath("/")
    return { ok: true }
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." }
  }
}

export async function getSubscribers() {
  return db.select().from(subscribers).orderBy(desc(subscribers.createdAt))
}
