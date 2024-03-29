import type { PoolClient } from 'pg';

export class UserAPI<T> {
  constructor(private readonly poolClient: PoolClient) {}

  public async getUsers(): Promise<T[]> {
    const { rows } = await this.poolClient.query(
      'SELECT * FROM users ORDER BY id ASC',
    );

    return rows as T[];
  }

  public async getUserById(id: string): Promise<T | null> {
    const { rows } = await this.poolClient.query(
      'SELECT * FROM users WHERE id = $1',
      [id],
    );

    return rows.length ? (rows[0] as T) : null;
  }
}
