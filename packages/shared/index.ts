import { entries, find, mapValues } from 'remeda'

export const brand = {
  name: 'Elegant Stack',
  docsName: 'Elegant Stack Docs',
  tagline: 'Bun + Turbo monorepo template',
  heroTitle: '一个适合继续扩展的全栈模板仓库。',
  heroDescription:
    'Bun 管理依赖，Turbo 编排任务，Web / Docs / Desktop / API 四个应用各司其职，默认保留优雅的设计基线，而不是塞满样板噪音。',
} as const

export const heroTags = ['bun', 'turbo', 'tanstack start', 'tauri v2', 'hono', 'fumadocs'] as const

export const defaultCommands = ['bun install', 'bun run dev', 'bun run check'] as const

export const servicePorts = {
  web: 3000,
  docs: 3001,
  api: 3002,
  desktop: 1420,
} as const

export type ServiceName = keyof typeof servicePorts

export const serviceOriginEnvKeys: Record<ServiceName, readonly string[]> = {
  web: ['VITE_WEB_ORIGIN', 'WEB_ORIGIN'],
  docs: ['VITE_DOCS_ORIGIN', 'DOCS_ORIGIN'],
  api: ['VITE_API_ORIGIN', 'API_ORIGIN'],
  desktop: ['VITE_DESKTOP_ORIGIN', 'DESKTOP_ORIGIN'],
}

type EnvRecord = Record<string, string | undefined>

function readEnv(key: string) {
  const processEnv =
    typeof process !== 'undefined' && process.env ? (process.env as EnvRecord) : undefined
  const viteEnv = (import.meta as ImportMeta & { env?: EnvRecord }).env

  return viteEnv?.[key] ?? processEnv?.[key]
}

export type ServiceOriginValidationIssue = {
  service: ServiceName
  key: string
  reason: string
  value: string
}

type ServiceOriginOverride = { key: string; value: string }

function readServiceOriginOverride(keys: readonly string[]): ServiceOriginOverride | undefined {
  return find(
    keys.map((key) => ({ key, value: readEnv(key) })),
    (entry): entry is ServiceOriginOverride => Boolean(entry.value),
  )
}

export function readServiceOriginOverrides() {
  return mapValues(serviceOriginEnvKeys, readServiceOriginOverride)
}

export function validateServiceOriginOverrides(
  overrides = readServiceOriginOverrides(),
): ServiceOriginValidationIssue[] {
  const issues: ServiceOriginValidationIssue[] = []

  for (const [service, override] of entries(overrides)) {
    if (!override) continue

    try {
      const url = new URL(override.value)
      if (url.pathname !== '/' || url.search || url.hash) {
        issues.push({
          service,
          key: override.key,
          value: override.value,
          reason: 'must be an origin without path, query, or hash',
        })
      }
    } catch {
      issues.push({
        service,
        key: override.key,
        value: override.value,
        reason: 'must be a valid absolute URL',
      })
    }
  }

  return issues
}

export function assertValidServiceOriginOverrides(overrides = readServiceOriginOverrides()) {
  const issues = validateServiceOriginOverrides(overrides)

  if (issues.length > 0) {
    throw new Error(
      issues
        .map(
          (issue) =>
            `[shared] Invalid ${issue.key} for ${issue.service}: ${issue.reason} (${issue.value})`,
        )
        .join('\n'),
    )
  }

  return overrides
}

export function getServiceOrigin(service: ServiceName) {
  const port = servicePorts[service]
  const override = assertValidServiceOriginOverrides()[service]?.value

  if (override) {
    return override
  }

  if (typeof window === 'undefined') {
    return `http://localhost:${port}`
  }

  return `${window.location.protocol}//${window.location.hostname}:${port}`
}

export function getDocsUrl() {
  return getServiceOrigin('docs')
}

export function getWebUrl() {
  return getServiceOrigin('web')
}

export function getApiHealthUrl() {
  return `${getServiceOrigin('api')}/health`
}

export function openDocs() {
  window.location.assign(getDocsUrl())
}

export type WorkspaceApp = {
  slug: ServiceName
  title: string
  path: string
  iconKey: string
  shortDescription: string
  description: string
  points: string[]
}

export const workspaceApps: WorkspaceApp[] = [
  {
    slug: 'web',
    title: 'Web',
    path: 'apps/web',
    iconKey: 'monitor-smartphone',
    shortDescription: 'TanStack Start + HeroUI',
    description: 'TanStack Start + HeroUI，适合作为品牌官网、后台外壳或应用前台。',
    points: [
      'TanStack Start SSR-ready React app',
      'HeroUI for polished UI primitives',
      'UnoCSS icons + utility shortcuts',
    ],
  },
  {
    slug: 'docs',
    title: 'Docs',
    path: 'apps/docs',
    iconKey: 'book-open-text',
    shortDescription: 'Fumadocs + content collections',
    description: 'Fumadocs on TanStack Start，开箱即用的内容型文档站。',
    points: [
      'Fumadocs content workflow',
      'TanStack Start hosting model',
      'Search-ready docs surface',
    ],
  },
  {
    slug: 'desktop',
    title: 'Desktop',
    path: 'apps/desktop',
    iconKey: 'laptop-minimal-check',
    shortDescription: 'Tauri v2 + SolidJS',
    description: 'Tauri v2 + SolidJS，保留原生桥接能力且前端非常轻。',
    points: [
      'Tauri v2 shell with SolidJS',
      'Native command bridge example',
      'UnoCSS-only UI styling',
    ],
  },
  {
    slug: 'api',
    title: 'API',
    path: 'apps/api',
    iconKey: 'server-cog',
    shortDescription: 'Hono + Drizzle + SQLite',
    description: 'Hono + Drizzle + Bun SQLite，本地零配置即可跑通后端模板。',
    points: [
      'Hono HTTP app on Bun runtime',
      'Drizzle schema + migrations',
      'SQLite by default for zero-config local dev',
    ],
  },
]
