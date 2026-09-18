import { createResource, For } from 'solid-js'

const features = [
  {
    title: 'Electron shell',
    description: 'electron-vite keeps the main, preload, and renderer builds fast to iterate on.',
    icon: 'i-lucide-box',
  },
  {
    title: 'SolidJS UI',
    description: 'A small reactive view layer that feels perfect for desktop surfaces.',
    icon: 'i-lucide-panels-top-left',
  },
  {
    title: 'UnoCSS theme',
    description: 'Shared shortcuts and icons make the desktop app feel part of the same system.',
    icon: 'i-lucide-sparkles',
  },
]

function App() {
  const [meta] = createResource(() => window.desktop.workspaceMeta())

  return (
    <main class="min-h-screen py-10 text-white">
      <div class="stack-shell flex flex-col gap-6">
        <section class="stack-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
          <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div class="max-w-2xl space-y-4">
              <p class="stack-label">Elegant Stack Desktop</p>
              <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">
                Electron shell, same elegant repo.
              </h1>
              <p class="stack-muted">
                This app demonstrates the Electron + SolidJS lane of the template and keeps a small
                IPC bridge ready for expansion.
              </p>
            </div>

            <div class="stack-panel min-w-[260px] p-5">
              <p class="stack-label">IPC bridge</p>
              <div class="mt-4 space-y-3 text-sm text-white/72">
                <p>
                  <span class="text-white/48">platform</span>
                  <strong class="ml-2 text-white">{meta()?.platform ?? 'loading...'}</strong>
                </p>
                <p>
                  <span class="text-white/48">runtime</span>
                  <strong class="ml-2 text-white">{meta()?.runtime ?? 'loading...'}</strong>
                </p>
                <p>
                  <span class="text-white/48">framework</span>
                  <strong class="ml-2 text-white">{meta()?.framework ?? 'loading...'}</strong>
                </p>
                <p>
                  <span class="text-white/48">shell</span>
                  <strong class="ml-2 text-white">{meta()?.shell ?? 'loading...'}</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="stack-grid">
          <For each={features}>
            {(feature) => (
              <article class="stack-panel p-5">
                <div class="flex items-center justify-between gap-4">
                  <h2 class="text-lg font-semibold text-white">{feature.title}</h2>
                  <span class={`${feature.icon} text-2xl text-accent`} />
                </div>
                <p class="mt-3 text-sm leading-6 text-white/68">{feature.description}</p>
              </article>
            )}
          </For>
        </section>

        <section class="stack-panel grid gap-4 px-6 py-6 text-sm text-white/68 md:grid-cols-3">
          <div>
            <p class="stack-label">Dev</p>
            <p class="mt-3 font-mono text-white">bun run dev:desktop</p>
          </div>
          <div>
            <p class="stack-label">Bridge</p>
            <p class="mt-3 font-mono text-white">window.desktop.workspaceMeta()</p>
          </div>
          <div>
            <p class="stack-label">Build</p>
            <p class="mt-3 font-mono text-white">bun run build</p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
