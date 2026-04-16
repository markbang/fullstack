const commands = ['bun install', 'bun run dev', 'bun run check']

export function CommandStrip() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {commands.map((command) => (
        <div
          key={command}
          className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Command</p>
          <code className="mt-3 block break-words text-sm text-white">{command}</code>
        </div>
      ))}
    </section>
  )
}
