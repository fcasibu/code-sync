import type { DeepMockProxy } from 'vitest-mock-extended';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { PrismaClient } from '@code-sync/db';

export const testHelper = () => {
  let _prismaClient: DeepMockProxy<PrismaClient> | undefined;

  const setup = () => {
    _prismaClient = mockDeep<PrismaClient>();
  };

  const teardown = () => {
    mockReset(_prismaClient);
  };

  return {
    setup,
    teardown,
    get prisma() {
      if (!_prismaClient)
        throw new Error(
          '`setup` in the testHelper was not invoked. Invoke the `setup` of `testHelper` in either `beforeEach` or `beforeAll`',
        );

      return _prismaClient;
    },
  };
};
