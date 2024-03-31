import type { PrismaClient, User } from '@code-sync/db';

export class UserAPI {
  constructor(private readonly prisma: PrismaClient) {}

  public async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public async getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
