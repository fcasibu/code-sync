import requestGQL from 'supertest-graphql';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { CodingProblemsInput } from '@/graphql/types';
import type { ResultOf, VariablesOf } from '@/utils';
import { graphql } from '@/utils';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeAll(helper.setup);
afterAll(helper.teardown);

describe('resolver#CodingProblem', () => {
  describe('codingProblems', () => {
    it('should return a list of coding problems', async () => {
      const query = graphql(`
        query CodingProblemQuery {
          codingProblems {
            id
            title
            description
            difficulty
            author {
              id
              email
              authId
              displayName
              authProvider
              profilePicture
            }
            testCases {
              id
              input
              output
              problemId
            }
            submissions {
              id
              problemId
              code
              userId
              status
              language
            }
            sessions {
              id
              problemId
              hostId
              sharedCode
            }
          }
        }
      `);

      const response = await requestGQL<ResultOf<typeof query>>(
        helper.app.expressServer,
      )
        .query(query)
        .expectNoErrors();

      expect(response.data?.codingProblems).toBeDefined();
      expect(response.data?.codingProblems?.length).toBeGreaterThan(0);
    });

    it('should return a paginated list of coding problems based on input', async () => {
      const query = graphql(`
        query CodingProblemQuery($input: CodingProblemsInput) {
          codingProblems(input: $input) {
            id
            title
            description
            difficulty
            author {
              id
              email
              authId
              displayName
              authProvider
              profilePicture
            }
            testCases {
              id
              input
              output
              problemId
            }
            submissions {
              id
              problemId
              code
              userId
              status
              language
            }
            sessions {
              id
              problemId
              hostId
              sharedCode
            }
          }
        }
      `);

      const input: CodingProblemsInput = {
        pagination: {
          page: 1,
          limit: 10,
        },
      };

      const response = await requestGQL<ResultOf<typeof query>>(
        helper.app.expressServer,
      )
        .query(query)
        .variables({ input })
        .expectNoErrors();

      expect(response.data?.codingProblems).toBeDefined();
      expect(response.data?.codingProblems?.length).toBe(
        input.pagination.limit,
      );
    });

    it('should return a paginated list of coding problems based on different input', async () => {
      const query = graphql(`
        query CodingProblemQuery($input: CodingProblemsInput) {
          codingProblems(input: $input) {
            id
            title
            description
            difficulty
            author {
              id
              email
              authId
              displayName
              authProvider
              profilePicture
            }
            testCases {
              id
              input
              output
              problemId
            }
            submissions {
              id
              problemId
              code
              userId
              status
              language
            }
            sessions {
              id
              problemId
              hostId
              sharedCode
            }
          }
        }
      `);

      const input: CodingProblemsInput = {
        pagination: {
          page: 1,
          limit: 5,
        },
      };

      const response = await requestGQL<ResultOf<typeof query>>(
        helper.app.expressServer,
      )
        .query(query)
        .variables({ input })
        .expectNoErrors();

      expect(response.data?.codingProblems).toBeDefined();
      expect(response.data?.codingProblems?.length).toBe(
        input.pagination.limit,
      );
    });

    it('should not return anything if pagination input limit is 0', async () => {
      const query = graphql(`
        query CodingProblemQuery($input: CodingProblemsInput) {
          codingProblems(input: $input) {
            id
            title
            description
            difficulty
            author {
              id
              email
              authId
              displayName
              authProvider
              profilePicture
            }
            testCases {
              id
              input
              output
              problemId
            }
            submissions {
              id
              problemId
              code
              userId
              status
              language
            }
            sessions {
              id
              problemId
              hostId
              sharedCode
            }
          }
        }
      `);

      const input: CodingProblemsInput = {
        pagination: {
          page: 1,
          limit: 0,
        },
      };

      const response = await requestGQL<ResultOf<typeof query>>(
        helper.app.expressServer,
      )
        .query(query)
        .variables({ input })
        .expectNoErrors();

      expect(response.data?.codingProblems).toBeDefined();
      expect(response.data?.codingProblems?.length).toBe(
        input.pagination.limit,
      );
    });

    it('should return an empty array if selected page does not have enough data', async () => {
      const query = graphql(`
        query CodingProblemQuery($input: CodingProblemsInput) {
          codingProblems(input: $input) {
            id
            title
            description
            difficulty
            author {
              id
              email
              authId
              displayName
              authProvider
              profilePicture
            }
            testCases {
              id
              input
              output
              problemId
            }
            submissions {
              id
              problemId
              code
              userId
              status
              language
            }
            sessions {
              id
              problemId
              hostId
              sharedCode
            }
          }
        }
      `);

      const input: CodingProblemsInput = {
        pagination: {
          page: 12345678,
          limit: 1,
        },
      };

      const response = await requestGQL<ResultOf<typeof query>>(
        helper.app.expressServer,
      )
        .query(query)
        .variables({ input })
        .expectNoErrors();

      expect(response.data?.codingProblems).toBeDefined();
      expect(response.data?.codingProblems?.length).toBe(0);
    });
  });

  describe('codingProblem', () => {
    it('should return a coding problem by id', async () => {
      const query = graphql(`
        query CodingProblemQuery($input: CodingProblemByIdInput!) {
          codingProblem(input: $input) {
            id
            title
            description
            difficulty
            author {
              id
            }
            testCases {
              id
            }
            submissions {
              id
            }
            sessions {
              id
            }
          }
        }
      `);

      const problemId = 'problem-0';
      const response = await requestGQL<
        ResultOf<typeof query>,
        VariablesOf<typeof query>
      >(helper.app.expressServer)
        .query(query)
        .variables({ input: { id: problemId } })
        .expectNoErrors();

      expect(response.data?.codingProblem).toBeDefined();
      expect(response.data?.codingProblem?.id).toBe(problemId);
      expect(response.data?.codingProblem?.title).toBeDefined();
      expect(response.data?.codingProblem?.description).toBeDefined();
      expect(response.data?.codingProblem?.difficulty).toBeDefined();
      expect(response.data?.codingProblem?.author.id).toBeDefined();
      expect(response.data?.codingProblem?.testCases).toBeDefined();
      expect(response.data?.codingProblem?.submissions).toBeDefined();
      expect(response.data?.codingProblem?.sessions).toBeDefined();
    });
  });

  describe('createCodingProblem', () => {
    it('should create a new coding problem', async () => {
      const mutation = graphql(`
        mutation CreateCodingProblem($input: CreateCodingProblemInput!) {
          createCodingProblem(input: $input) {
            id
            title
            description
            difficulty
            author {
              id
            }
            testCases {
              id
            }
            submissions {
              id
            }
            sessions {
              id
            }
          }
        }
      `);

      const authorId = 'user-0';
      const input = {
        authorId,
        title: 'New Coding Problem',
        description: 'This is a new coding problem',
        difficulty: 'EASY',
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input })
        .expectNoErrors();

      expect(response.data?.createCodingProblem).toBeDefined();
      expect(response.data?.createCodingProblem?.author.id).toBe(authorId);
      expect(response.data?.createCodingProblem?.title).toBe(input.title);
      expect(response.data?.createCodingProblem?.description).toBe(
        input.description,
      );
      expect(response.data?.createCodingProblem?.difficulty).toBe(
        input.difficulty,
      );
      expect(response.data?.createCodingProblem?.author.id).toBeDefined();
      expect(response.data?.createCodingProblem?.testCases).toBeDefined();
      expect(response.data?.createCodingProblem?.submissions).toBeDefined();
      expect(response.data?.createCodingProblem?.sessions).toBeDefined();
    });
  });

  describe('updateCodingProblem', () => {
    it('should update an existing coding problem', async () => {
      const mutation = graphql(`
        mutation UpdateCodingProblem($input: UpdateCodingProblemInput!) {
          updateCodingProblem(input: $input) {
            id
            title
            description
            difficulty
            author {
              id
            }
            testCases {
              id
            }
            submissions {
              id
            }
            sessions {
              id
            }
          }
        }
      `);

      const problemId = 'problem-0';
      const updateInput = {
        problemId,
        title: 'Updated Coding Problem',
        description: 'This is an updated coding problem',
        difficulty: 'HARD',
      };

      const updateResponse = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input: updateInput })
        .expectNoErrors();

      expect(updateResponse.data?.updateCodingProblem).toBeDefined();
      expect(updateResponse.data?.updateCodingProblem?.id).toBe(problemId);
      expect(updateResponse.data?.updateCodingProblem?.title).toBe(
        updateInput.title,
      );
      expect(updateResponse.data?.updateCodingProblem?.description).toBe(
        updateInput.description,
      );
      expect(updateResponse.data?.updateCodingProblem?.difficulty).toBe(
        updateInput.difficulty,
      );
      expect(updateResponse.data?.updateCodingProblem?.author.id).toBeDefined();
      expect(updateResponse.data?.updateCodingProblem?.testCases).toBeDefined();
      expect(
        updateResponse.data?.updateCodingProblem?.submissions,
      ).toBeDefined();
      expect(updateResponse.data?.updateCodingProblem?.sessions).toBeDefined();
    });
  });
});
