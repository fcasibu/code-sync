import * as z from "zod"
import { Language, Status } from "@prisma/client"
import { CompleteUser, relatedUserSchema, CompleteProblem, relatedProblemSchema } from "./index"

export const submissionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  problemId: z.string(),
  code: z.string(),
  language: z.nativeEnum(Language),
  status: z.nativeEnum(Status).nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteSubmission extends z.infer<typeof submissionSchema> {
  user: CompleteUser
  problem: CompleteProblem
}

/**
 * relatedSubmissionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSubmissionSchema: z.ZodSchema<CompleteSubmission> = z.lazy(() => submissionSchema.extend({
  user: relatedUserSchema,
  problem: relatedProblemSchema,
}))
