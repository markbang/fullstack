import { defaultCommands } from '@repo/shared'
import { SurfaceCard } from '@repo/ui-react'
import { useCommandStripStore } from '@/stores/command-strip'

export function CommandStrip() {
  const copiedCommand = useCommandStripStore((state) => state.copiedCommand)
  const copyCommand = useCommandStripStore((state) => state.copyCommand)

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {defaultCommands.map((command) => (
        <SurfaceCard
          key={command}
          className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
          description={<code className="mt-3 block break-words text-sm text-white">{command}</code>}
          title={<span className="text-xs uppercase tracking-[0.2em] text-white/40">Command</span>}
        >
          <button
            className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/72 transition hover:border-white/22 hover:bg-white/12 hover:text-white"
            onClick={() => void copyCommand(command)}
            type="button"
          >
            {copiedCommand === command ? 'Copied' : 'Copy'}
          </button>
        </SurfaceCard>
      ))}
    </section>
  )
}
