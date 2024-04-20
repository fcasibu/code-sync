import * as z from "zod"
import { CompleteProblem, relatedProblemSchema, CompleteSessionSpectator, relatedSessionSpectatorSchema, CompleteUser, relatedUserSchema } from "./index"

export const sessionSchema = z.object({
  id: z.string(),
  problemId: z.string(),
  hostId: z.string(),
  sharedCode: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteSession extends z.infer<typeof sessionSchema> {
  problem: CompleteProblem
  spectators: CompleteSessionSpectator[]
  host: CompleteUser
}

/**
 * relatedSessionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSessionSchema: z.ZodSchema<CompleteSession> = z.lazy(() => sessionSchema.extend({
  problem: relatedProblemSchema,
  spectators: relatedSessionSpectatorSchema.array(),
  host: relatedUserSchema,
}))
