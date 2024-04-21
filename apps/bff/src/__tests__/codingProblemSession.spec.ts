import requestGQL from 'supertest-graphql';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { ResultOf, VariablesOf } from '@/utils';
import { graphql } from '@/utils';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeAll(helper.setup);
afterAll(helper.teardown);

describe('resolver#CodingProblemSession', () => {
  describe('createSession', () => {
    it('should create a new coding problem session', async () => {
      const mutation = graphql(`
        mutation CreateSession($input: CreateCodingProblemSessionInput!) {
          createSession(input: $input) {
            id
            problem {
              id
              title
            }
            spectators {
              id
            }
            host {
              id
            }
            sharedCode
          }
        }
      `);

      const problemId = 'problem-0';
      const hostId = 'user-0';
      const input = {
        problemId,
        hostId,
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input })
        .expectNoErrors();

      expect(response.data?.createSession).toBeDefined();
      expect(response.data?.createSession?.problem.id).toBe(problemId);
      expect(response.data?.createSession?.host.id).toBe(hostId);
      expect(response.data?.createSession?.spectators).toBeDefined();
      expect(response.data?.createSession?.sharedCode).toBe('');
    });

    it('should return an error for invalid input', async () => {
      const mutation = graphql(`
        mutation CreateSession($input: CreateCodingProblemSessionInput!) {
          createSession(input: $input) {
            id
          }
        }
      `);

      const input = {
        problemId: 'invalid-id',
        hostId: 'invalid-id',
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input });

      expect(response.errors).toBeDefined();
      expect(response.data?.createSession).toBeNull();
    });
  });

  describe('updateSession', () => {
    it('should update an existing coding problem session', async () => {
      const mutation = graphql(`
        mutation UpdateSession($input: UpdateCodingProblemSessionInput!) {
          updateSession(input: $input) {
            id
            sharedCode
          }
        }
      `);

      const sessionId = 'session-0';
      const sharedCode = 'console.log("Hello, World!");';
      const input = {
        sessionId,
        sharedCode,
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input })
        .expectNoErrors();

      expect(response.data?.updateSession).toBeDefined();
      expect(response.data?.updateSession?.id).toBe(sessionId);
      expect(response.data?.updateSession?.sharedCode).toBe(sharedCode);
    });

    it('should return an error for invalid input', async () => {
      const mutation = graphql(`
        mutation UpdateSession($input: UpdateCodingProblemSessionInput!) {
          updateSession(input: $input) {
            id
          }
        }
      `);

      const input = {
        sessionId: 'invalid-id',
        sharedCode: '',
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input });

      expect(response.errors).toBeDefined();
      expect(response.data?.updateSession).toBeNull();
    });
  });
});
