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
      const mockPool = helper.pool;
      const userApi = new UserAPI(mockPool);

      const name = faker.person.firstName();
      const mockUsers = [
        {
          id: faker.string.uuid(),
          name,
          email: faker.internet.email({ firstName: name }),
        },
      ];

      mockPool.query.mockImplementationOnce(() => ({ rows: mockUsers }));

      const result = await userApi.getUsers();

      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM users ORDER BY id ASC',
      );
      expect(result).toStrictEqual(mockUsers);
    });
  });

  describe('getUserById', () => {
    it('should get a user by their id', async () => {
      const mockPool = helper.pool;
      const userApi = new UserAPI(mockPool);

      const name = faker.person.firstName();
      const id = faker.string.uuid();
      const mockUser = {
        id,
        name,
        email: faker.internet.email({ firstName: name }),
      };

      mockPool.query.mockImplementationOnce(() => ({ rows: [mockUser] }));

      const result = await userApi.getUserById(id);

      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE id = $1',
        [id],
      );
      expect(result).toStrictEqual(mockUser);
    });

    it('should return null if no user was found', async () => {
      const mockPool = helper.pool;
      const userApi = new UserAPI(mockPool);

      mockPool.query.mockImplementationOnce(() => ({ rows: [] }));

      const result = await userApi.getUserById('');

      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE id = $1',
        [''],
      );
      expect(result).toBeNull();
    });
  });
});
