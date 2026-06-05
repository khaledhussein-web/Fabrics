# StageWare Website

StageWare is a React/Vite frontend with an Express and PostgreSQL backend.

## Local Development

Install dependencies in both applications:

```powershell
npm install
npm --prefix Frontend install
npm --prefix backend install
```

Create `backend/.env` from `backend/.env.example`, then run:

```powershell
npm run dev:all
```

## Release Check

Run the complete local release gate before pushing:

```powershell
npm run release:check
```

This runs frontend linting, backend tests, and the production frontend build.

## Production Deployment

Deploy the frontend and backend as separate services.

Frontend:

- Root directory: `Frontend`
- Build command: `npm ci && npm run build`
- Publish directory: `Frontend/dist`
- Set `VITE_API_URL` to the public backend origin.
- Set `VITE_SITE_URL=https://stageware.co.uk`.
- Configure the static host to rewrite application routes to `index.html`.

Backend:

- Root directory: `backend`
- Install command: `npm ci`
- Start command: `npm run start:production`
- Health check: `/api/health`
- Use a persistent deployment or include `backend/uploads` in every release because product images are served from that directory.

Required backend environment variables:

```text
NODE_ENV=production
DATABASE_URL=postgres://...
FRONTEND_URL=https://stageware.co.uk
CORS_ALLOWED_ORIGINS=https://stageware.co.uk
ADMIN_API_TOKEN=<at least 32 random characters>
WHATSAPP_UK_NUMBER=447441922124
WHATSAPP_DEFAULT_TEXT=Hello, I need some help with your products.
WEB3FORMS_ACCESS_KEY=<optional contact notification key>
```

Connections configured with `DATABASE_URL` use TLS for managed PostgreSQL providers.

Generate the admin token locally:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

The production start command applies all pending Knex migrations before starting the API. The migrations are idempotent for the existing StageWare catalog database and create the new contact and error-log structures when needed.

Do not commit `.env` files, generated security reports, local SQLite databases, or build output.
