import { brand, getWebUrl, workspaceApps } from '@repo/shared'
import {
  ActionRow,
  Eyebrow,
  FieldGrid,
  FieldHint,
  MarketingHighlights,
  MarketingSplitHero,
  ReadOnlyField,
  SectionStack,
  WorkspaceAppGrid,
} from '@repo/ui-react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { ArrowRight, Boxes, ExternalLink, Sparkles } from 'lucide-react'
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

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="stack-shell flex min-h-[calc(100vh-5rem)] flex-col justify-center gap-8 px-4 py-10">
        <MarketingSplitHero
          actions={
            <>
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
                href={getWebUrl()}
                className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-5 py-3 text-sm font-medium text-fd-foreground transition hover:border-fd-primary/40"
              >
                Visit web app
                <ExternalLink className="size-4" />
              </a>
            </>
          }
          aside={<WorkspaceAppGrid apps={workspaceApps} variant="compact" />}
          description={
            <p>
              Use this docs app as the public knowledge layer for the same workspace that ships your
              product surface, desktop shell, and backend.
            </p>
          }
          descriptionClassName="max-w-2xl text-base leading-7 text-fd-muted-foreground sm:text-lg"
          eyebrow={<Eyebrow>{brand.docsName}</Eyebrow>}
          title="Documentation for a polished Bun monorepo template."
          titleClassName="max-w-3xl text-4xl font-semibold tracking-tight text-fd-foreground sm:text-5xl"
        />

        <MarketingHighlights
          items={highlights.map((item) => ({
            ...item,
            icon: <item.icon className="size-5 text-fd-primary" />,
          }))}
        />

        <SectionStack className="stack-surface-card p-6">
          <div>
            <Eyebrow>Service override env</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold text-fd-foreground">
              Runtime links stay configurable.
            </h2>
            <FieldHint className="mt-3 max-w-2xl text-sm leading-6 text-fd-muted-foreground">
              Shared link helpers resolve service origins from environment variables first, then
              fall back to localhost defaults. These read-only fields show the default values you
              can override per environment.
            </FieldHint>
          </div>

          <FieldGrid>
            <ReadOnlyField
              hint="Primary product surface"
              label="VITE_WEB_ORIGIN"
              value="http://localhost:3000"
            />
            <ReadOnlyField
              hint="Documentation surface"
              label="VITE_DOCS_ORIGIN"
              value="http://localhost:3001"
            />
            <ReadOnlyField
              hint="Backend service origin"
              label="VITE_API_ORIGIN"
              value="http://localhost:3002"
            />
          </FieldGrid>

          <ActionRow>
            <a
              href="https://turborepo.dev/docs/crafting-your-repository/structuring-a-repository"
              className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-5 py-3 text-sm font-medium text-fd-foreground transition hover:border-fd-primary/40"
              rel="noreferrer"
              target="_blank"
            >
              Turbo structure guide
              <ExternalLink className="size-4" />
            </a>
          </ActionRow>
        </SectionStack>
      </div>
    </HomeLayout>
  )
}
