import type { PrismaClient } from '@code-sync/db';
import type { UserCreateInput, z } from '@code-sync/validations';

export class UserAPI {
  constructor(private readonly prisma: PrismaClient) {}

  public async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  public async getUserByProviderAndProviderId(
    provider: string,
    providerId: string,
  ) {
    return this.prisma.user.findFirst({
      where: {
        authProvider: provider,
        authId: providerId,
      },
    });
  }

  public async createUser(data: z.infer<typeof UserCreateInput>) {
    return this.prisma.user.create({
      data,
    });
  }
}
