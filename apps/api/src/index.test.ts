import { describe, expect, it } from 'bun:test'
import { app } from './index'

describe('api', () => {
  it('responds to the health endpoint', async () => {
    const response = await app.request('/health')
    const payload = (await response.json()) as {
      ok: boolean
      service: string
    }

    expect(response.status).toBe(200)
    expect(payload.ok).toBe(true)
    expect(payload.service).toBe('Elegant Stack API')
  })
})
