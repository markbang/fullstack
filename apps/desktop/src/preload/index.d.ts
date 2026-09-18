export type WorkspaceMeta = {
  framework: string
  platform: string
  runtime: string
  shell: string
}

declare global {
  interface Window {
    desktop: {
      workspaceMeta: () => Promise<WorkspaceMeta>
    }
  }
}
