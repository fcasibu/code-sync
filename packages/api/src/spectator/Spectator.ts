import type { PrismaClient } from '@code-sync/db';
import type { SpectatorCreateInput, z } from '@code-sync/validations';

export class SpectatorAPI {
  constructor(private readonly prisma: PrismaClient) {}

  public async joinRoom(data: z.infer<typeof SpectatorCreateInput>) {
    return this.prisma.spectator.create({
      data: {
        ...data,
        isGuest: !data.userId,
      },
    });
  }

  public async switchSpectatorToCollaborator(spectatorId: string) {
    return this.prisma.spectator.update({
      where: {
        id: spectatorId,
      },
      data: {
        canEdit: true,
      },
    });
  }

  public async switchCollaboratorToSpectator(spectatorId: string) {
    return this.prisma.spectator.update({
      where: {
        id: spectatorId,
      },
      data: {
        canEdit: false,
      },
    });
  }
}
