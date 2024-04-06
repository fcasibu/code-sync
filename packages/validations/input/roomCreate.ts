import * as z from 'zod';

export const RoomCreateInput = z.object({
  name: z.string(),
  description: z.string().nullish(),
  ownerId: z.string(),
  documentId: z.string(),
});
