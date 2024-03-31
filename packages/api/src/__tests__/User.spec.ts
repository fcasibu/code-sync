import { faker } from '@faker-js/faker';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { UserAPI } from '../user';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeEach(helper.setup);
afterEach(helper.teardown);

describe('User#API', () => {
  describe('getUsers', () => {
    it('should get all users', async () => {
      const mockPrisma = helper.prisma;
      const userApi = new UserAPI(mockPrisma);

      const name = faker.person.firstName();
      const mockUsers = [
        {
          id: faker.string.uuid(),
          name,
          email: faker.internet.email({ firstName: name }),
        },
      ];

      mockPrisma.user.findMany.mockResolvedValue(mockUsers);
      const result = await userApi.getUsers();

      expect(mockPrisma.user.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('getUserById', () => {
    it('should get a user by their id', async () => {
      const mockPrisma = helper.prisma;
      const userApi = new UserAPI(mockPrisma);

      const id = faker.string.uuid();
      const name = faker.person.firstName();
      const mockUser = {
        id,
        name,
        email: faker.internet.email({ firstName: name }),
      };

      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      const result = await userApi.getUserById(id);

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id },
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
      });
      expect(result).toBeNull();
    });
  });
});
