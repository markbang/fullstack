import { workspaceApps } from '@repo/shared'
import { Eyebrow, Panel, WorkspaceAppGrid } from '@repo/ui-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stack')({
  component: StackPage,
})

function StackPage() {
  return (
    <div className="stack-shell flex flex-col gap-6 py-10 md:py-14">
      <Panel className="px-6 py-8 sm:px-10">
        <Eyebrow>Workspace map</Eyebrow>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">
          Four apps, one calm baseline.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
          The template keeps every surface isolated enough to scale independently, while still
          sharing enough tooling to feel like one repo.
        </p>
      </Panel>

      <WorkspaceAppGrid apps={workspaceApps} variant="bulleted" />
    </div>
  )
}
