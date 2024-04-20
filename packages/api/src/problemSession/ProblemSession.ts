import type { PrismaClient } from '@code-sync/db';
import type { SessionCreateInput, z } from '@code-sync/validations';

export class CodingProblemSessionAPI {
  constructor(private readonly prisma: PrismaClient) {}

  public async createSession(data: z.infer<typeof SessionCreateInput>) {
    return this.prisma.session.create({
      data: {
        ...data,
        sharedCode: '',
      },
      include: {
        spectators: true,
        host: true,
      },
    });
  }

  public async updateSession(sessionId: string, code: string) {
    return this.prisma.session.update({
      where: { id: sessionId },
      data: { sharedCode: code },
      include: {
        spectators: true,
        host: true,
      },
    });
  }
}
