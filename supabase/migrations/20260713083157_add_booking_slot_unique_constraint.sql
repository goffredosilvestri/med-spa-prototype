/*
# Add unique constraint on booking slots

1. Changes
- Add unique constraint on (branch, booking_date, booking_time) in bookings table
- This prevents double-booking at the database level, closing the race condition
  where two concurrent booking requests both pass the application-level check.

2. Security
- No RLS changes.
*/

CREATE UNIQUE INDEX IF NOT EXISTS idx_bookings_slot_unique
  ON bookings (branch, booking_date, booking_time)
  WHERE status <> 'cancelled';
