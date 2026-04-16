const items = [
  {
    title: 'Web',
    path: 'apps/web',
    icon: 'i-lucide-monitor-smartphone',
    description: 'TanStack Start + HeroUI，适合作为品牌官网、后台外壳或应用前台。',
  },
  {
    title: 'Docs',
    path: 'apps/docs',
    icon: 'i-lucide-book-open-text',
    description: 'Fumadocs on TanStack Start，开箱即用的内容型文档站。',
  },
  {
    title: 'Desktop',
    path: 'apps/desktop',
    icon: 'i-lucide-laptop-minimal-check',
    description: 'Tauri v2 + SolidJS，保留原生桥接能力且前端非常轻。',
  },
  {
    title: 'API',
    path: 'apps/api',
    icon: 'i-lucide-server-cog',
    description: 'Hono + Drizzle + Bun SQLite，本地零配置即可跑通后端模板。',
  },
]

export function StackGrid() {
  return (
    <section className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
      {items.map((item) => (
        <article key={item.path} className="stack-panel flex min-h-[220px] flex-col p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/50">{item.path}</p>
            </div>
            <span className={`${item.icon} mt-1 text-2xl text-accent`} />
          </div>
          <p className="mt-8 text-sm leading-6 text-white/72">{item.description}</p>
        </article>
      ))}
    </section>
  )
}
