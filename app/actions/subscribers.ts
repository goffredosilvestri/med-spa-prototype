"use server"

import { getSupabase } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export type SubscribeResult = { ok: true } | { ok: false; error: string }

export async function subscribe(email: string, source = "footer"): Promise<SubscribeResult> {
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailValid) return { ok: false, error: "Please enter a valid email address." }

  const supabase = getSupabase()
  const { error } = await supabase
    .from("subscribers")
    .insert({ email: email.toLowerCase(), source })

  if (error) {
    if (error.code === "23505") return { ok: true }
    return { ok: false, error: "Something went wrong. Please try again." }
  }

  revalidatePath("/")
  return { ok: true }
}

export async function getSubscribers() {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from("subscribers")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) return []
  return data ?? []
}
