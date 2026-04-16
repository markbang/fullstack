import { brand, getApiHealthUrl, getDocsUrl } from '@repo/shared'
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Elegant Stack · Web',
      },
      {
        name: 'description',
        content: 'A polished Bun + Turborepo template powered by TanStack Start.',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="min-h-screen bg-[var(--app-bg)] text-white">
          <header className="sticky top-0 z-40 border-b border-white/8 bg-black/24 backdrop-blur-xl">
            <div className="stack-shell flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <a className="flex items-center gap-3 no-underline" href="/">
                <span className="rounded-full border border-white/12 bg-white/8 p-2.5 text-accent shadow-[0_10px_32px_rgba(110,231,216,0.12)]">
                  <span className="i-lucide-orbit text-lg" />
                </span>
                <span className="min-w-0">
                  <strong className="block text-sm font-semibold text-white">{brand.name}</strong>
                  <span className="text-xs text-white/50">{brand.tagline}</span>
                </span>
              </a>

              <nav className="inline-flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/6 p-1 text-sm text-white/68">
                <a
                  className="rounded-full px-3 py-2 transition hover:bg-white/8 hover:text-white"
                  href="/stack"
                >
                  Stack
                </a>
                <a
                  className="rounded-full px-3 py-2 transition hover:bg-white/8 hover:text-white"
                  href={getDocsUrl()}
                >
                  Docs
                </a>
                <a
                  className="rounded-full px-3 py-2 transition hover:bg-white/8 hover:text-white"
                  href={getApiHealthUrl()}
                >
                  API
                </a>
              </nav>
            </div>
          </header>

          <main>
            <Outlet />
          </main>

          <footer className="border-t border-white/10 py-6 text-sm text-white/50">
            <div className="stack-shell flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p>Template-first, intentionally light, ready for real product work.</p>
              <p>Biome · UnoCSS · HeroUI · TanStack Start</p>
            </div>
          </footer>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
