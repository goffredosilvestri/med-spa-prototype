/**
 * One-off diagnostic — run: node scripts/test-supabase.mjs
 * Prints Supabase errors only (never prints keys).
 */
import { readFileSync } from "fs"
import { createClient } from "@supabase/supabase-js"

function loadEnv() {
  try {
    const raw = readFileSync(".env.local", "utf8")
    for (const line of raw.split("\n")) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith("#")) continue
      const eq = trimmed.indexOf("=")
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      let val = trimmed.slice(eq + 1).trim()
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1)
      }
      process.env[key] = val
    }
  } catch {
    console.error("Could not read .env.local — make sure it exists in the project root.")
    process.exit(1)
  }
}

loadEnv()

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || url.includes("your-project")) {
  console.error("NEXT_PUBLIC_SUPABASE_URL is missing or still a placeholder.")
  process.exit(1)
}
if (!key || key.includes("your-")) {
  console.error("Supabase API key is missing or still a placeholder.")
  process.exit(1)
}

console.log("URL looks OK:", url.replace(/https:\/\/([^.]+).*/, "https://$1....supabase.co"))
console.log("Using key type:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "service_role" : "anon")

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
})

// Test 1: can we read bookings table?
const selectResult = await supabase.from("bookings").select("id").limit(1)
if (selectResult.error) {
  console.error("\n❌ SELECT failed:")
  console.error("  code:", selectResult.error.code)
  console.error("  message:", selectResult.error.message)
  console.error("  hint:", selectResult.error.hint ?? "(none)")
  if (selectResult.error.message?.includes("does not exist")) {
    console.error("\n→ Fix: Run the SQL migrations in Supabase SQL Editor (see beginner guide).")
  }
  process.exit(1)
}
console.log("\n✓ SELECT on bookings table works")

// Test 2: can we insert?
const insertResult = await supabase
  .from("bookings")
  .insert({
    full_name: "Test User",
    email: "test-diagnostic@example.com",
    phone: "+1 555 000 0000",
    treatment: "Diagnostic Test",
    branch: "Beverly Hills",
    price: 1,
    booking_date: "2099-01-01",
    booking_time: "10:00 AM",
    notes: null,
    status: "pending",
  })
  .select("id")
  .single()

if (insertResult.error) {
  console.error("\n❌ INSERT failed:")
  console.error("  code:", insertResult.error.code)
  console.error("  message:", insertResult.error.message)
  console.error("  details:", insertResult.error.details ?? "(none)")
  console.error("  hint:", insertResult.error.hint ?? "(none)")
  if (insertResult.error.code === "42501") {
    console.error("\n→ Fix: RLS is blocking writes. Add SUPABASE_SERVICE_ROLE_KEY to .env.local.")
  }
  process.exit(1)
}

console.log("✓ INSERT works (test row id:", insertResult.data.id + ")")

// Clean up test row
await supabase.from("bookings").delete().eq("id", insertResult.data.id)
console.log("✓ Test row deleted\nAll checks passed — booking should work in the app.")
