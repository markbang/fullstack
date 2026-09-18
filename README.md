# Elegant Stack

A polished Bun + Turborepo monorepo template with four apps:

- `apps/web` — TanStack Start + HeroUI
- `apps/docs` — Fumadocs on TanStack Start
- `apps/desktop` — Tauri v2 + SolidJS
- `apps/api` — Hono + Drizzle + Bun SQLite

The repo keeps the shared developer experience small and predictable:

- **Bun workspaces** for package management
- **Turborepo** for task orchestration
- **Biome** for formatting + linting
- **UnoCSS + Icon preset** for lightweight utilities and iconography
- **Tailwind CSS 4 compatibility** where it is required by HeroUI and Fumadocs

## Quick start

```bash
bun install
bun run dev
```

### Use this template

```bash
npx gitpick https://github.com/markbang/fullstack
```

## Default ports

- Web: `3000`
- Docs: `3001`
- API: `3002`
- Desktop UI: `1420`

## Structure

```text
apps/
  api/      Hono + Drizzle + Bun SQLite
  desktop/  Tauri v2 + SolidJS
  docs/     Fumadocs on TanStack Start
  web/      TanStack Start + HeroUI

packages/
  contracts/          shared API contracts and DTOs
  design-tokens/      shared visual tokens
  shared/             shared runtime helpers and workspace metadata
  typescript-config/ shared TypeScript baselines
  ui-react/           shared React UI primitives
  uno-config/        shared UnoCSS theme and shortcuts
```

## Notes

- `apps/web` keeps small client-side state in zustand stores under `src/stores`.
- `apps/api` is intentionally zero-config for local development and defaults to a local SQLite file. Environment variables are validated with zod in `apps/api/src/env.ts` before the server starts.
- `apps/web` and `apps/docs` keep Tailwind CSS 4 because HeroUI and Fumadocs depend on it, while UnoCSS remains available across the monorepo for utilities and icons.
- `apps/desktop` uses a native Tauri command to demonstrate the Rust ↔ frontend bridge without adding unnecessary complexity.
- Shared runtime helpers live in `packages/shared` (remeda is available there for functional utilities), React-facing reusable presentation primitives live in `packages/ui-react`, API-facing response contracts live in `packages/contracts`, and visual foundations live in `packages/design-tokens`.
