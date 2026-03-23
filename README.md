# ⚡ SafariCharge

A production-ready EV charging platform for Africa, built with Next.js 16, TypeScript, Prisma, and Tailwind CSS.

---

## ✨ Features

- **Charging Station Map** — Browse and find nearby EV charging stations
- **Charging Session Management** — Start, monitor, and end sessions
- **User Authentication** — Email-based registration with 2FA verification
- **Role-Based Access Control** — Driver, Fleet Manager, Employee, and Admin roles
- **Fleet Management** — Manage vehicle fleets with live status tracking
- **AI Analytics Dashboard** — Usage analytics and predictive insights (admin/employee)
- **Battery Repurposing Toolkit** — Battery health and second-life management (premium)
- **Admin Panel** — User management, employee approval, and role assignment
- **Email Notifications** — Transactional email via [Resend](https://resend.com)
- **Dark / Light Mode** — Automatic theme support via `next-themes`

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Database | SQLite (dev) / PostgreSQL (prod) via Prisma |
| Auth | Custom session (scrypt password hashing, 2FA) |
| State | Zustand |
| Data Fetching | TanStack Query |
| Email | Resend |
| Maps | React Leaflet |
| Charts | Recharts |
| Runtime | Bun |

---

## �� Quick Start

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.x
- Node.js ≥ 20 (if not using Bun exclusively)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/rauell1/Coding.git
cd Coding/safaricharge-website

# 2. Install dependencies
bun install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your actual values (see Environment Variables section below)

# 4. Set up the database
bun run db:push          # Apply schema to DB
bun run db:seed          # Seed initial data (optional)

# 5. Start the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` and set the following:

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | SQLite (`file:./db/safaricharge.db`) or PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | ✅ | Full public URL of the app (e.g. `https://safaricharge.co.ke`) |
| `MAIN_ADMIN_EMAIL` | ✅ | Email that receives ADMIN role on first registration |
| `RESEND_API_KEY` | ⚠️ | [Resend](https://resend.com) API key — required for transactional email |
| `NEXT_PUBLIC_APP_NAME` | — | Display name (default: `SafariCharge`) |
| `NEXT_PUBLIC_APP_VERSION` | — | Shown on the health check endpoint |

> **Security:** Never commit your `.env` file. The `.gitignore` should already exclude it.

---

## �� Folder Structure

```
safaricharge-website/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed script
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── route.ts       # Health check: GET /api
│   │   │   ├── auth/          # Auth endpoints (login, register, verify, me)
│   │   │   ├── admin/         # Admin-only endpoints (users, employees)
│   │   │   ├── email/         # Transactional email endpoint
│   │   │   ├── fleet/         # Fleet management endpoints
│   │   │   ├── sessions/      # Charging session endpoints
│   │   │   └── stations/      # Charging station endpoints
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx           # Main single-page application entry
│   ├── components/
│   │   ├── safari/            # Feature-specific components
│   │   └── ui/                # shadcn/ui base components
│   ├── contexts/              # React contexts (currency, etc.)
│   ├── data/                  # Static / mock data
│   ├── hooks/                 # Custom React hooks
│   ├── lib/
│   │   ├── auth.ts            # Password hashing, session verification
│   │   ├── db.ts              # Prisma client singleton
│   │   ├── security.ts        # Validation, sanitization, rate limiting
│   │   └── utils.ts           # General utilities (cn helper)
│   ├── middleware.ts           # Security headers, request logging
│   ├── stores/
│   │   └── auth-store.ts      # Zustand auth store
│   └── types/
│       └── index.ts           # Shared TypeScript types
├── .env.example               # Environment variable template
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🗄️ Database Commands

```bash
bun run db:push       # Push schema changes (no migration history)
bun run db:migrate    # Create and apply a migration
bun run db:generate   # Re-generate Prisma client after schema changes
bun run db:seed       # Seed the database with initial data
bun run db:reset      # Reset DB and re-apply migrations (⚠️ destructive)
```

---

## 🏗️ Build & Deploy

### Build for production

```bash
bun run build
```

### Start the production server (standalone mode)

```bash
bun run start
```

### Deploy with Caddy (recommended)

A `Caddyfile.txt` is included. Rename it to `Caddyfile` and run:

```bash
caddy run
```

Caddy handles HTTPS automatically via Let's Encrypt.

---

## 🔒 Security Notes

- Passwords are hashed with **scrypt** (Node.js `crypto` module) — not bcrypt
- 2FA codes expire after **10 minutes**
- Security headers (CSP, X-Frame-Options, etc.) are applied via `next.config.ts` and `middleware.ts`
- Rate limiting is in-memory by default — replace `rateLimitStore` in `src/lib/security.ts` with Redis for production
- The `/api` route serves a **health check** (`GET /api`) that also validates database connectivity

---

## 🤝 Contributing

Pull requests are welcome. Please open an issue first to discuss major changes.

---

## 📄 License

Private — © SafariCharge Ltd. All rights reserved.
