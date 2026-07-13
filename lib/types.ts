export type Booking = {
  id: number
  full_name: string
  email: string
  phone: string
  treatment: string
  branch: string
  price: number
  booking_date: string
  booking_time: string
  notes: string | null
  status: string
  created_at: string
}

export type Subscriber = {
  id: number
  email: string
  source: string
  created_at: string
}
