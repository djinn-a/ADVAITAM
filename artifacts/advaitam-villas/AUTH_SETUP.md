# Admin Authentication Setup

## Local Development

The default password for local development is `admin`.

To test locally:

```bash
cd artifacts/advaitam-villas
pnpm dev
```

Then navigate to `http://localhost:5173/admin` - you'll get a browser login prompt.

## Production Deployment

### Step 1: Set Your Password Hash

Generate a SHA-256 hash of your desired password:

```bash
# On macOS/Linux
echo -n "your-secure-password" | shasum -a 256

# Or use an online SHA-256 generator (not recommended for production passwords)
```

### Step 2: Add to Cloudflare

In the Cloudflare dashboard for your Pages project:

1. Go to **Settings** → **Environment variables**
2. Add variable: `ADMIN_PASSWORD_HASH`
3. Paste your SHA-256 hash as the value
4. Save and redeploy

### Protected Routes

The following routes require authentication:

- `/admin` (and all sub-paths)
- `/api/settings` (POST, PUT, DELETE - write operations only)
- `/api/leads/stats` (GET)
- `/api/leads/*` (POST, PUT, DELETE, PATCH - write operations only)

**Public Routes:**

- `/api/settings` (GET) - publicly accessible for site configuration

### Changing Password

1. Generate new SHA-256 hash of new password
2. Update `ADMIN_PASSWORD_HASH` in Cloudflare dashboard
3. Redeploy (or it will auto-apply)

### Security Notes

- Password is never sent or stored in plaintext
- Uses browser's native HTTP Basic Auth dialog
- Credentials are cached by browser until closed
- HTTPS enforced automatically by Cloudflare
