/**
 * @deprecated Use `@/lib/supabase/server` in Server Actions.
 * Kept for potential future client-side Supabase Auth (Phase 2).
 */
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
