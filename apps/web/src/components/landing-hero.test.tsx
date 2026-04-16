import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { LandingHero } from './landing-hero'

describe('LandingHero', () => {
  it('renders the template headline and app folders', () => {
    render(<LandingHero onExploreStack={vi.fn()} onOpenDocs={vi.fn()} />)

    expect(screen.getByText('一个适合继续扩展的全栈模板仓库。')).toBeDefined()
    expect(screen.getByText('apps/web')).toBeDefined()
    expect(screen.getByText('apps/api')).toBeDefined()
  })
})
