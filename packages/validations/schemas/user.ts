import * as z from "zod"
import { CompleteProblem, relatedProblemSchema, CompleteSubmission, relatedSubmissionSchema, CompleteSessionSpectator, relatedSessionSpectatorSchema, CompleteSession, relatedSessionSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  authProvider: z.string(),
  authId: z.string(),
  email: z.string(),
  displayName: z.string().nullish(),
  profilePicture: z.string().nullish(),
  createdAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  problems: CompleteProblem[]
  submissions: CompleteSubmission[]
  sessionSpectators: CompleteSessionSpectator[]
  session: CompleteSession[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  problems: relatedProblemSchema.array(),
  submissions: relatedSubmissionSchema.array(),
  sessionSpectators: relatedSessionSpectatorSchema.array(),
  session: relatedSessionSchema.array(),
}))
