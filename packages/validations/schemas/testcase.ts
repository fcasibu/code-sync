import * as z from "zod"
import { CompleteProblem, relatedProblemSchema } from "./index"

export const testCaseSchema = z.object({
  id: z.string(),
  input: z.string(),
  output: z.string(),
  problemId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteTestCase extends z.infer<typeof testCaseSchema> {
  problem: CompleteProblem
}

/**
 * relatedTestCaseSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedTestCaseSchema: z.ZodSchema<CompleteTestCase> = z.lazy(() => testCaseSchema.extend({
  problem: relatedProblemSchema,
}))
