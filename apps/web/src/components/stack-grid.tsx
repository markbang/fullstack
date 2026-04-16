import { workspaceApps } from '@repo/shared'
import { WorkspaceAppGrid } from '@repo/ui-react'

export function StackGrid() {
  return <WorkspaceAppGrid apps={workspaceApps} variant="detailed" />
}
