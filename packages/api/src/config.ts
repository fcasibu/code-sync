import { strict as assert } from 'node:assert';
import type { PoolConfig } from 'pg';

export const getConfig = (): PoolConfig => {
  assert(
    process.env.POSTGRES_DB_URL,
    'POSTGRES_DB_URL is required to be set in environment variables.',
  );

  return {
    connectionString: process.env.POSTGRES_DB_URL,
  };
};
