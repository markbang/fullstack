import { z } from 'zod'

export const ApiUserRoleSchema = z.enum(['admin', 'member'])
export type ApiUserRole = z.infer<typeof ApiUserRoleSchema>

export const ApiUserSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string().min(1),
  email: z.string().email(),
  role: ApiUserRoleSchema,
  createdAt: z.string().datetime(),
})
export type ApiUser = z.infer<typeof ApiUserSchema>

export const CreateUserInputSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: ApiUserRoleSchema.default('member'),
})
export type CreateUserInput = z.infer<typeof CreateUserInputSchema>

export const UpdateUserInputSchema = CreateUserInputSchema.partial().refine(
  (input) => Object.keys(input).length > 0,
  {
    message: 'At least one field must be provided',
  },
)
export type UpdateUserInput = z.infer<typeof UpdateUserInputSchema>

export const UserIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
})
export type UserIdParams = z.infer<typeof UserIdParamsSchema>

export const ApiMetaSchema = z.object({
  name: z.string().min(1),
  runtime: z.string().min(1),
  framework: z.string().min(1),
  database: z.string().min(1),
})
export type ApiMeta = z.infer<typeof ApiMetaSchema>

export const ApiEndpointSchema = z.enum([
  'GET /health',
  'GET /users',
  'GET /users/:id',
  'POST /users',
  'PATCH /users/:id',
  'DELETE /users/:id',
])
export type ApiEndpoint = z.infer<typeof ApiEndpointSchema>

export const apiEndpoints = [
  'GET /health',
  'GET /users',
  'GET /users/:id',
  'POST /users',
  'PATCH /users/:id',
  'DELETE /users/:id',
] as const satisfies readonly ApiEndpoint[]

export const ApiRootResponseSchema = ApiMetaSchema.extend({
  port: z.number().int().positive(),
  databaseFile: z.string().min(1),
  endpoints: z.array(ApiEndpointSchema).readonly(),
  totalUsers: z.number().int().nonnegative(),
})
export type ApiRootResponse = z.infer<typeof ApiRootResponseSchema>

export const HealthResponseSchema = z.object({
  ok: z.literal(true),
  service: z.string().min(1),
  runtime: z.string().min(1),
})
export type HealthResponse = z.infer<typeof HealthResponseSchema>

export const UsersResponseSchema = z.object({
  items: z.array(ApiUserSchema),
})
export type UsersResponse = z.infer<typeof UsersResponseSchema>

export const UserResponseSchema = z.object({
  item: ApiUserSchema,
})
export type UserResponse = z.infer<typeof UserResponseSchema>

export const CreateUserResponseSchema = z.object({
  item: ApiUserSchema,
})
export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>

export const UpdateUserResponseSchema = UserResponseSchema
export type UpdateUserResponse = z.infer<typeof UpdateUserResponseSchema>

export const DeleteUserResponseSchema = z.object({
  ok: z.literal(true),
  item: ApiUserSchema,
})
export type DeleteUserResponse = z.infer<typeof DeleteUserResponseSchema>

export const ErrorResponseSchema = z.object({
  ok: z.literal(false),
  message: z.string().min(1),
  issues: z.array(z.string()).optional(),
})
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>
