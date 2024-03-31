import type { PoolConfig } from 'pg';
import { Pool } from 'pg';

export const createPool = (config: PoolConfig) => {
  const pool = new Pool(config);

  return pool;
};
