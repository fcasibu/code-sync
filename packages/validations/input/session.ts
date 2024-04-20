import { sessionSchema } from '../schemas';

export const SessionCreateInput = sessionSchema.pick({
  problemId: true,
  hostId: true,
});

export const SessionUpdateInput = sessionSchema.pick({
  sharedCode: true,
});
