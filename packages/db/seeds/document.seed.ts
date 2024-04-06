import { faker } from '@faker-js/faker';
import type { Document } from '@prisma/client';
import { Language } from '@prisma/client';
import { documentIds, roomIds } from './ids';

export const documents = documentIds.map((id, index): Document => {
  faker.seed(index);

  return {
    id,
    content: '',
    language: Language.TYPESCRIPT,
    createdAt: new Date(),
    roomId: roomIds[index],
  };
});
