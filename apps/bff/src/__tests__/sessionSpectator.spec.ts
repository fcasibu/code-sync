import requestGQL from 'supertest-graphql';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { ResultOf, VariablesOf } from '@/utils';
import { graphql } from '@/utils';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeAll(helper.setup);
afterAll(helper.teardown);

describe('resolver#SessionSpectator', () => {
  describe('createSpectator', () => {
    it('should create a new spectator for a coding problem session', async () => {
      const mutation = graphql(`
        mutation CreateSpectator($input: CreateSessionSpectatorInput!) {
          createSpectator(input: $input) {
            id
            session {
              id
            }
            user {
              id
            }
            createdAt
            updatedAt
            mode
          }
        }
      `);

      const userId = 'user-0';
      const sessionId = 'session-0';
      const input = {
        userId,
        sessionId,
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input })
        .expectNoErrors();

      expect(response.data?.createSpectator).toBeDefined();
      expect(response.data?.createSpectator?.session.id).toBe(sessionId);
      expect(response.data?.createSpectator?.user.id).toBe(userId);
      expect(response.data?.createSpectator?.mode).toBeDefined();
      expect(response.data?.createSpectator?.createdAt).toBeDefined();
      expect(response.data?.createSpectator?.updatedAt).toBeDefined();
    });

    it('should return an error for invalid input', async () => {
      const mutation = graphql(`
        mutation CreateSpectator($input: CreateSessionSpectatorInput!) {
          createSpectator(input: $input) {
            id
          }
        }
      `);

      const input = {
        userId: 'invalid-user',
        sessionId: 'invalid-session',
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input });

      expect(response.errors).toBeDefined();
      expect(response.data?.createSpectator).toBeNull();
    });
  });

  describe('updateSpectator', () => {
    it('should update an existing spectator for a coding problem session', async () => {
      const mutation = graphql(`
        mutation UpdateSpectator($input: UpdateSessionSpectatorInput!) {
          updateSpectator(input: $input) {
            id
            mode
            updatedAt
          }
        }
      `);

      const spectatorId = 'spectator-0';
      const mode = 'COLLABORATOR';
      const input = {
        spectatorId,
        mode,
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input })
        .expectNoErrors();

      expect(response.data?.updateSpectator).toBeDefined();
      expect(response.data?.updateSpectator?.id).toBe(spectatorId);
      expect(response.data?.updateSpectator?.mode).toBe(mode);
      expect(response.data?.updateSpectator?.updatedAt).toBeDefined();
    });

    it('should return an error for invalid input', async () => {
      const mutation = graphql(`
        mutation UpdateSpectator($input: UpdateSessionSpectatorInput!) {
          updateSpectator(input: $input) {
            id
          }
        }
      `);

      const input = {
        spectatorId: 'invalid-spectator',
        mode: 'SPECTATOR',
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input });

      expect(response.errors).toBeDefined();
      expect(response.data?.updateSpectator).toBeNull();
    });
  });
});
