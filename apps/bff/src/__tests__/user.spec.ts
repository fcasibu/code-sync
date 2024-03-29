import requestGQL from 'supertest-graphql';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { ResultOf, VariablesOf } from '../utils/gqlHelper';
import { graphql } from '../utils/gqlHelper';
import { testHelper } from '../utils/testHelpers';

const helper = testHelper();

beforeAll(helper.setup);
afterAll(helper.teardown);

describe('resolver#User', () => {
  describe('users', () => {
    it('should return a list of users with the correct structure', async () => {
      const query = graphql(`
        query UserQuery {
          users {
            id
            name
            email
          }
        }
      `);

      const response = await requestGQL<ResultOf<typeof query>>(
        helper.app.expressServer,
      )
        .query(query)
        .expectNoErrors();

      expect(response.data?.users).not.toHaveLength(0);
      expect(response.data).toMatchSnapshot();
    });
  });

  describe('user', () => {
    it('should return a user with the correct structure through their ID', async () => {
      const query = graphql(`
        query UserQuery($input: UserByIDInput!) {
          user(input: $input) {
            id
            name
            email
          }
        }
      `);

      const response = await requestGQL<
        ResultOf<typeof query>,
        VariablesOf<typeof query>
      >(helper.app.expressServer)
        .query(query)
        .variables({ input: { id: '1' } })
        .expectNoErrors();

      expect(response.data?.user).not.toBeNull();
      expect(response.data?.user?.id).toBe('1');
      expect(response.data).toMatchSnapshot();
    });
  });
});
