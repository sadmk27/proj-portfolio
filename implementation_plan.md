# Implementation Plan: Monorepo Portfolio Web App

## Goal

Prepare a monorepo structure for a portfolio web app using:

- **PM**: pnpm + Turborepo
- **Frontend**: Vite + React + TanStack Router + TanStack Query
- **Backend**: Node.js (Hono or Express)
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM (Chosen for TypeScript-first schema definition and lightweight nature)
- **Shared**: Zod for validation

## Structure

```
/
├── pnpm-workspace.yaml
├── package.json
├── turbo.json
├── apps/
│   ├── web/ (Vite + TanStack Router/Query)
│   └── api/ (Node.js + Hono)
└── packages/
    ├── database/ (Drizzle ORM + Schema)
    ├── tsconfig/ (Shared TS Config)
    └── validation/ (Shared Zod schemas)
```

## Steps

1. [ ] Initialize Root Configuration (`package.json`, `pnpm-workspace.yaml`, `turbo.json`)
2. [ ] Create Shared Packages
   - [ ] `packages/tsconfig`
   - [ ] `packages/database` (Setup Drizzle)
   - [ ] `packages/validation` (Setup Zod)
3. [ ] Create Backend (`apps/api`)
4. [ ] Create Frontend (`apps/web`)
   - [ ] Setup Vite + React
   - [ ] Install TanStack Router + Query
   - [ ] Setup Basic Layout & CSS (Vanilla CSS for aesthetic quality)
5. [ ] Connect everything and verify.
