import { createFileRoute, Link } from '@tanstack/react-router'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import {
  ArrowRight,
  BookOpenText,
  Boxes,
  ExternalLink,
  LaptopMinimalCheck,
  MonitorSmartphone,
  ServerCog,
  Sparkles,
} from 'lucide-react'
import { baseOptions } from '@/lib/layout.shared'

const highlights = [
  {
    title: 'Fast onboarding',
    description: 'Open the repo and understand the whole stack in minutes.',
    icon: Sparkles,
  },
  {
    title: 'Calm defaults',
    description: 'A small, maintainable baseline instead of a kitchen sink starter.',
    icon: Boxes,
  },
  {
    title: 'Real app surfaces',
    description: 'Web, docs, desktop, and API are already wired for expansion.',
    icon: ArrowRight,
  },
]

const appSurfaces = [
  {
    title: 'Web',
    description: 'TanStack Start + HeroUI',
    icon: MonitorSmartphone,
  },
  {
    title: 'Docs',
    description: 'Fumadocs + content collections',
    icon: BookOpenText,
  },
  {
    title: 'Desktop',
    description: 'Tauri v2 + SolidJS',
    icon: LaptopMinimalCheck,
  },
  {
    title: 'API',
    description: 'Hono + Drizzle + SQLite',
    icon: ServerCog,
  },
]

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="stack-shell flex min-h-[calc(100vh-5rem)] flex-col justify-center gap-8 px-4 py-10">
        <section className="stack-panel overflow-hidden p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)] lg:items-end">
            <div className="space-y-5">
              <p className="stack-label">Elegant Stack Docs</p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-fd-foreground sm:text-5xl">
                Documentation for a polished Bun monorepo template.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-fd-muted-foreground sm:text-lg">
                Use this docs app as the public knowledge layer for the same workspace that ships
                your product surface, desktop shell, and backend.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/docs/$"
                  params={{
                    _splat: '',
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-5 py-3 text-sm font-medium text-fd-primary-foreground transition hover:opacity-90"
                >
                  Open guides
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="http://localhost:3000"
                  className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-5 py-3 text-sm font-medium text-fd-foreground transition hover:border-fd-primary/40"
                >
                  Visit web app
                  <ExternalLink className="size-4" />
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {appSurfaces.map((surface) => {
                const Icon = surface.icon

                return (
                  <div key={surface.title} className="stack-surface-card p-4">
                    <Icon className="size-5 text-fd-primary" />
                    <p className="mt-4 text-sm font-semibold text-fd-foreground">{surface.title}</p>
                    <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
                      {surface.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="stack-surface-card p-5">
              <item.icon className="size-5 text-fd-primary" />
              <h2 className="mt-4 text-lg font-semibold text-fd-foreground">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </HomeLayout>
  )
}
