import { z } from 'zod'

const EnvSchema = z.object({
  API_PORT: z.coerce.number().int().positive().default(3002),
  DB_FILE_NAME: z.string().min(1).default('./local.db'),
})

export const env = EnvSchema.parse(process.env)
