import * as z from "zod"
import { Difficulty } from "@prisma/client"
import { CompleteUser, relatedUserSchema, CompleteTestCase, relatedTestCaseSchema, CompleteSubmission, relatedSubmissionSchema, CompleteSession, relatedSessionSchema } from "./index"

export const problemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  difficulty: z.nativeEnum(Difficulty),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteProblem extends z.infer<typeof problemSchema> {
  author: CompleteUser
  testCases: CompleteTestCase[]
  submissions: CompleteSubmission[]
  sessions: CompleteSession[]
}

/**
 * relatedProblemSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProblemSchema: z.ZodSchema<CompleteProblem> = z.lazy(() => problemSchema.extend({
  author: relatedUserSchema,
  testCases: relatedTestCaseSchema.array(),
  submissions: relatedSubmissionSchema.array(),
  sessions: relatedSessionSchema.array(),
}))
