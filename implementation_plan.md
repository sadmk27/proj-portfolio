# Portfolio App Roadmap

This document outlines the tasks required to build the full portfolio application.

## ✅ Current Status (Foundational Setup)
- [x] Monorepo structure (npm workspaces + Turborepo)
- [x] Shared Packages: `@portfolio/tsconfig`, `@portfolio/database`, `@portfolio/validation`
- [x] API Foundation: Hono (Node Server)
- [x] Web Foundation: Vite + React + TanStack Router/Query
- [x] Linting & Quality: ESLint 9 (Flat Config) throughout
- [x] ESM everywhere (`type: module`)

---

## 🚀 Phase 1: Data & API (The Engine)
### Database Schema Expansion
- [ ] Add `skills` table (name, category, icon_name, proficiency)
- [ ] Add `experience` table (company, role, description, start_date, end_date)
- [ ] Add `social_links` table (platform, url, icon)
- [ ] Create a `db:seed` script in `packages/database` to populate initial data

### API Endpoints
- [ ] Implement `GET /api/portfolio` (aggregated data: project, skills, experience, about)
- [ ] Implement `POST /api/contact` (vaildated by shared Zod schema)
- [ ] Add global error handling and request logging to Hono

---

## 🎨 Phase 2: Design System & Foundation (The Look)
- [ ] Define CSS Theme Variables (colors, spacing, typography) in `apps/web/src/styles/theme.css`
- [ ] Build Core UI Components (Vanilla CSS):
    - [ ] `Button` (primary, secondary, ghost)
    - [ ] `Card` (standard and hover state)
    - [ ] `Section` (standard container with padding)
    - [ ] `AnimatedVisibility` (wrapper for smooth appear animations)
- [ ] Setup Layout:
    - [ ] Responsive Navigation (Desktop + Mobile Burger)
    - [ ] Footer with social icons

---

## 📄 Phase 3: Content Sections (The Showcase)
- [ ] **Hero Section**: High-impact intro, "Hire Me" CTA, and profile photo/illustration.
- [ ] **Projects Grid**: 
    - [ ] Fetch data from API using TanStack Query
    - [ ] Filter by tag/technology
    - [ ] "Project Detail" modal or page
- [ ] **Experience Timeline**: Vertical timeline showing career progression.
- [ ] **Skills Cloud**: Categorized skills (Frontend, Backend, Tools).
- [ ] **Contact Section**: 
    - [ ] Integrated form using `@portfolio/validation` Zod schema
    - [ ] Success/Loading/Error states

---

## 🔐 Phase 4: Portfolio Management (Admin)
- [ ] Setup Simple Auth for Admin routes (Password protected or simple token)
- [ ] Admin Dashboard routes in TanStack Router:
    - [ ] List/Edit/Delete Projects
    - [ ] Edit "About Me" and "Experiences"
- [ ] Image Upload integration (suggested: Cloudinary or simple local storage)

---

## 🏁 Phase 5: Polishing & Launch
- [ ] **SEO**: Comprehensive Meta tags, OpenGraph images, and sitemap.
- [ ] **Performance**: Image optimization, lazy loading, and Turborepo caching for CI.
- [ ] **Visual Polish**: 
    - [ ] Scroll animations (Intersection Observer)
    - [ ] Dark/Light mode toggle
    - [ ] Custom cursor (optional)
- [ ] **Deployment**:
    - [ ] Dockerize API
    - [ ] Static export for Frontend
    - [ ] Setup GitHub Actions for automated deployment
