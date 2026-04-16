import { describe, expect, it } from 'bun:test'
import {
  CreateUserResponseSchema,
  DeleteUserResponseSchema,
  HealthResponseSchema,
  UpdateUserResponseSchema,
  UserResponseSchema,
} from '@repo/contracts'
import { app } from './index'

describe('api', () => {
  it('responds to the health endpoint', async () => {
    const response = await app.request('/health')
    const payload = HealthResponseSchema.parse(await response.json())

    expect(response.status).toBe(200)
    expect(payload.ok).toBe(true)
    expect(payload.service).toBe('Elegant Stack API')
  })

  it('creates a user with validated input/output contracts', async () => {
    const uniqueEmail = `user-${Date.now()}@example.com`
    const response = await app.request('/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Template User',
        email: uniqueEmail,
      }),
    })
    const payload = CreateUserResponseSchema.parse(await response.json())

    expect(response.status).toBe(201)
    expect(payload.item.email).toBe(uniqueEmail)
    expect(payload.item.role).toBe('member')
  })

  it('supports full user CRUD routes', async () => {
    const uniqueEmail = `crud-${Date.now()}@example.com`

    const createResponse = await app.request('/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Crud User',
        email: uniqueEmail,
      }),
    })
    const created = CreateUserResponseSchema.parse(await createResponse.json())

    const getResponse = await app.request(`/users/${created.item.id}`)
    const fetched = UserResponseSchema.parse(await getResponse.json())

    const updateResponse = await app.request(`/users/${created.item.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        role: 'admin',
      }),
    })
    const updated = UpdateUserResponseSchema.parse(await updateResponse.json())

    const deleteResponse = await app.request(`/users/${created.item.id}`, {
      method: 'DELETE',
    })
    const deleted = DeleteUserResponseSchema.parse(await deleteResponse.json())

    expect(createResponse.status).toBe(201)
    expect(getResponse.status).toBe(200)
    expect(updateResponse.status).toBe(200)
    expect(deleteResponse.status).toBe(200)
    expect(fetched.item.email).toBe(uniqueEmail)
    expect(updated.item.role).toBe('admin')
    expect(deleted.item.id).toBe(created.item.id)
  })
})
