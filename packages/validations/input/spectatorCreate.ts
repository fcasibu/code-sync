import * as z from 'zod';

export const SpectatorCreateInput = z.object({
  userId: z.string().nullish(),
  roomId: z.string(),
  name: z.string(),
});

export const SpectatorUpdateInput = SpectatorCreateInput.extend({
  canEdit: z.boolean(),
});
