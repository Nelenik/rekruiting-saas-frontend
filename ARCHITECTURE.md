# Architecture

## Overview

Rekrut is a frontend application for a recruitment management platform. In production it communicates with an external REST backend. This repository is a **demo version**: routing, project structure, and client-side code are identical to the original; the external backend is replaced by a built-in mock API (see [Mock API](#mock-api) for details).

---

## Tech stack

| Category | Technologies |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v3, Shadcn UI (Radix UI), tailwind-merge |
| State / data fetching | TanStack React Query v5, Server Actions |
| Drag-and-drop | @dnd-kit/core, @dnd-kit/sortable |
| Validation | Zod |
| SVG | @svgr/webpack |
| Docs | TypeDoc |
| Commits | Commitizen + cz-conventional-changelog |

---

## Code organisation (Feature-Sliced Design)

Source code in `src/` follows the **Feature-Sliced Design** (FSD) methodology. Layers are ordered from the most isolated to the most composite:

```
src/
├── shared/          # Reusable utilities, base UI components, API layer, constants
├── entities/        # Domain entities: vacancy, cv, match, company, profile, status, comment, experience
├── features/        # Self-contained features with business logic
├── widgets/         # Composite UI blocks (navigation, filters, match board, etc.)
├── pages-layer/     # Page-level components assembled from widgets and features
└── app/             # Next.js App Router: routes, layouts, middleware, API routes
```

Each layer may only import from layers below it, which eliminates circular dependencies.

### Public module API

Every module (entity, feature, widget) exposes only what should be visible externally through its `index.ts` file. Direct imports bypassing `index.ts` are not used.

### Module structure

Typical module layout:

```
feature-name/
├── index.ts         # Public API (re-exports)
├── ui/              # React components
├── model/           # State, hooks, React Query queries
├── api/             # API call functions
└── lib/             # Module-local utilities
```

---

## Multi-tenant architecture

### Concept

The application supports two isolated tenants operating on separate domains, each representing a distinct product:

| Tenant | Purpose |
|---|---|
| `rekrutai` | Recruiter's internal dashboard |
| `jobsite` | Public job board for applicants |

Tenants are physically separated in the file system via Next.js **Route Groups**:

```
src/app/
├── (rekrutai)/rekrutai/    # Recruiter dashboard routes
└── (jobsite)/jobsite/      # Public job board routes
```

The Route Groups `(rekrutai)` and `(jobsite)` do not create a URL segment — they only provide layout and configuration isolation between tenants.

### Middleware: domain-based routing

`src/middleware.ts` is the central piece of the multi-tenancy mechanism. It:

1. **Resolves the request domain** — from the `x-forwarded-host` / `host` header, or from the `origin-host` cookie (cached on first request to survive proxy hops).
2. **Persists the domain in a cookie** — so that subsequent Server Action calls (which do not carry a `host` header) can still resolve the tenant context.
3. **Rewrites `pathname`** — prepends the internal prefix `/rekrutai` or `/jobsite`, directing the request to the correct Route Group.
4. **Protects routes** — redirects to the sign-in page if `/dashboard` routes are accessed without an auth cookie.
5. **Blocks invalid prefixes** — if the first path segment matches a tenant name (e.g. `/rekrutai/rekrutai/...`), a dev-time error is thrown; in production a 404 is returned.

```
rekrutai.com/dashboard  →  rewrite  →  /rekrutai/dashboard
jobsite.com/vacancies   →  rewrite  →  /jobsite/vacancies
```

The tenant prefix is never visible in the browser's address bar — it is fully transparent.

### Resolving tenant in Server Components

The Server Action `src/app/_actions/getTenant.ts` reads the `origin-host` cookie and returns the current domain. This allows server components and Server Actions to know the tenant context without extra props.

### Domain configuration

Domains are set via environment variables:

```env
NEXT_PUBLIC_REKRUTAI_HOST=rekrutai.com
NEXT_PUBLIC_JOBSITE_HOST=jobsite.com
```

The domain-to-prefix mapping is defined in the middleware:

```ts
const hostMapping = {
  [rekrutaiHost]: "/rekrutai",
  [jobsiteHost]: "/jobsite",
};
```

---

## Mock API

### Purpose

In the original product all data exchange happens with an external REST backend. For this demo, a mock backend is implemented as Next.js API Routes at `src/app/api/v1/`, so the project runs standalone without any external services.

This approach lets the **`shared/api` layer remain unchanged**: client code still calls `apiGet` / `apiPost` / `fetchJson`, which send HTTP requests — just to `localhost` instead of an external server.

> The author is aware that within Next.js it would be more efficient to read data directly via Server Actions without an intermediate HTTP layer. However, doing so would require reworking the client architecture that was designed around an external API.

### Mock backend internals

| File | Role |
|---|---|
| `db.json` | Flat JSON file used as a database (read/written synchronously via `fs`) |
| `src/app/api/v1/_lib/db.ts` | Helpers: `loadDb`, `saveDb`, `paginate`, `nextId`, response formatters |
| `src/app/api/v1/_lib/sessions.ts` | In-memory sessions via `global.__sessions` (survives hot-reload) |
| `src/app/api/v1/_lib/auth.ts` | Authentication helpers |
| `src/app/api/v1/` | Route handlers: `auth`, `vacancy`, `cv`, `match`, `company`, `status`, `tariffs` |

### Client API layer

`src/shared/api/` is the single API layer used by all features:

```
shared/api/
├── common/
│   ├── api.ts        # apiGet, apiPost, apiPatch, apiDelete with auth
│   ├── fetchJson.ts  # Simple fetch for public data (with auto base URL)
│   ├── errors.ts     # Typed error handling
│   └── utils.ts      # prepareBody and helpers
├── actions/          # Typed Server Actions per entity
├── types/            # Request / response types
└── constants.ts      # BASE_URL, AUTH_COOKIE_NAME, etc.
```

`apiGet` / `apiPost` and related functions are marked `"use server"` and automatically attach the Bearer token from cookies to the `Authorization` header.

`fetchJson` resolves `baseUrl` from the `host` header of the current request — important in the multi-tenant context where each domain has its own `origin-host`.

---

## Authentication

- Cookie-based: after sign-in an auth token cookie (`AUTH_COOKIE_NAME`) is set.
- Middleware checks for the cookie before allowing access to `/dashboard` routes.
- Server functions read the cookie via `next/headers` to build the `Authorization` header.

---

## Local development with multiple domains

To test both tenants simultaneously on a local machine:

### 1. Add entries to the `hosts` file

**Windows**: `C:\Windows\System32\drivers\etc\hosts`  
**macOS / Linux**: `/etc/hosts`

```
127.0.0.1   rekrutai.local
127.0.0.1   jobsite.local
```

### 2. Configure environment variables

Create `.env.local`:

```env
NEXT_PUBLIC_REKRUTAI_HOST=rekrutai.local
NEXT_PUBLIC_JOBSITE_HOST=jobsite.local
```

### 3. Start the dev server

```bash
npm run dev
```

Access:
- [http://rekrutai.local:3000](http://rekrutai.local:3000) — recruiter dashboard
- [http://jobsite.local:3000](http://jobsite.local:3000) — public job board

> `npm run dev` includes `rm -rf .next` before starting — this ensures a clean build when working with the mock API and `db.json`.

---

## Navigation rules between tenants

| Scenario | Approach |
|---|---|
| Navigation within a tenant | `<Link href="/path">` — no tenant prefix |
| Navigation between tenants | `<a href="https://other-domain.com">` — full URL |

Middleware automatically adds the correct internal prefix for the current tenant when using `<Link>`. Cross-tenant navigation involves a domain change and therefore requires a full browser request — hence `<a>` instead of client-side routing.

---

## Code documentation

The project uses TypeDoc to generate API documentation from JSDoc comments.

```bash
npm run docs          # Generate to ./docs/
npm run serve:docs    # Serve at http://localhost:5000
```
