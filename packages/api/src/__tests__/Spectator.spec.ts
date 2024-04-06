import { faker } from '@faker-js/faker';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { Spectator } from '@code-sync/db';
import { SpectatorAPI } from '../spectator';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeEach(helper.setup);
afterEach(helper.teardown);

describe('Spectator#API', () => {
  describe('joinRoom', () => {
    it('should be able to join a room as a registered user', async () => {
      const mockPrisma = helper.prisma;
      const spectatorApi = new SpectatorAPI(mockPrisma);

      const mockSpectator: Spectator = {
        id: faker.string.uuid(),
        userId: faker.string.uuid(),
        roomId: faker.string.uuid(),
        name: faker.internet.displayName(),
        isGuest: false,
        canEdit: false,
        createdAt: new Date(),
      };

      mockPrisma.spectator.create.mockResolvedValue(mockSpectator);
      const input = {
        userId: mockSpectator.userId,
        roomId: mockSpectator.roomId,
        name: mockSpectator.name,
      };
      const result = await spectatorApi.joinRoom(input);

      expect(mockPrisma.spectator.create).toHaveBeenCalledWith({
        data: {
          ...input,
          isGuest: false,
        },
      });
      expect(result).toEqual(mockSpectator);
    });

    it('should be able to join a room as a guest', async () => {
      const mockPrisma = helper.prisma;
      const spectatorApi = new SpectatorAPI(mockPrisma);

      const mockSpectator: Spectator = {
        id: faker.string.uuid(),
        userId: null,
        roomId: faker.string.uuid(),
        name: faker.internet.displayName(),
        isGuest: true,
        canEdit: false,
        createdAt: new Date(),
      };

      mockPrisma.spectator.create.mockResolvedValue(mockSpectator);
      const input = {
        roomId: mockSpectator.roomId,
        name: mockSpectator.name,
      };
      const result = await spectatorApi.joinRoom(input);

      expect(mockPrisma.spectator.create).toHaveBeenCalledWith({
        data: {
          ...input,
          isGuest: true,
        },
      });
      expect(result).toEqual(mockSpectator);
    });
  });

  describe('switchSpectatorToCollaborator', () => {
    it('should be able to switch a spectator to a collaborator', async () => {
      const mockPrisma = helper.prisma;
      const spectatorApi = new SpectatorAPI(mockPrisma);

      const mockSpectator: Spectator = {
        id: faker.string.uuid(),
        userId: faker.string.uuid(),
        roomId: faker.string.uuid(),
        name: faker.internet.displayName(),
        isGuest: false,
        canEdit: true,
        createdAt: new Date(),
      };

      mockPrisma.spectator.update.mockResolvedValue(mockSpectator);
      const result = await spectatorApi.switchSpectatorToCollaborator(
        mockSpectator.id,
      );

      expect(mockPrisma.spectator.update).toHaveBeenCalledWith({
        where: {
          id: mockSpectator.id,
        },
        data: {
          canEdit: true,
        },
      });
      expect(result).toEqual(mockSpectator);
    });
  });

  describe('switchCollaboratorToSpectator', () => {
    it('should be able to switch a collaborator to a spectator', async () => {
      const mockPrisma = helper.prisma;
      const spectatorApi = new SpectatorAPI(mockPrisma);

      const mockSpectator: Spectator = {
        id: faker.string.uuid(),
        userId: faker.string.uuid(),
        roomId: faker.string.uuid(),
        name: faker.internet.displayName(),
        isGuest: false,
        canEdit: false,
        createdAt: new Date(),
      };

      mockPrisma.spectator.update.mockResolvedValue(mockSpectator);
      const result = await spectatorApi.switchCollaboratorToSpectator(
        mockSpectator.id,
      );

      expect(mockPrisma.spectator.update).toHaveBeenCalledWith({
        where: {
          id: mockSpectator.id,
        },
        data: {
          canEdit: false,
        },
      });
      expect(result).toEqual(mockSpectator);
    });
  });
});
