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

  describe('userByProviderAndProviderId', () => {
    it('should return a user through their auth provider and id', async () => {
      const authId = faker.string.nanoid();
      const authProvider = 'github';

      const user = await helper.prismaClient.user.create({
        data: {
          authId,
          authProvider,
          email: faker.internet.email(),
        },
      });

      const query = graphql(`
        query UserQuery($provider: String!, $providerId: String!) {
          userByProviderAndProviderId(
            provider: $provider
            providerId: $providerId
          ) {
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

      const response = await requestGQL<
        ResultOf<typeof query>,
        VariablesOf<typeof query>
      >(helper.app.expressServer)
        .query(query)
        .variables({ providerId: authId, provider: authProvider })
        .expectNoErrors();

      expect(response.data?.userByProviderAndProviderId?.authId).toBe(authId);
      expect(response.data?.userByProviderAndProviderId?.authProvider).toBe(
        authProvider,
      );
      expect(response.data?.userByProviderAndProviderId?.email).toBe(
        user.email,
      );
      expect(response.data?.userByProviderAndProviderId?.id).toBe(user.id);
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

      expect(response.data?.createUser).toMatchObject({
        authProvider: variables.input.authProvider,
        authId: variables.input.authId,
        email: variables.input.email,
        displayName: variables.input.displayName,
        profilePicture: variables.input.profilePicture,
      });
    });
  });
});
