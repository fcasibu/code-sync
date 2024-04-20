import { userSchema } from '../schemas';

export const UserCreateInput = userSchema.pick({
  authProvider: true,
  authId: true,
  email: true,
  displayName: true,
  profilePicture: true,
});
