# MyStyle — Beauty Salon

Complete website for **MyStyle**, an African braids & beauty salon in Atlanta, GA.

## Pages

- `/` — Home with hero, featured services, gallery, testimonials
- `/services` — Full menu with USD pricing
- `/gallery` — Portfolio with filters (Black / Blonde / Mixed)
- `/about` — Story and values
- `/team` — Stylists
- `/book` — Booking form
- `/contact` — Contact + form
- `/faq` — Frequently asked questions

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript

## Environment

Copy `.env.example` to `.env` and add the SISGESC Site API credentials (server-only):

```bash
cp .env.example .env
```

```bash
SITE_API_HOST=https://your-sisgesc-host.example
SITE_API_KEY=your-site-api-key
```

Do **not** prefix these with `NEXT_PUBLIC_`. The key stays on the server.

### SISGESC endpoints used

| Feature | Endpoint |
|---------|----------|
| Contact form | `POST /api/site/contacts/submit` |
| Gallery / home media | `GET /api/site/media` |
| Services menu (editorial) | `GET /api/site/catalog-price-lists` |
| Book appointment | `POST /api/site/appointments/submit` |
| Confirm deposit | `POST /api/site/appointments/confirm-payment` |
| ERP price lists (available in `lib/sisgesc`) | `GET /api/site/price-lists` |
| Live product quote (available in `lib/sisgesc`) | `POST /api/site/price-lists/quote` |

Optional deposit: set `SITE_APPOINTMENT_DEPOSIT_AMOUNT` (e.g. `15`). Booking then sends `amount`, `success_url`, and `cancel_url`; if Stripe returns `payment.payment_url`, the visitor is redirected and `/book/payment/success` confirms the deposit.

If the API is unreachable or empty, media/pricing fall back to local static content.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```
