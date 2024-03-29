import type { PoolConfig } from 'pg';
import { Pool } from 'pg';

export const connectPool = async (config: PoolConfig) => {
  const pool = new Pool(config);

  const poolClient = await pool.connect();

  return poolClient;
};
