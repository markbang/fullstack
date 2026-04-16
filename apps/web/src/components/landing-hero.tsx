import { Chip } from '@heroui/react'

const tags = ['bun', 'turbo', 'tanstack start', 'tauri v2', 'hono', 'fumadocs']

export function LandingHero(props: { onOpenDocs: () => void; onExploreStack: () => void }) {
  return (
    <section className="stack-panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(110,231,216,0.16),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(147,197,253,0.16),transparent_36%)]" />
      <div className="relative max-w-4xl space-y-6">
        <p className="stack-label">Elegant Stack</p>
        <h1 className="max-w-[14ch] text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          一个适合继续扩展的全栈模板仓库。
        </h1>
        <p className="max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
          Bun 管理依赖，Turbo 编排任务，Web / Docs / Desktop / API 四个应用各司其职，
          默认保留优雅的设计基线，而不是塞满样板噪音。
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Chip key={tag} className="rounded-full" color="accent" size="sm" variant="soft">
              {tag}
            </Chip>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/92"
            onClick={props.onExploreStack}
            type="button"
          >
            查看应用栈
          </button>
          <button
            className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/22 hover:bg-white/12"
            onClick={props.onOpenDocs}
            type="button"
          >
            打开文档
          </button>
        </div>
      </div>

      <div className="relative mt-8 flex flex-wrap gap-3 text-sm text-white/72">
        <code className="rounded-full border border-white/12 bg-black/20 px-3 py-1">apps/web</code>
        <code className="rounded-full border border-white/12 bg-black/20 px-3 py-1">apps/docs</code>
        <code className="rounded-full border border-white/12 bg-black/20 px-3 py-1">
          apps/desktop
        </code>
        <code className="rounded-full border border-white/12 bg-black/20 px-3 py-1">apps/api</code>
      </div>
    </section>
  )
}
