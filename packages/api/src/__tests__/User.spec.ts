import { faker } from '@faker-js/faker';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { User } from '@code-sync/db';
import { UserAPI } from '../user';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeEach(helper.setup);
afterEach(helper.teardown);

describe('User#API', () => {
  describe('getUserById', () => {
    it('should get a user by their id', async () => {
      const mockPrisma = helper.prisma;
      const userApi = new UserAPI(mockPrisma);

      const id = faker.string.uuid();
      const name = faker.person.firstName();
      const mockUser: User = {
        id,
        displayName: name,
        email: faker.internet.email({ firstName: name }),
        profilePicture: faker.image.urlPlaceholder({
          width: 150,
          height: 150,
          text: name,
        }),
        authId: faker.string.nanoid(),
        authProvider: 'github',
        createdAt: new Date(),
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      const result = await userApi.getUserById(id);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id },
        include: {
          session: true,
          problems: true,
          submissions: true,
          sessionSpectators: true,
        },
      });
      expect(result).toStrictEqual(mockUser);
    });

    it('should return null if no user was found', async () => {
      const mockPrisma = helper.prisma;
      const userApi = new UserAPI(mockPrisma);

      mockPrisma.user.findUnique.mockResolvedValue(null);
      const result = await userApi.getUserById('');

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: '' },
        include: {
          session: true,
          problems: true,
          submissions: true,
          sessionSpectators: true,
        },
      });
      expect(result).toBeNull();
    });
  });

  describe('getUserByProviderAndProviderId', () => {
    it('should get a user by their auth provider and id', async () => {
      const mockPrisma = helper.prisma;
      const userApi = new UserAPI(mockPrisma);

      const authId = faker.string.nanoid();
      const authProvider = 'github';
      const id = faker.string.uuid();
      const name = faker.person.firstName();
      const mockUser: User = {
        id,
        displayName: name,
        email: faker.internet.email({ firstName: name }),
        profilePicture: faker.image.urlPlaceholder({
          width: 150,
          height: 150,
          text: name,
        }),
        authId,
        authProvider,
        createdAt: new Date(),
      };

      mockPrisma.user.findFirst.mockResolvedValue(mockUser);
      const result = await userApi.getUserByProviderAndProviderId(
        authProvider,
        authId,
      );

      expect(mockPrisma.user.findFirst).toHaveBeenCalledWith({
        where: { authProvider, authId },
        include: {
          session: true,
          problems: true,
          submissions: true,
          sessionSpectators: true,
        },
      });
      expect(result).toStrictEqual(mockUser);
    });

    it('should return null if no user was found', async () => {
      const mockPrisma = helper.prisma;
      const userApi = new UserAPI(mockPrisma);

      mockPrisma.user.findUnique.mockResolvedValue(null);
      const result = await userApi.getUserById('');

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: '' },
        include: {
          session: true,
          problems: true,
          submissions: true,
          sessionSpectators: true,
        },
      });
      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should be able to create a user and return the user itself', async () => {
      const mockPrisma = helper.prisma;
      const userApi = new UserAPI(mockPrisma);

      const id = faker.string.uuid();
      const name = faker.person.firstName();
      const mockUser: User = {
        id,
        displayName: name,
        email: faker.internet.email({ firstName: name }),
        profilePicture: faker.image.urlPlaceholder({
          width: 150,
          height: 150,
          text: name,
        }),
        authId: faker.string.nanoid(),
        authProvider: 'github',
        createdAt: new Date(),
      };

      mockPrisma.user.create.mockResolvedValue(mockUser);
      const result = await userApi.createUser(mockUser);

      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: mockUser,
        include: {
          session: true,
          problems: true,
          submissions: true,
          sessionSpectators: true,
        },
      });
      expect(result).toStrictEqual(mockUser);
    });
  });
});
