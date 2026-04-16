import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { CommandStrip } from '@/components/command-strip'
import { LandingHero } from '@/components/landing-hero'
import { StackGrid } from '@/components/stack-grid'
import { openDocs } from '@/lib/service-links'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const navigate = useNavigate()

  return (
    <div className="stack-shell flex flex-col gap-6 py-10 md:py-14">
      <LandingHero onExploreStack={() => navigate({ to: '/stack' })} onOpenDocs={openDocs} />

      <StackGrid />

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="stack-panel min-w-0 p-6">
          <div className="flex flex-col items-start gap-2">
            <p className="stack-label">Why this template</p>
            <h2 className="text-2xl font-semibold text-white">
              A clean baseline, not a noisy demo.
            </h2>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-6 text-white/72 md:text-base">
            <p>
              Web, docs, desktop, and API are already separated, but the shared developer experience
              stays small: Bun for installs, Turbo for orchestration, Biome for consistency, and
              UnoCSS for lightweight utilities and icons.
            </p>
            <p>
              Tailwind CSS 4 remains in the React apps where HeroUI and Fumadocs require it, so the
              template stays pragmatic instead of dogmatic.
            </p>
          </div>
        </article>

        <article className="stack-panel min-w-0 p-6">
          <div className="flex flex-col items-start gap-2">
            <p className="stack-label">Default commands</p>
            <h2 className="text-2xl font-semibold text-white">Day-one workflow</h2>
          </div>
          <div className="mt-4 min-w-0">
            <CommandStrip />
          </div>
        </article>
      </section>
    </div>
  )
}
