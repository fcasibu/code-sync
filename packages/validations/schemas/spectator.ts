import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteRoom, relatedRoomSchema } from "./index"

export const spectatorSchema = z.object({
  id: z.string(),
  userId: z.string().nullish(),
  roomId: z.string(),
  name: z.string(),
  isGuest: z.boolean(),
  canEdit: z.boolean(),
  createdAt: z.date(),
})

export interface CompleteSpectator extends z.infer<typeof spectatorSchema> {
  user?: CompleteUser | null
  room: CompleteRoom
}

/**
 * relatedSpectatorSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSpectatorSchema: z.ZodSchema<CompleteSpectator> = z.lazy(() => spectatorSchema.extend({
  user: relatedUserSchema.nullish(),
  room: relatedRoomSchema,
}))
