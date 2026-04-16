import { count } from 'drizzle-orm'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { db, dbFileName } from './db/client'
import { users } from './db/schema'
import { apiMeta } from './lib/meta'

const port = Number(process.env.API_PORT ?? 3002)

export const app = new Hono()

app.use('*', cors())

app.get('/', async (c) => {
  const [{ value: totalUsers }] = await db.select({ value: count() }).from(users)

  return c.json({
    ...apiMeta,
    port,
    databaseFile: dbFileName,
    endpoints: ['GET /health', 'GET /users'],
    totalUsers,
  })
})

app.get('/health', (c) => {
  return c.json({
    ok: true,
    service: apiMeta.name,
    runtime: apiMeta.runtime,
  })
})

app.get('/users', async (c) => {
  const result = await db.select().from(users)

  return c.json({
    items: result,
  })
})

export default {
  port,
  fetch: app.fetch,
}
