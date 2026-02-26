# Vercel-Ready pnpm Monorepo

This repo contains:

- `apps/web`: Svelte + Vite + Tailwind frontend
- `api/*.ts`: Vercel Serverless Functions (`/api/health`, `/api/contact`)

## Prerequisites

- Node.js 20+
- pnpm 9+
- Vercel CLI (installed via repo dev dependencies)

## Install

```bash
pnpm install
```

## Local Development

Log in once so `vercel dev` can run:

```bash
pnpm dlx vercel login
```

Then start development:

```bash
pnpm dev
```

This runs both:

- Vite dev server for frontend: `http://localhost:5173`
- `vercel dev` for API functions: `http://localhost:3000`

`apps/web/vite.config.js` proxies `/api` requests to `http://localhost:3000`, so frontend calls to `/api/*` work locally.

## Build

```bash
pnpm build
```

This builds the frontend to `apps/web/dist`.

## Deploy to Vercel

```bash
pnpm dlx vercel
```

For production deployment:

```bash
pnpm dlx vercel --prod
```

Vercel uses:

- `pnpm install`
- `pnpm build`
- output directory: `apps/web/dist`
- API functions from `/api/*.ts`
