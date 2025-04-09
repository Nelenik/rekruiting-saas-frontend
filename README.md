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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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

## 🔧 Development Guidelines

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

