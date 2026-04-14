# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

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
- 10 demo leads seeded on creation

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

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
