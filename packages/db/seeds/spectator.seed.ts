import { faker } from '@faker-js/faker';
import type { Spectator } from '@prisma/client';
import { spectatorIds } from './ids';

export const spectators = spectatorIds.map((id, index): Spectator => {
  faker.seed(index);

  return {
    id,
    userId: null,
    roomId: 'room-0',
    canEdit: false,
    name: faker.internet.displayName(),
    isGuest: true,
    createdAt: new Date(),
  };
});
