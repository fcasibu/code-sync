import { faker } from '@faker-js/faker';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Room } from '@code-sync/db';
import { RoomAPI } from '../room';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeEach(helper.setup);
afterEach(helper.teardown);

describe('Room#API', () => {
  describe('getRooms', () => {
    it('should get all rooms', async () => {
      const mockPrisma = helper.prisma;
      const roomApi = new RoomAPI(mockPrisma);

      const names = Array.from({ length: 10 }, () =>
        faker.company.catchPhrase(),
      );
      const mockRooms = names.map(
        (name): Room => ({
          id: faker.string.uuid(),
          name,
          ownerId: faker.string.uuid(),
          createdAt: new Date(),
          isPrivate: false,
          description: '',
          sessionLimit: null,
          spectatorLimit: 20,
        }),
      );

      mockPrisma.room.findMany.mockResolvedValue(mockRooms);
      const result = await roomApi.getRooms();

      expect(mockPrisma.room.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockRooms);
    });
  });

  describe('getRoomById', () => {
    it('should get a room by their id', async () => {
      const mockPrisma = helper.prisma;
      const roomApi = new RoomAPI(mockPrisma);

      const id = faker.string.uuid();
      const name = faker.person.firstName();
      const mockRoom: Room = {
        id: faker.string.uuid(),
        name,
        ownerId: faker.string.uuid(),
        createdAt: new Date(),
        isPrivate: false,
        description: '',
        sessionLimit: null,
        spectatorLimit: 20,
      };

      mockPrisma.room.findUnique.mockResolvedValue(mockRoom);
      const result = await roomApi.getRoomById(id);

      expect(mockPrisma.room.findUnique).toHaveBeenCalledWith({
        where: { id },
        include: { owner: true, document: true, spectators: true },
      });
      expect(result).toStrictEqual(mockRoom);
    });

    it('should return null if no user was found', async () => {
      const mockPrisma = helper.prisma;
      const roomApi = new RoomAPI(mockPrisma);

      mockPrisma.room.findUnique.mockResolvedValue(null);
      const result = await roomApi.getRoomById('');

      expect(mockPrisma.room.findUnique).toHaveBeenCalledWith({
        where: { id: '' },
        include: { owner: true, document: true, spectators: true },
      });
      expect(result).toBeNull();
    });
  });

  describe('createRoom', () => {
    it('should be able to create a room and return the room itself', async () => {
      const mockPrisma = helper.prisma;
      const roomApi = new RoomAPI(mockPrisma);

      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 30);

      const mockRoom: Room = {
        id: faker.string.uuid(),
        name: faker.company.catchPhrase(),
        ownerId: faker.string.uuid(),
        createdAt: new Date(),
        isPrivate: false,
        description: '',
        sessionLimit: currentDate,
        spectatorLimit: 20,
      };

      mockPrisma.room.create.mockResolvedValue(mockRoom);
      const result = await roomApi.createRoom(mockRoom);

      expect(mockPrisma.room.create).toHaveBeenCalledWith({
        data: {
          ...mockRoom,
          sessionLimit: currentDate,
        },
        include: { owner: true, document: true, spectators: true },
      });
      expect(result).toStrictEqual(mockRoom);
    });

    it('should be able to create a private room and return the room itself', async () => {
      const mockPrisma = helper.prisma;
      const roomApi = new RoomAPI(mockPrisma);

      const mockRoom: Room = {
        id: faker.string.uuid(),
        name: faker.company.catchPhrase(),
        ownerId: faker.string.uuid(),
        createdAt: new Date(),
        isPrivate: false,
        description: '',
        sessionLimit: null,
        spectatorLimit: 20,
      };

      mockPrisma.room.create.mockResolvedValue(mockRoom);
      const result = await roomApi.createPrivateRoom(mockRoom);

      expect(mockPrisma.room.create).toHaveBeenCalledWith({
        data: {
          ...mockRoom,
          isPrivate: true,
          spectatorLimit: 60,
        },
        include: { owner: true, document: true, spectators: true },
      });
      expect(result).toStrictEqual(mockRoom);
    });
  });

  describe('deleteRoom', () => {
    it('should delete a room by their id', async () => {
      const mockPrisma = helper.prisma;
      const roomApi = new RoomAPI(mockPrisma);

      const mockRoom: Room = {
        id: faker.string.uuid(),
        name: faker.company.catchPhrase(),
        ownerId: faker.string.uuid(),
        createdAt: new Date(),
        isPrivate: false,
        description: '',
        sessionLimit: null,
        spectatorLimit: 20,
      };

      mockPrisma.room.delete.mockResolvedValue(mockRoom);
      const result = await roomApi.deleteRoom(mockRoom.id);

      expect(mockPrisma.room.delete).toHaveBeenCalledWith({
        where: { id: mockRoom.id },
      });
      expect(result).toEqual(mockRoom);
    });
  });
});
