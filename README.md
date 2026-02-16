# Portfolio Monorepo

This is a monorepo setup for a modern Portfolio Web App, built with:

- **Monorepo Tooling**: [Turborepo](https://turbo.build/) + [npm](https://www.npmjs.com/)
- **Frontend**: [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TanStack Router](https://tanstack.com/router/latest) + [TanStack Query](https://tanstack.com/query/latest)
- **Backend**: [Node.js](https://nodejs.org/) + [Hono](https://hono.dev/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) + [Drizzle ORM](https://orm.drizzle.team/)
- **Validation**: [Zod](https://zod.dev/)

## Structure

- `apps/web`: The Frontend application (Vite + React)
- `apps/api`: The Backend API (Node.js + Hono)
- `packages/database`: Shared database schema and connection (Drizzle ORM)
- `packages/validation`: Shared Zod validation schemas
- `packages/tsconfig`: Shared TypeScript configurations

## Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Environment Variables**
   Ensure `.env` exists in root (see `.env.example`).

3. **Database**
   - Start DB: `docker-compose up -d`
   - Push Schema: `npm run db:push`
   - View Data: `npm run db:studio`

4. **Run Development Server**
   ```bash
   npm run dev
   ```

   - Web: http://localhost:5173
   - API: http://localhost:3000

## Recommended Stack Additions

- **Tailwind CSS**: For utility-first styling (highly recommended with Vite/React).
- **tRPC**: For end-to-end type safety between `api` and `web`.
- **Biome**: For high-performance linting and formatting.
- **Storybook**: For developing UI components in isolation.
