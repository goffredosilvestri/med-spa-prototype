# Production Improvement Implementation Plan

## Overview
This document outlines the strategic upgrade path to transition the Med Spa application from a local frontend prototype (powered by `localStorage`) into a secure, high-performance, production-ready platform.

---

## 1. Infrastructure & Backend Logic

### A. Database & ORM Integration
- [ ] Initialize Supabase project and configure environment variables.
- [ ] Install and configure an ORM (e.g., Prisma or Drizzle) for type-safe database access.
- [ ] Design and map relational database schemas (Tables: `Users`, `Treatments_Catalog`, `Bookings`, `Newsletter_Leads`, `Branches`).
- [ ] Generate initial migrations and push the schema to the Supabase PostgreSQL database.

### B. Next.js Server Actions Migration
- [ ] Create `app/actions/` directory for secure server-side logic files.
- [ ] Rewrite the mock `createBooking` function into a secure Server Action (`'use server'`).
- [ ] Rewrite the mock `subscribe` function (newsletter) into a secure Server Action.
- [ ] Update frontend components (`AdminDashboard`, `BookingDialog`) to fetch and mutate data via Server Actions instead of the client-side `lib/api.ts`.
- [ ] Delete or deprecate the `localStorage` mock logic in `lib/api.ts`.

### C. Authentication & Authorization Guardrails
- [ ] Install and configure Supabase Auth (or NextAuth.js).
- [ ] Create a secure login page for administrators (`/login`).
- [ ] Configure Next.js Middleware (`middleware.ts`) to actively protect the `/admin` route.
- [ ] Verify that only users with an `ADMIN` role flag in the database can render the business intelligence dashboard.

### D. Third-Party Transactional APIs
- [ ] **Email Automation:** Set up a Resend or SendGrid account and obtain API keys.
- [ ] Create branded HTML email templates (using `react-email`) for booking confirmations and admin notifications.
- [ ] Trigger the email dispatch automatically from within the booking Server Action.
- [ ] **Payments:** Set up a Stripe account and configure Stripe Checkout.
- [ ] Integrate a deposit workflow (e.g., $50 hold) into the final step of the `BookingDialog` to mitigate no-shows.

---

## 2. Design & UX Enhancements

### A. Fluid Motion Engine
- [ ] Install `framer-motion` to elevate the UI aesthetic.
- [ ] Add `<AnimatePresence>` to the `BookingDialog` to ensure horizontal step transitions are silky smooth.
- [ ] Implement viewport-triggered, staggered entry animations for the Homepage Hero and Treatment Cards.
- [ ] Polish micro-interactions (e.g., 300ms cubic-bezier eases on hover states).

### B. Dynamic CMS Integration
- [ ] Choose and initialize a Headless CMS environment (e.g., Sanity.io or Contentful).
- [ ] Define the Content Schema for Treatments, Pricing Packages, and Branch Locations.
- [ ] Replace hardcoded arrays (`PRICING_CATALOG` in `lib/constants.ts`) with dynamic API fetches from the CMS.
- [ ] Verify the CMS preview mode works for local development.

### C. Calendar & Timezone Handling
- [ ] Install robust timezone libraries (e.g., `date-fns-tz`).
- [ ] Overhaul existing Date parsing logic in the booking flow. Ensure all data is saved to the database in strict `UTC`.
- [ ] Lock the frontend UI to display timeslots exclusively in the clinic's local timezone (e.g., `America/New_York`), preventing travel-based timezone offset bugs.

### D. Core Web Vitals & Asset Optimization
- [ ] Audit `app/layout.tsx` to ensure fonts (`Playfair Display`, `Inter`) are properly locally cached via `next/font/google`.
- [ ] Migrate all static image assets (Unsplash placeholders) to Next.js `<Image>` components or an optimized Edge CDN for rapid load times.
- [ ] Run a Lighthouse performance audit to ensure optimal LCP (Largest Contentful Paint) and CLS (Cumulative Layout Shift) scores.
