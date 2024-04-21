import type { PrismaClient } from '@code-sync/db';
import type { UserCreateInput, z } from '@code-sync/validations';

export class UserAPI {
  constructor(private readonly prisma: PrismaClient) {}

  public async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        session: true,
        problems: true,
        submissions: true,
        sessionSpectators: true,
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
      include: {
        session: true,
        problems: true,
        submissions: true,
        sessionSpectators: true,
      },
    });
  }

  public async createUser(data: z.infer<typeof UserCreateInput>) {
    return this.prisma.user.create({
      data,
      include: {
        session: true,
        problems: true,
        submissions: true,
        sessionSpectators: true,
      },
    });
  }
}
