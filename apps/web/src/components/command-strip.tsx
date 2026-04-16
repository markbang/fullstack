import { defaultCommands } from '@repo/shared'
import { SurfaceCard } from '@repo/ui-react'

export function CommandStrip() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {defaultCommands.map((command) => (
        <SurfaceCard
          key={command}
          className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
          description={<code className="mt-3 block break-words text-sm text-white">{command}</code>}
          title={<span className="text-xs uppercase tracking-[0.2em] text-white/40">Command</span>}
        />
      ))}
    </section>
  )
}
