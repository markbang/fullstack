# Elegant Stack

[![bun](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmarkbang%2Ffullstack%2Fmain%2Fpackage.json&query=%24.packageManager&label=bun&logo=bun&color=000000&style=flat-square)](https://bun.sh) [![turbo](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmarkbang%2Ffullstack%2Fmain%2Fpackage.json&query=%24.devDependencies.turbo&label=turbo&logo=turborepo&color=EF4444&style=flat-square)](https://turbo.build) [![typescript](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmarkbang%2Ffullstack%2Fmain%2Fapps%2Fweb%2Fpackage.json&query=%24.devDependencies.typescript&label=typescript&logo=typescript&color=3178C6&style=flat-square)](https://www.typescriptlang.org) [![biome](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmarkbang%2Ffullstack%2Fmain%2Fpackage.json&query=%24.devDependencies%5B'%40biomejs%2Fbiome'%5D&label=biome&logo=biome&color=60A5FA&style=flat-square)](https://biomejs.dev) [![vitest](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmarkbang%2Ffullstack%2Fmain%2Fapps%2Fweb%2Fpackage.json&query=%24.devDependencies.vitest&label=vitest&logo=vitest&color=6E9F18&style=flat-square)](https://vitest.dev) [![react](https://img.shields.io/github/package-json/dependency-version/markbang/fullstack/react?filename=apps/web/package.json&label=react&logo=react&color=61DAFB&style=flat-square)](https://react.dev) [![tanstack start](https://img.shields.io/github/package-json/dependency-version/markbang/fullstack/%40tanstack%2Freact-start?filename=apps%2Fweb%2Fpackage.json&label=tanstack%20start&logo=tanstack&color=FF4154&style=flat-square)](https://tanstack.com/start) [![tailwind](https://img.shields.io/github/package-json/dependency-version/markbang/fullstack/tailwindcss?filename=apps/web/package.json&label=tailwind&logo=tailwindcss&color=06B6D4&style=flat-square)](https://tailwindcss.com) [![unocss](https://img.shields.io/github/package-json/dependency-version/markbang/fullstack/unocss?filename=packages/uno-config/package.json&label=unocss&logo=unocss&color=8A2BE2&style=flat-square)](https://unocss.dev) [![hono](https://img.shields.io/github/package-json/dependency-version/markbang/fullstack/hono?filename=apps/api/package.json&label=hono&logo=hono&color=E36002&style=flat-square)](https://hono.dev) [![drizzle](https://img.shields.io/github/package-json/dependency-version/markbang/fullstack/drizzle-orm?filename=apps/api/package.json&label=drizzle&logo=drizzle&color=C5F74F&style=flat-square)](https://orm.drizzle.team) [![zod](https://img.shields.io/github/package-json/dependency-version/markbang/fullstack/zod?filename=apps/api/package.json&label=zod&logo=zod&color=3E67B1&style=flat-square)](https://zod.dev) [![fumadocs](https://img.shields.io/github/package-json/dependency-version/markbang/fullstack/fumadocs-core?filename=apps/docs/package.json&label=fumadocs&color=0EA5E9&style=flat-square)](https://fumadocs.vercel.app) [![electron](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmarkbang%2Ffullstack%2Fmain%2Fapps%2Fdesktop%2Fpackage.json&query=%24.devDependencies.electron&label=electron&logo=electron&color=47848F&style=flat-square)](https://www.electronjs.org) [![electron-vite](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fmarkbang%2Ffullstack%2Fmain%2Fapps%2Fdesktop%2Fpackage.json&query=%24.devDependencies%5B'electron-vite'%5D&label=electron-vite&logo=electron&color=646CFF&style=flat-square)](https://electron-vite.org) [![solid](https://img.shields.io/github/package-json/dependency-version/markbang/fullstack/solid-js?filename=apps/desktop/package.json&label=solid&logo=solid&color=2C4F7C&style=flat-square)](https://www.solidjs.com)

A polished Bun + Turborepo monorepo template with four apps:

- `apps/web` — TanStack Start + HeroUI
- `apps/docs` — Fumadocs on TanStack Start
- `apps/desktop` — Electron + SolidJS
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
  desktop/  Electron + SolidJS
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
- `apps/desktop` runs on Electron, built with electron-vite, demonstrates the main/preload IPC bridge, and packages with electron-builder (`bun run build:linux`, `build:mac`, `build:win`).
- Shared runtime helpers live in `packages/shared` (remeda is available there for functional utilities), React-facing reusable presentation primitives live in `packages/ui-react`, API-facing response contracts live in `packages/contracts`, and visual foundations live in `packages/design-tokens`.
