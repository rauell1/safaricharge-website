# SafariCharge

SafariCharge is a Next.js 16 EV charging platform for drivers, fleet managers, operations staff, and administrators. The application includes public charging discovery, secure authentication, fleet operations, admin approval flows, and background email processing.

This repository now includes a production audit and a durable project map so future work can start from architecture context instead of rescanning the full codebase.

## Core Features

- Charging station discovery and filtering
- Charging session creation and completion
- Fleet and vehicle management
- Admin user management and employee approval
- Email verification and transactional email delivery
- Server-backed session authentication with httpOnly cookies
- Structured health checks and background maintenance jobs

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS and shadcn/ui
- Prisma
- Zustand
- Resend

## Repository Docs

- `docs/PROJECT_REFERENCE.md`
  - Quick architecture reference for future prompts and onboarding.
- `docs/PRODUCTION_AUDIT.md`
  - Structural, security, and scalability audit plus recommended next steps.

## Getting Started

### Prerequisites

- Node.js 20+ for the web app
- Bun if you want to run the current seed script directly

### Install

```bash
npm install
```

### Configure environment

```powershell
Copy-Item .env.example .env
```

Fill in the values in `.env`.

### Prisma setup

```bash
npx prisma generate
npx prisma db push
```

Optional seed:

```bash
bun run db:seed
```

### Start the app

```bash
npm run dev
```

### Production build

```bash
npm run build
npm run start
```

## Environment Variables

The canonical template lives in `.env.example`.

Key variables:

- `DATABASE_URL`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_VERSION`
- `MAIN_ADMIN_EMAIL`
- `SESSION_SECRET`
- `SESSION_COOKIE_NAME`
- `ALLOWED_ORIGINS`
- `RESEND_API_KEY`
- `CRON_SECRET`
- `ENABLE_DEMO_USERS`

Optional future storage variables:

- `S3_BUCKET`
- `S3_REGION`
- `S3_ENDPOINT`
- `S3_PUBLIC_BASE_URL`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

When deployed on Vercel with Vercel Postgres, the app will automatically use `POSTGRES_PRISMA_URL`, `POSTGRES_URL`, `POSTGRES_URL_NON_POOLING`, or `POSTGRES_URL_NO_SSL` if `DATABASE_URL` is not provided.

## Current Structure

```text
prisma/
  schema.prisma
  seed.ts
src/
  app/
    api/
    error.tsx
    not-found.tsx
    layout.tsx
    page.tsx
  components/
    safari/
    ui/
  contexts/
  data/
  hooks/
  lib/
  stores/
  types/
  proxy.ts
docs/
  PROJECT_REFERENCE.md
  PRODUCTION_AUDIT.md
```

## Important Runtime Notes

- Authentication is session-cookie based, not localStorage based.
- Protected API routes should use `requireUser()` or `requireRole()`.
- Input validation should use shared Zod schemas from `src/lib/validation.ts`.
- Background email work is queued through the `Job` model and drained by the cron route.
- `GET /api` is the health check endpoint.

## Deployment

### Vercel

Required settings:

1. Root Directory: `safaricharge-website`
2. Framework Preset: `Next.js`
3. No custom Output Directory override

This repo includes `vercel.json` to force a normal Next.js build path.

### Recommended production infrastructure

- Managed Postgres instead of SQLite
- Shared rate limiting store such as Redis or Upstash
- Object storage plus CDN for future file uploads
- Centralized logging and monitoring

## Security Notes

- Passwords use scrypt-based hashing
- Sessions are stored server-side in the database
- Cookies are httpOnly and secure in production
- Role-based access is enforced on the server
- Rate limiting is enabled for high-risk routes
- Environment configuration is validated at startup

## Next Recommended Steps

1. Move Prisma from SQLite to managed Postgres before launch.
2. Replace in-memory rate limiting and queue coordination with shared infrastructure.
3. Run a full build, lint, and Prisma generate in an environment with Node or Bun installed.
4. Split the single-page authenticated shell into feature routes.
5. Add password reset flows and storage-backed uploads when the required infrastructure is ready.
