# Rekrut - Recruitment Management System

A modern recruitment management system built with Next.js 15, React 19, and TypeScript.

## 🚀 Features

- Modern UI with Tailwind CSS and Shadcn UI components
- Drag-and-drop functionality with dnd-kit
- Date handling with date-fns
- Command palette interface with cmdk
- Type-safe development with TypeScript
- SVG component support with SVGR
- Commit standardization with Commitizen

## 📋 Prerequisites

- Node.js (LTS version recommended)
- npm, yarn, or pnpm
- Git

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd rekrutai-fe
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

## 🚀 Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```


## 📦 Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run start` - Runs the production build
- `npm run lint` - Runs ESLint to check code quality


## 🎨 Styling

This project uses:
- Tailwind CSS for utility-first styling
- Shadcn UI for accessible components
- Tailwind Merge for class name management

## 🏢 Multitenancy & Routing Structure

This project follows a **multi-tenant architecture**, where each domain (or subdomain) maps to a dedicated application "space" within the `app` directory.

### 💡 Concept

Each tenant (e.g., `rekrutai`, `jobsite`) is isolated within its own subfolder under `/app`, like:

```
/app
  /rekrutai
    ...
  /jobsite
    ...
```

A **middleware** dynamically rewrites incoming requests based on the request’s domain, routing them to the correct app space. This enables clean URLs like:

```
https://site1.com/dashboard       → mapped internally to /rekrutai/dashboard
https://site2.com/dashboard       → mapped internally to /jobsite/dashboard
```

> ❗ URLs should not include app-space prefixes like `/rekrutai` or `/jobsite` externally — these are handled internally by the middleware.

### 📌 App Space Rules

To ensure clean separation between tenants and avoid routing conflicts:

1. **Do not** create routes inside one space (e.g., `/rekrutai`) using the name of another space (e.g., `/rekrutai/jobsite/...`)  
   This will result in a critical error during development.

2. Each app space owns its own subdirectory in `/app`.

### 🔗 Internal Navigation (`next/link`)

- Inside a tenant space (e.g., `rekrutai`), always use absolute paths **without the space prefix**:

```tsx
import Link from 'next/link';

<Link href="/dashboard">Go to Dashboard</Link> // ✅ Correct
<Link href="/rekrutai/dashboard">... </Link>    // 🚫 Wrong: hardcoded prefix
```

The middleware ensures the request will be routed to the correct internal directory based on the domain.

### 🌐 Cross-Site Navigation

Navigating between spaces (e.g., from `rekrutai` to `jobsite`) **should use `<a>` tags with full URLs**, as it involves changing domains:

```tsx
<a href="https://site2.com" target="_blank" rel="noopener noreferrer">
  Go to Jobsite
</a>
```

This allows for full-page reloads and proper cookie/session isolation between tenants.

### 🚧 Top-Level Route Prefix Restrictions

When defining routes within the space, ensure that **only one top-level route prefix is allowed per space**. For example:

- `jobsite.com/jobsite/*` or `rekrutai.com/rekrutai/*` is **not allowed**.
- This restriction applies to **top-level segments** relative to the space, meaning paths like `/jobsite/dashboard` are fine, but `/jobsite/jobsite/dashboard` is not.

If a user attempts to access an invalid route like `/jobsite/jobsite/dashboard`, they will be redirected to a 404 page or an error will be thrown.

#### Example of the validation in the middleware:

```ts
const forbiddenPrefixes = ["/rekrutai", "/jobsite"];

// Check if the first segment matches any forbidden prefix
const firstSegment = pathname.split("/")[1]; // Get the first path segment

if (forbiddenPrefixes.includes(`/${firstSegment}`)) {
  // If the first segment matches a forbidden space, redirect to 404
  return NextResponse.redirect(new URL("/404", request.url)); // Or throw an error if needed
}
```

This validation ensures that users cannot accidentally access a space from the wrong domain or mix up the routing structure.

### 🌍 Environment Variables

Each tenant domain must be declared using environment variables with the `NEXT_PUBLIC_` prefix so they are available on both server and client.

In your `.env` file:

```env
NEXT_PUBLIC_REKRUTAI_HOST=rekrutai.com
NEXT_PUBLIC_JOBSITE_HOST=jobsite.com
```

These values are used by the middleware to determine the internal route prefix for each domain. The mapping looks like this:

```ts
const rekrutaiHost = process.env.NEXT_PUBLIC_REKRUTAI_HOST || "";
const jobsiteHost = process.env.NEXT_PUBLIC_JOBSITE_HOST || "";
const hostMapping: HostMapping = {
  [rekrutaiHost]: "/rekrutai",
  [jobsiteHost]: "/jobsite",
};
```

> ✅ **Important**:
> - Avoid hardcoding domain names or route prefixes in your app.
> - The middleware will rewrite requests based on the matched host.
> - Always define all active tenant domains in the environment file.

## 🔧 Development Guidelines

### 🌍 Local Development with Multiple Domains

To simulate a multi-domain setup locally (for testing purposes), you can use different subdomains for each tenant. Here’s how to set it up:

1. **Update your `hosts` file** to map subdomains to `localhost`:
   - On **Windows**, edit `C:\Windows\System32\drivers\etc\hosts`.
   - On **macOS/Linux**, edit `/etc/hosts`.

   Add the following lines:

   ```txt
   127.0.0.1   rekrutai.local
   127.0.0.1   jobsite.local
   ```

2. **Set up environment variables**:
   In your `.env.local` file, set the following:

   ```env
   NEXT_PUBLIC_REKRUTAI_HOST=rekrutai.local
   NEXT_PUBLIC_JOBSITE_HOST=jobsite.local
   ```

3. **Start the application**:
   Run the app as usual with `npm run dev`, and access it from the following URLs:
   - [http://rekrutai.local:3000](http://rekrutai.local:3000) for `rekrutai` space
   - [http://jobsite.local:3000](http://jobsite.local:3000) for `jobsite` space

### SVG Usage
- To import SVG as a React component: `import SvgIcon from '*.svg?rc'`
- For regular SVG imports, use without the `?rc` suffix

### Committing Changes
This project uses Commitizen for standardized commit messages. Instead of `git commit`, use:
```bash
git cz
# or
cz
# or
git-cz
```

### Project Architecture (FSD)

- **`pages-layer`** — Page-level components composed of widgets, features, and entities.. 
- **`widgets`** — Composite components (e.g., `Header`, `Sidebar`).  
- **`features`** — Features dependent on business logic (e.g., `Auth`, `Profile`).  
- **`entities`** — Business entities (e.g., `User`, `Product`).  
- **`shared`** — Shared utilities, API, styles.  

> The `app` directory contains only Next.js routing and is not documented.

### Generating Documentation

1. Generate API documentation:
```bash
npm run docs
```

2. View documentation locally (requires global `serve`):
```bash
npm run serve:docs
```

The documentation will be available at [http://localhost:5000](http://localhost:5000).

### Contributing to Documentation

When contributing to the documentation:
1. Use JSDoc comments for all exported functions and components
2. Include usage examples in component documentation
3. Update relevant README files when making significant changes
4. Follow the established documentation structure

## 📚Docs

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://v3.tailwindcss.com/docs/installation)
- [Shadcn UI Documentation](https://ui.shadcn.com/docs)

