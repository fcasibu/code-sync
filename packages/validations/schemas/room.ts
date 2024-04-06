import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteDocument, relatedDocumentSchema, CompleteSpectator, relatedSpectatorSchema } from "./index"

export const roomSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  isPrivate: z.boolean(),
  sessionLimit: z.date().nullish(),
  spectatorLimit: z.number().int(),
  ownerId: z.string(),
  documentId: z.string(),
  createdAt: z.date().nullish(),
})

export interface CompleteRoom extends z.infer<typeof roomSchema> {
  owner: CompleteUser
  document: CompleteDocument
  spectators: CompleteSpectator[]
}

/**
 * relatedRoomSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedRoomSchema: z.ZodSchema<CompleteRoom> = z.lazy(() => roomSchema.extend({
  owner: relatedUserSchema,
  document: relatedDocumentSchema,
  spectators: relatedSpectatorSchema.array(),
}))
