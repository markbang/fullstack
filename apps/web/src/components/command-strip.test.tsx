import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CommandStrip } from './command-strip'

describe('CommandStrip', () => {
  beforeEach(() => {
    Object.defineProperty(window.navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    })
  })

  it('copies a command and reflects the copied state', async () => {
    render(<CommandStrip />)

    fireEvent.click(screen.getAllByRole('button', { name: 'Copy' })[0])

    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith('bun install')
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Copied' })).toBeDefined()
    })
  })
})
