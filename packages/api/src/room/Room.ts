import type { PrismaClient } from '@code-sync/db';
import type { RoomCreateInput, z } from '@code-sync/validations';

export class RoomAPI {
  constructor(private readonly prisma: PrismaClient) {}

  public async getRooms() {
    return this.prisma.room.findMany({
      include: {
        owner: true,
        document: true,
        spectators: true,
      },
    });
  }

  public async getRoomById(id: string) {
    return this.prisma.room.findUnique({
      where: {
        id,
      },
      include: { owner: true, document: true, spectators: true },
    });
  }

  public async createRoom(data: z.infer<typeof RoomCreateInput>) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 30);

    return this.prisma.room.create({
      data: {
        ...data,
        sessionLimit: currentDate,
      },
      include: { owner: true, document: true, spectators: true },
    });
  }

  public async createPrivateRoom(data: z.infer<typeof RoomCreateInput>) {
    return this.prisma.room.create({
      data: {
        ...data,
        spectatorLimit: 60,
        isPrivate: true,
      },
      include: { owner: true, document: true, spectators: true },
    });
  }

  public async deleteRoom(roomId: string) {
    return this.prisma.room.delete({
      where: { id: roomId },
    });
  }
}
