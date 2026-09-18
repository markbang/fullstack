import { create } from 'zustand'

type CommandStripState = {
  copiedCommand: string | null
  copyCommand: (command: string) => Promise<void>
}

export const useCommandStripStore = create<CommandStripState>((set) => ({
  copiedCommand: null,
  copyCommand: async (command) => {
    await navigator.clipboard.writeText(command)
    set({ copiedCommand: command })
  },
}))
