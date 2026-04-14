# Cloudflare Pages Deployment Guide

This app is deployed to **Cloudflare Pages** with **Pages Functions** and **D1** database.

## Architecture

- **Frontend**: React + Vite → static build to `dist/`
- **Backend**: Cloudflare Pages Functions (`functions/` directory)
- **Database**: Cloudflare D1 (SQLite)
- **Hosting**: Cloudflare Pages

## Prerequisites

- Node.js 24+ (see `.nvmrc` at workspace root)
- pnpm package manager
- Wrangler CLI (`wrangler` is included as dev dependency)

## Local Development

### Standard Vite Dev (no Functions)

```bash
pnpm dev
```

Runs the Vite dev server at `http://localhost:5173` (or PORT env var).

### Full Pages Functions + D1 Dev

```bash
pnpm build        # Build the static site first
pnpm pages:dev    # Runs: wrangler pages dev dist --d1 D1
```

This serves the built site with Pages Functions and D1 binding at `http://localhost:8788`.

The D1 database will be created locally for testing. Tables are auto-created on first request (idempotent).

## Cloudflare Setup

### 1. Create D1 Database (once)

```bash
npx wrangler d1 create advaitam_villas
```

Note the database ID and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "D1"
database_name = "advaitam_villas"
database_id = "YOUR_DATABASE_ID"
```

### 2. Pages Project Settings

In Cloudflare Dashboard → Pages → Project Settings:

**Build Settings:**
- Build command: `pnpm build`
- Build output directory: `dist`
- Root directory: `artifacts/advaitam-villas`

**Environment Variables:** (none required for basic operation)

**Functions:**
- Functions directory: `functions` (at project root)

**D1 Binding:**
- Variable name: `D1`
- Database: `advaitam_villas`

### 3. Deploy

#### Production Deploy

Push to main branch or use Wrangler:

```bash
npx wrangler pages deploy dist
```

#### Preview Deploy

Every PR gets a preview URL automatically.

## Database Schema

The `leads` table is auto-created on first API request:

```sql
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  source TEXT NOT NULL DEFAULT 'brochure',
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**Sources:** `brochure`, `site-visit`, `whatsapp`, `exit-popup`

**Statuses:** `new`, `contacted`, `qualified`, `lost`

## API Endpoints

All endpoints are served by Pages Functions at `/api/*`:

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/healthz` | Health check |
| GET | `/api/leads` | List leads (filter by status, source) |
| POST | `/api/leads` | Create lead |
| GET | `/api/leads/stats` | Lead statistics |
| GET | `/api/leads/:id` | Get single lead |
| PATCH | `/api/leads/:id` | Update status/notes |
| DELETE | `/api/leads/:id` | Delete lead |

## Testing

### Local Smoke Tests

With `pnpm pages:dev` running:

1. Landing page form → creates lead with source `brochure`
2. Exit intent popup → creates lead with source `exit-popup`
3. Admin at `/admin` shows leads
4. Stats update after creation
5. Edit status/notes works
6. Delete works

### Preview Environment

1. Open PR → triggers preview deploy
2. Test against preview URL
3. Merge to main → production deploy

## Troubleshooting

### Build fails with "PORT required"

Ensure vite.config.ts uses sane defaults (already done). The build should not require PORT or BASE_PATH env vars.

### Functions not working locally

Make sure you run `pnpm build` before `pnpm pages:dev`. The `dist` folder must exist.

### D1 binding errors

Verify `wrangler.toml` has the correct `database_id` for your account.

## Migration from Express/Postgres

The old Express + Postgres stack in `artifacts/api-server/` and `lib/db/` is **legacy**. No data migration is provided - this is a clean start with D1.

## Environment-Specific Notes

- **Node version**: Pinned to 24+ (see `.nvmrc` and root `package.json` engines)
- **No demo data**: Production does not auto-seed demo leads
- **Admin is public**: No authentication on `/admin` for v1
