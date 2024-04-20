import * as z from "zod"
import { Mode } from "@prisma/client"
import { CompleteSession, relatedSessionSchema, CompleteUser, relatedUserSchema } from "./index"

export const sessionSpectatorSchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  userId: z.string(),
  mode: z.nativeEnum(Mode),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteSessionSpectator extends z.infer<typeof sessionSpectatorSchema> {
  session: CompleteSession
  user: CompleteUser
}

/**
 * relatedSessionSpectatorSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSessionSpectatorSchema: z.ZodSchema<CompleteSessionSpectator> = z.lazy(() => sessionSpectatorSchema.extend({
  session: relatedSessionSchema,
  user: relatedUserSchema,
}))
