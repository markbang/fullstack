import { createFileRoute } from '@tanstack/react-router'

const sections = [
  {
    title: 'apps/web',
    points: [
      'TanStack Start SSR-ready React app',
      'HeroUI for polished UI primitives',
      'UnoCSS icons + utility shortcuts',
    ],
  },
  {
    title: 'apps/docs',
    points: [
      'Fumadocs content workflow',
      'TanStack Start hosting model',
      'Search-ready docs surface',
    ],
  },
  {
    title: 'apps/desktop',
    points: [
      'Tauri v2 shell with SolidJS',
      'Native command bridge example',
      'UnoCSS-only UI styling',
    ],
  },
  {
    title: 'apps/api',
    points: [
      'Hono HTTP app on Bun runtime',
      'Drizzle schema + migrations',
      'SQLite by default for zero-config local dev',
    ],
  },
]

export const Route = createFileRoute('/stack')({
  component: StackPage,
})

function StackPage() {
  return (
    <div className="stack-shell flex flex-col gap-6 py-10 md:py-14">
      <section className="stack-panel px-6 py-8 sm:px-10">
        <p className="stack-label">Workspace map</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
          Four apps, one calm baseline.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
          The template keeps every surface isolated enough to scale independently, while still
          sharing enough tooling to feel like one repo.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className="stack-panel min-w-0 p-6">
            <h2 className="text-xl font-semibold text-white">{section.title}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-white/72">
              {section.points.map((point) => (
                <li key={point} className="break-words">
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  )
}
