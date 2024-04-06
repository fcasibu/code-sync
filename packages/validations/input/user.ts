import * as z from 'zod';

export const UserCreateInput = z.object({
  authProvider: z.string(),
  authId: z.string(),
  email: z.string(),
  displayName: z.string().nullish(),
  profilePicture: z.string().nullish(),
});
