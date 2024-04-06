import type { PrismaClient } from '@code-sync/db';
import type { UserCreateInput, z } from '@code-sync/validations';

export class UserAPI {
  constructor(private readonly prisma: PrismaClient) {}

  public async getUsers() {
    return this.prisma.user.findMany();
  }

  public async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  public async createUser(data: z.infer<typeof UserCreateInput>) {
    return this.prisma.user.create({
      data,
    });
  }
}
