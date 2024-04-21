import requestGQL from 'supertest-graphql';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { CodingProblemAPI, TestCaseAPI } from '@code-sync/api';
import { Status } from '@code-sync/db';
import type { ResultOf, VariablesOf } from '@/utils';
import { graphql } from '@/utils';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeAll(helper.setup);
afterAll(helper.teardown);

describe('resolver#Submission', () => {
  describe('createSubmission', () => {
    it('should return a submission with aN ACCEPTED status if it passes the test case', async () => {
      const problemApi = new CodingProblemAPI(helper.prismaClient);
      const testCaseApi = new TestCaseAPI(helper.prismaClient);
      const problem = await problemApi.createCodingProblem({
        title: 'test title',
        authorId: 'user-0',
        difficulty: 'EASY',
        description: 'test description',
      });
      await testCaseApi.createTestCase({
        input: 'hello world',
        output: 'HELLO WORLD',
        problemId: problem.id,
      });

      const mutation = graphql(`
        mutation CreateSubmission($input: CreateSubmissionInput!) {
          createSubmission(input: $input) {
            id
            problem {
              id
            }
            user {
              id
            }
            code
            language
            status
          }
        }
      `);

      const userId = 'user-0';
      const code = 'const solution = (word) => word.toUpperCase();';
      const language = 'JAVASCRIPT';
      const input = {
        userId,
        problemId: problem.id,
        code,
        language,
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input })
        .expectNoErrors();

      expect(response.data?.createSubmission).toBeDefined();
      expect(response.data?.createSubmission?.problem.id).toBe(problem.id);
      expect(response.data?.createSubmission?.user.id).toBe(userId);
      expect(response.data?.createSubmission?.code).toBe(code);
      expect(response.data?.createSubmission?.language).toBe(language);
      expect(response.data?.createSubmission?.status).toBe(Status.ACCEPTED);
    });

    it('should return a submission with a WRONG_ANSWER status if it fails the test case', async () => {
      const problemApi = new CodingProblemAPI(helper.prismaClient);
      const testCaseApi = new TestCaseAPI(helper.prismaClient);
      const problem = await problemApi.createCodingProblem({
        title: 'test title',
        authorId: 'user-0',
        difficulty: 'EASY',
        description: 'test description',
      });
      await testCaseApi.createTestCase({
        input: 'test',
        output: 'test',
        problemId: problem.id,
      });

      const mutation = graphql(`
        mutation CreateSubmission($input: CreateSubmissionInput!) {
          createSubmission(input: $input) {
            id
            problem {
              id
            }
            user {
              id
            }
            code
            language
            status
          }
        }
      `);

      const userId = 'user-0';
      const code = 'const solution = () => null;';
      const language = 'JAVASCRIPT';
      const input = {
        userId,
        problemId: problem.id,
        code,
        language,
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input })
        .expectNoErrors();

      expect(response.data?.createSubmission).toBeDefined();
      expect(response.data?.createSubmission?.problem.id).toBe(problem.id);
      expect(response.data?.createSubmission?.user.id).toBe(userId);
      expect(response.data?.createSubmission?.code).toBe(code);
      expect(response.data?.createSubmission?.language).toBe(language);
      expect(response.data?.createSubmission?.status).toBe(Status.WRONG_ANSWER);
    });

    it('should return an error for invalid input', async () => {
      const mutation = graphql(`
        mutation CreateSubmission($input: CreateSubmissionInput!) {
          createSubmission(input: $input) {
            id
          }
        }
      `);

      const input = {
        userId: 'invalid-user',
        problemId: 'invalid-problem',
        code: '',
        language: 'InvalidLanguage',
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input });

      expect(response.errors).toBeDefined();
      expect(response.data?.createSubmission).toBeNull();
    });
  });
});
