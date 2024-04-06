import { faker } from '@faker-js/faker';
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
    it('should return a list of users', async () => {
      const query = graphql(`
        query UserQuery {
          users {
            id
            displayName
            email
            authId
            authProvider
            profilePicture
            rooms {
              id
              name
              owner {
                id
                rooms {
                  __typename
                }
                authProvider
                authId
                email
                displayName
                profilePicture
              }
            }
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
    it('should return a user through their ID', async () => {
      const query = graphql(`
        query UserQuery($input: UserByIdInput!) {
          user(input: $input) {
            id
            displayName
            email
            authId
            authProvider
            profilePicture
            rooms {
              id
              name
              owner {
                id
                rooms {
                  __typename
                }
                authProvider
                authId
                email
                displayName
                profilePicture
              }
            }
          }
        }
      `);

      const userId = 'user-0';
      const response = await requestGQL<
        ResultOf<typeof query>,
        VariablesOf<typeof query>
      >(helper.app.expressServer)
        .query(query)
        .variables({ input: { id: userId } })
        .expectNoErrors();

      expect(response.data?.user?.id).toBe(userId);
      expect(response.data).toMatchSnapshot();
    });
  });

  describe('createUser', () => {
    it('should create a user and return it', async () => {
      const mutation = graphql(`
        mutation UserMutation($input: CreateUserInput!) {
          createUser(input: $input) {
            id
            displayName
            email
            authId
            authProvider
            profilePicture
            rooms {
              id
              name
              owner {
                id
                rooms {
                  __typename
                }
                authProvider
                authId
                email
                displayName
                profilePicture
              }
            }
          }
        }
      `);

      const variables: VariablesOf<typeof mutation> = {
        input: {
          email: faker.internet.email(),
          profilePicture: faker.image.avatar(),
          authId: faker.string.nanoid(),
          authProvider: 'github',
          displayName: faker.internet.displayName(),
        },
      };
      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables(variables)
        .expectNoErrors();

      expect(response.data?.createUser?.authProvider).toBe(
        variables.input.authProvider,
      );
      expect(response.data?.createUser?.authId).toBe(variables.input.authId);
      expect(response.data?.createUser?.email).toBe(variables.input.email);
      expect(response.data?.createUser?.displayName).toBe(
        variables.input.displayName,
      );
      expect(response.data?.createUser?.profilePicture).toBe(
        variables.input.profilePicture,
      );
    });
  });
});
