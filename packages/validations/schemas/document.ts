import * as z from "zod"
import { Language } from "@prisma/client"
import { CompleteRoom, relatedRoomSchema } from "./index"

export const documentSchema = z.object({
  id: z.string(),
  content: z.string(),
  language: z.nativeEnum(Language),
  createdAt: z.date().nullish(),
  roomId: z.string(),
})

export interface CompleteDocument extends z.infer<typeof documentSchema> {
  room: CompleteRoom
}

/**
 * relatedDocumentSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedDocumentSchema: z.ZodSchema<CompleteDocument> = z.lazy(() => documentSchema.extend({
  room: relatedRoomSchema,
}))
