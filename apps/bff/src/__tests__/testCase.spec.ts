import requestGQL from 'supertest-graphql';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { ResultOf, VariablesOf } from '@/utils';
import { graphql } from '@/utils';
import { testHelper } from './testHelper';

export const helper = testHelper();

beforeAll(helper.setup);
afterAll(helper.teardown);

describe('resolver#TestCase', () => {
  describe('createTestCase', () => {
    it('should create a new test case for a coding problem', async () => {
      const mutation = graphql(`
        mutation CreateTestCase($input: CreateTestCaseInput!) {
          createTestCase(input: $input) {
            id
            problem {
              id
            }
            input
            output
            problem {
              id
            }
          }
        }
      `);

      const problemId = 'problem-0';
      const input = 'Hello, World!';
      const output = 'Hello, World!';
      const variables = {
        input: {
          problemId,
          input,
          output,
        },
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables(variables)
        .expectNoErrors();

      expect(response.data?.createTestCase).toBeDefined();
      expect(response.data?.createTestCase?.problem.id).toBe(problemId);
      expect(response.data?.createTestCase?.input).toBe(input);
      expect(response.data?.createTestCase?.output).toBe(output);
      expect(response.data?.createTestCase?.problem.id).toBeDefined();
    });

    it('should return an error for invalid input', async () => {
      const mutation = graphql(`
        mutation CreateTestCase($input: CreateTestCaseInput!) {
          createTestCase(input: $input) {
            id
          }
        }
      `);

      const input = {
        problemId: 'invalid-problem',
        input: '',
        output: '',
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input });

      expect(response.errors).toBeDefined();
      expect(response.data?.createTestCase).toBeNull();
    });
  });

  describe('updateTestCase', () => {
    it('should update an existing test case for a coding problem', async () => {
      const mutation = graphql(`
        mutation UpdateTestCase($input: UpdateTestCaseInput!) {
          updateTestCase(input: $input) {
            id
            input
            output
            problem {
              id
            }
          }
        }
      `);

      const testCaseId = 'testCase-0';
      const input = 'Updated input';
      const output = 'Updated output';
      const variables = {
        input: {
          testCaseId,
          input,
          output,
        },
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables(variables)
        .expectNoErrors();

      expect(response.data?.updateTestCase).toBeDefined();
      expect(response.data?.updateTestCase?.id).toBe(testCaseId);
      expect(response.data?.updateTestCase?.input).toBe(input);
      expect(response.data?.updateTestCase?.output).toBe(output);
      expect(response.data?.updateTestCase?.problem.id).toBeDefined();
    });

    it('should return an error for invalid input', async () => {
      const mutation = graphql(`
        mutation UpdateTestCase($input: UpdateTestCaseInput!) {
          updateTestCase(input: $input) {
            id
          }
        }
      `);

      const input = {
        testCaseId: 'invalid-testcase',
        input: '',
        output: '',
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input });

      expect(response.errors).toBeDefined();
      expect(response.data?.updateTestCase).toBeNull();
    });
  });
});
