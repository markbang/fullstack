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

### Use this template with git

If you want to start a fresh repository from this template with plain `git`:

```bash
git clone --depth=1 git@github.com:markbang/fullstack.git my-app
cd my-app
rm -rf .git
git init -b main
git add .
git commit -m "Initialize from Elegant Stack template"
```

Then connect it to your own repository:

```bash
git remote add origin git@github.com:YOUR_NAME/YOUR_REPO.git
git push -u origin main
```

### Targeted dev commands

```bash
bun run dev:web
bun run dev:docs
bun run dev:desktop
bun run dev:api
```

### Quality gates

```bash
bun run lint
bun run typecheck
bun run test
bun run build
```

### Database workflow

```bash
bun run db:generate
bun run db:migrate
bun run db:studio
```

### Service URL overrides

Shared service links resolve from environment variables first, then fall back to localhost defaults.

```bash
cp .env.example .env
```

Supported overrides:

- `VITE_WEB_ORIGIN`
- `VITE_DOCS_ORIGIN`
- `VITE_API_ORIGIN`
- `WEB_ORIGIN`
- `DOCS_ORIGIN`
- `API_ORIGIN`

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

- `apps/api` is intentionally zero-config for local development and defaults to a local SQLite file.
- `apps/web` and `apps/docs` keep Tailwind CSS 4 because HeroUI and Fumadocs depend on it, while UnoCSS remains available across the monorepo for utilities and icons.
- `apps/desktop` uses a native Tauri command to demonstrate the Rust ↔ frontend bridge without adding unnecessary complexity.
- Shared runtime helpers live in `packages/shared`, React-facing reusable presentation primitives live in `packages/ui-react`, API-facing response contracts live in `packages/contracts`, and visual foundations live in `packages/design-tokens`.
