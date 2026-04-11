# Recruitment Management System

> **Demo version.** Live demo for recruiters admin panel: _[hiringrocket.vercel.app](https://hiringrocket.vercel.app)_

>  **Demo version.** Live demo for jobsite: _[jobeast.vercel.app](https://jobeast.vercel.app)_

A frontend application for a recruitment management platform. This repository showcases the **client-side architecture** of a real-world product — with a mock API layer added to make it fully runnable without an external backend.

---

## What this project demonstrates

### Multi-tenant architecture on Next.js App Router

The application serves **two independent products** from a single Next.js codebase, each on its own domain:

- **rekrutai** — recruiter's internal dashboard (pipeline management, candidate tracking)
- **jobsite** — public job board for applicants

Tenant routing is handled entirely by a custom **middleware** that reads the request domain and transparently rewrites the URL to the correct internal Route Group — no tenant prefix ever appears in the browser's address bar.

```
rekrutai.com/dashboard  →  (internal) /rekrutai/dashboard
jobsite.com/vacancies   →  (internal) /jobsite/vacancies
```

The middleware also:
- persists the origin host in a cookie so Server Actions (which don't carry `host` headers) can resolve tenant context;
- guards `/dashboard` routes with cookie-based auth checks;
- throws a dev-time error if a forbidden route prefix collision is detected.

### Feature-Sliced Design (FSD)

The `src/` directory follows FSD strictly: `shared → entities → features → widgets → pages-layer → app`. Each layer imports only from layers below it. Every module exposes a public API via `index.ts` — internal paths are never imported directly.

### Typed server-side API layer

All data fetching lives in `shared/api/`. The `apiGet`, `apiPost`, `apiPatch`, `apiDelete` helpers are Server Actions marked with `"use server"` — they automatically attach the Bearer token from cookies and handle error extraction in a typed way. `fetchJson` resolves the `baseUrl` from the current request's `host` header, which correctly handles the multi-tenant context.

### Mock API that preserves real architecture

In production, the app communicates with an **external REST backend**. For this demo, a mock backend is implemented as Next.js API Routes at `src/app/api/v1/`, backed by a flat `db.json` file.

> The client-side code is unchanged: it still makes HTTP requests through the same `shared/api` layer. The author is aware that calling data sources directly via Server Actions would be more efficient within Next.js — but doing so would have required reworking the client architecture that was designed around an external API.

### Drag-and-drop candidate board

The match/pipeline board uses **@dnd-kit** (core + sortable) for drag-and-drop interactions, wrapped in composable `DndBoard`, `DndDraggable`, `DndDroppable`, and `DndSortable` components under `features/dnd/`.

### Server Component + React Query hybrid

Pages use Next.js Server Components for initial data fetching (with `revalidate`) and TanStack React Query v5 for client-side mutations and cache invalidation — giving the best of both worlds without a global store.

---

## Tech stack

| | |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v3, Shadcn UI (Radix UI), tailwind-merge |
| Data fetching | TanStack React Query v5, Server Actions |
| Drag-and-drop | @dnd-kit/core, @dnd-kit/sortable |
| Validation | Zod |
| SVG | @svgr/webpack (`import Icon from '*.svg?rc'`) |
| Docs | TypeDoc |
| Commits | Commitizen + cz-conventional-changelog |
---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Set NEXT_PUBLIC_REKRUTAI_HOST and NEXT_PUBLIC_JOBSITE_HOST

# 3. Run dev server (clears .next cache automatically)
npm run dev
```

For local multi-domain testing, map subdomains in your `hosts` file and set matching env vars. Full setup instructions: [ARCHITECTURE.md](./ARCHITECTURE.md).


## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server (with `.next` cache cleared) |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run docs` | Generate TypeDoc API docs |
| `npm run serve:docs` | Serve docs at http://localhost:5000 |

---

## Architecture reference

For a detailed breakdown of the FSD layer structure, mock API internals and multi-tenant middleware — see [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## Internal navigation rules

- Inside a tenant, always use paths **without the tenant prefix**: `<Link href="/dashboard">` not `<Link href="/rekrutai/dashboard">`
- Cross-tenant navigation requires a full URL via `<a href="https://other-domain.com">` (triggers a full page reload for proper cookie/session isolation)

---

## Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://v3.tailwindcss.com/docs/installation)
- [Shadcn UI Documentation](https://ui.shadcn.com/docs)
- [Feature-Sliced Design](https://feature-sliced.design)
