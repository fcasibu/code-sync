import { faker } from '@faker-js/faker';
import type { Room } from '@prisma/client';
import { documentIds, roomIds, userIds } from './ids';

export const rooms = roomIds.map((id, index): Room => {
  faker.seed(index);

  return {
    id,
    name: faker.company.catchPhrase(),
    ownerId: userIds[index],
    documentId: documentIds[index],
    isPrivate: Boolean(index & 1),
    createdAt: new Date(),
    sessionLimit: null,
    spectatorLimit: 20,
    description: null,
  };
});
