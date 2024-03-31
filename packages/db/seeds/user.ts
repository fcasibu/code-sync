import { faker } from '@faker-js/faker';
import type { User } from '@prisma/client';
import type { PrismaRecord } from './types';
import { RecordType } from './types';

export const users: PrismaRecord<User> = {
  type: RecordType.USER,
  data: Array.from({ length: 20 }, (_, i) => {
    faker.seed(i);

    const name = faker.person.firstName();

    return {
      id: `${i}`,
      name,
      email: faker.internet.email({ firstName: name }),
    };
  }),
};
