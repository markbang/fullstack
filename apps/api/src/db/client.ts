import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import * as schema from './schema'

const dbFileName = process.env.DB_FILE_NAME ?? './local.db'

export const sqlite = new Database(dbFileName, { create: true })

sqlite.exec(`
  create table if not exists users (
    id integer primary key autoincrement,
    name text not null,
    email text not null unique,
    role text not null default 'member',
    created_at integer not null
  );
`)

export const db = drizzle({ client: sqlite, schema })
export { dbFileName }
