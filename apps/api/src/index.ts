import {
  ApiRootResponseSchema,
  apiEndpoints,
  CreateUserInputSchema,
  CreateUserResponseSchema,
  DeleteUserResponseSchema,
  ErrorResponseSchema,
  HealthResponseSchema,
  UpdateUserInputSchema,
  UpdateUserResponseSchema,
  UserIdParamsSchema,
  UserResponseSchema,
  UsersResponseSchema,
} from '@repo/contracts'
import { count, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { db, dbFileName } from './db/client'
import { users } from './db/schema'
import { env } from './env'
import { apiMeta } from './lib/meta'

const port = env.API_PORT

export const app = new Hono()

app.use('*', cors())

function serializeUser(user: typeof users.$inferSelect) {
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
  }
}

function buildErrorResponse(message: string, issues?: string[]) {
  return ErrorResponseSchema.parse({
    ok: false,
    message,
    issues,
  })
}

app.get('/', async (c) => {
  const [{ value: totalUsers }] = await db.select({ value: count() }).from(users)

  const response = ApiRootResponseSchema.parse({
    ...apiMeta,
    port,
    databaseFile: dbFileName,
    endpoints: apiEndpoints,
    totalUsers,
  })

  return c.json(response)
})

app.get('/health', (c) => {
  const response = HealthResponseSchema.parse({
    ok: true,
    service: apiMeta.name,
    runtime: apiMeta.runtime,
  })

  return c.json(response)
})

app.get('/users', async (c) => {
  const result = await db.select().from(users)

  const response = UsersResponseSchema.parse({
    items: result.map(serializeUser),
  })

  return c.json(response)
})

app.get('/users/:id', async (c) => {
  const params = UserIdParamsSchema.safeParse(c.req.param())
  if (!params.success) {
    return c.json(
      buildErrorResponse(
        'Invalid user id',
        params.error.issues.map((issue) => issue.message),
      ),
      400,
    )
  }

  const [user] = await db.select().from(users).where(eq(users.id, params.data.id)).limit(1)
  if (!user) {
    return c.json(buildErrorResponse('User not found'), 404)
  }

  return c.json(
    UserResponseSchema.parse({
      item: serializeUser(user),
    }),
  )
})

app.post('/users', async (c) => {
  const input = CreateUserInputSchema.safeParse(await c.req.json())
  if (!input.success) {
    return c.json(
      buildErrorResponse(
        'Invalid create user payload',
        input.error.issues.map((issue) => issue.message),
      ),
      400,
    )
  }

  await db.insert(users).values(input.data)

  const [created] = await db.select().from(users).where(eq(users.email, input.data.email)).limit(1)

  const response = CreateUserResponseSchema.parse({
    item: serializeUser(created),
  })

  return c.json(response, 201)
})

app.patch('/users/:id', async (c) => {
  const params = UserIdParamsSchema.safeParse(c.req.param())
  if (!params.success) {
    return c.json(
      buildErrorResponse(
        'Invalid user id',
        params.error.issues.map((issue) => issue.message),
      ),
      400,
    )
  }

  const input = UpdateUserInputSchema.safeParse(await c.req.json())
  if (!input.success) {
    return c.json(
      buildErrorResponse(
        'Invalid update user payload',
        input.error.issues.map((issue) => issue.message),
      ),
      400,
    )
  }

  await db.update(users).set(input.data).where(eq(users.id, params.data.id))

  const [updated] = await db.select().from(users).where(eq(users.id, params.data.id)).limit(1)
  if (!updated) {
    return c.json(buildErrorResponse('User not found'), 404)
  }

  return c.json(
    UpdateUserResponseSchema.parse({
      item: serializeUser(updated),
    }),
  )
})

app.delete('/users/:id', async (c) => {
  const params = UserIdParamsSchema.safeParse(c.req.param())
  if (!params.success) {
    return c.json(
      buildErrorResponse(
        'Invalid user id',
        params.error.issues.map((issue) => issue.message),
      ),
      400,
    )
  }

  const [existing] = await db.select().from(users).where(eq(users.id, params.data.id)).limit(1)
  if (!existing) {
    return c.json(buildErrorResponse('User not found'), 404)
  }

  await db.delete(users).where(eq(users.id, params.data.id))

  return c.json(
    DeleteUserResponseSchema.parse({
      ok: true,
      item: serializeUser(existing),
    }),
  )
})

export default {
  port,
  fetch: app.fetch,
}
