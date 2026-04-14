# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24 (see `.nvmrc` and `package.json` engines)
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (static build)
- **API**: Cloudflare Pages Functions
- **Database**: Cloudflare D1 (SQLite)
- **Validation**: Zod
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: Vite → `dist/` for Pages deployment

## Artifacts

### Advaitam Villas (`artifacts/advaitam-villas`)

- **Preview path**: `/`
- **Type**: React + Vite landing page with admin dashboard
- **Pages**:
  - `/` — High-converting luxury villa landing page with lead capture form, exit intent popup, sticky WhatsApp button
  - `/admin` — Sales CRM dashboard for managing leads

## Key Features

- Lead capture form on landing page posts to `/api/leads`
- Exit intent popup submits leads with source `exit-popup`
- Admin dashboard at `/admin` shows all leads with stats, filters, status update, notes, and delete
- Tables auto-created on first request (idempotent, no demo data in production)

## Database Schema

- **leads** table: id, name, phone, email, source, status, notes, createdAt, updatedAt
  - source: brochure | site-visit | whatsapp | exit-popup
  - status: new | contacted | qualified | lost

## API Endpoints

- `GET /api/leads` — list leads (filter by status, source)
- `POST /api/leads` — create lead
- `GET /api/leads/stats` — summary stats
- `GET /api/leads/:id` — single lead
- `PATCH /api/leads/:id` — update status/notes
- `DELETE /api/leads/:id` — delete lead

## Key Commands

- `pnpm run typecheck` — typecheck active packages (excludes legacy)
- `pnpm run build` — typecheck + build all active packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/advaitam-villas run dev` — run Vite dev server
- `pnpm --filter @workspace/advaitam-villas run pages:dev` — run Pages Functions + D1 locally

See `artifacts/advaitam-villas/DEPLOY.md` for Cloudflare deployment details.
