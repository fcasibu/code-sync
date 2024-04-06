import * as z from "zod"
import { CompleteRoom, relatedRoomSchema, CompleteSpectator, relatedSpectatorSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  authProvider: z.string(),
  authId: z.string(),
  email: z.string(),
  displayName: z.string().nullish(),
  profilePicture: z.string().nullish(),
  createdAt: z.date().nullish(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  rooms: CompleteRoom[]
  spectators: CompleteSpectator[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  rooms: relatedRoomSchema.array(),
  spectators: relatedSpectatorSchema.array(),
}))
