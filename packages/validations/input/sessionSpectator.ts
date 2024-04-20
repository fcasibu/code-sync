import { sessionSpectatorSchema } from '../schemas';

export const SessionSpectatorCreateInput = sessionSpectatorSchema.pick({
  userId: true,
  sessionId: true,
});
