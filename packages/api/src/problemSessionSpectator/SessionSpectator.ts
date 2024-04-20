import type { Mode, PrismaClient } from '@code-sync/db';
import type { SessionSpectatorCreateInput, z } from '@code-sync/validations';

export class SessionSpectatorAPI {
  constructor(private readonly prisma: PrismaClient) {}

  public async createSpectator(
    data: z.infer<typeof SessionSpectatorCreateInput>,
  ) {
    return this.prisma.sessionSpectator.create({
      data,
      include: {
        session: true,
        user: true,
      },
    });
  }

  public async updateSpectator(spectatorId: string, mode: Mode) {
    return this.prisma.sessionSpectator.update({
      where: { id: spectatorId },
      data: { mode },
      include: {
        session: true,
        user: true,
      },
    });
  }
}
