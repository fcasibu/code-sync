import { faker } from '@faker-js/faker';
import type { User } from '@prisma/client';
import { userIds } from './ids';

export const users = userIds.map((id, index): User => {
  faker.seed(index);

  const displayName = faker.person.firstName();

  return {
    id,
    email: faker.internet.email({ firstName: displayName }),
    profilePicture: faker.image.urlPlaceholder({
      width: 150,
      height: 150,
      text: displayName,
    }),
    authId: faker.string.nanoid(),
    authProvider: 'github',
    displayName,
    createdAt: new Date(),
  };
});
