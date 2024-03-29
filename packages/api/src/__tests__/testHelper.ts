import type { PoolClient } from 'pg';
import { Pool } from 'pg';
import type { Mocked } from 'vitest';
import { vi } from 'vitest';

export const testHelper = () => {
  let _pool: Mocked<PoolClient> | undefined;

  const setup = () => {
    vi.mock('pg', () => {
      const mockPool = {
        query: vi.fn(),
        connect: vi.fn(),
      };

      return { Pool: vi.fn(() => mockPool) };
    });

    // same interface
    _pool = new Pool() as unknown as Mocked<PoolClient>;
  };

  const teardown = () => {
    vi.clearAllMocks();
  };

  return {
    setup,
    teardown,
    get pool() {
      if (!_pool)
        throw new Error(
          '`setup` in the testHelper was not invoked. Invoke the `setup` of `testHelper` in either `beforeEach` or `beforeAll`',
        );

      return _pool;
    },
  };
};
