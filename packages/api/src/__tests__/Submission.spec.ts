import { faker } from '@faker-js/faker';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Difficulty, Language, Status } from '@code-sync/db';
import type { SubmissionCreateInput, z } from '@code-sync/validations';
import { CodingProblemAPI } from '..';
import { SubmissionAPI } from '../submission';
import { Vm2TestRunner } from '../testRunners';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeEach(helper.setup);
afterEach(helper.teardown);

describe('Submission#API', () => {
  describe('submit', () => {
    it('should throw an error if the coding problem does not exist', async () => {
      const mockPrisma = helper.prisma;
      const submissionApi = new SubmissionAPI(
        mockPrisma,
        new CodingProblemAPI(mockPrisma),
        new Vm2TestRunner(),
      );

      mockPrisma.problem.findUnique.mockResolvedValue(null);

      const mockData: z.infer<typeof SubmissionCreateInput> = {
        problemId: 'non-existent-problem',
        code: '',
        userId: '',
        language: 'JAVASCRIPT',
      };

      await expect(submissionApi.submit(mockData)).rejects.toThrow(
        'Coding problem does not exist.',
      );
    });

    it('should set the submission status to WRONG_ANSWER if it fails', async () => {
      const mockPrisma = helper.prisma;
      const submissionApi = new SubmissionAPI(
        mockPrisma,
        new CodingProblemAPI(mockPrisma),
        new Vm2TestRunner(),
      );

      const mockProblem = {
        id: 'problem-0',
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraphs(),
        submissions: [],
        sessions: [],
        testCases: [
          {
            input: '',
            output: '99',
          },
        ],
        authorId: '',
        author: {
          id: '',
          problems: [],
          submissions: [],
          sessionSpectators: [],
          session: [],
          authProvider: '',
          authId: '',
          email: '',
          createdAt: faker.date.past(),
        },
        difficulty: faker.helpers.arrayElement(Object.values(Difficulty)),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      const mockSubmission = {
        problem: mockProblem,
        user: {
          problems: [],
          submissions: [],
          sessionSpectators: [],
          session: [],
          id: '',
          authProvider: '',
          authId: '',
          email: '',
          createdAt: faker.date.past(),
        },
        id: 'submission-0',
        createdAt: faker.date.past(),
        problemId: 'problem-0',
        updatedAt: faker.date.past(),
        code: `
function solution(input) {
  return 3;
}
`,
        status: Status.WRONG_ANSWER,
        userId: '',
        language: faker.helpers.arrayElement(Object.values(Language)),
      };

      mockPrisma.problem.findUnique.mockResolvedValue(mockProblem);
      mockPrisma.submission.create.mockResolvedValue(mockSubmission);

      const mockData: z.infer<typeof SubmissionCreateInput> = {
        problemId: '',
        code: `
function solution(input) {
  return 3;
}
`,
        userId: '',
        language: 'JAVASCRIPT',
      };

      const submission = await submissionApi.submit(mockData);

      expect(mockPrisma.submission.create).toHaveBeenCalledWith({
        data: {
          ...mockData,
          status: Status.WRONG_ANSWER,
        },
        include: {
          user: true,
          problem: true,
        },
      });

      expect(submission).toMatchObject(mockSubmission);
    });

    it('should set the submission status to ACCEPTED if it passes', async () => {
      const mockPrisma = helper.prisma;
      const submissionApi = new SubmissionAPI(
        mockPrisma,
        new CodingProblemAPI(mockPrisma),
        new Vm2TestRunner(),
      );

      const mockProblem = {
        id: 'problem-0',
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraphs(),
        submissions: [],
        sessions: [],
        testCases: [
          {
            input: 'hello',
            output: 'HELLO',
          },
        ],
        authorId: '',
        author: {
          id: '',
          problems: [],
          submissions: [],
          sessionSpectators: [],
          session: [],
          authProvider: '',
          authId: '',
          email: '',
          createdAt: faker.date.past(),
        },
        difficulty: faker.helpers.arrayElement(Object.values(Difficulty)),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      const mockSubmission = {
        problem: mockProblem,
        user: {
          problems: [],
          submissions: [],
          sessionSpectators: [],
          session: [],
          id: '',
          authProvider: '',
          authId: '',
          email: '',
          createdAt: faker.date.past(),
        },
        id: 'submission-0',
        createdAt: faker.date.past(),
        problemId: 'problem-0',
        updatedAt: faker.date.past(),
        code: `
function solution(input) {
  return input.toUpperCase();
}
`,
        status: Status.ACCEPTED,
        userId: '',
        language: faker.helpers.arrayElement(Object.values(Language)),
      };

      mockPrisma.problem.findUnique.mockResolvedValue(mockProblem);
      mockPrisma.submission.create.mockResolvedValue(mockSubmission);

      const mockData: z.infer<typeof SubmissionCreateInput> = {
        problemId: '',
        code: `
function solution(input) {
  return input.toUpperCase();
}
`,
        userId: '',
        language: 'JAVASCRIPT',
      };

      const submission = await submissionApi.submit(mockData);

      expect(mockPrisma.submission.create).toHaveBeenCalledWith({
        data: {
          ...mockData,
          status: Status.ACCEPTED,
        },
        include: {
          user: true,
          problem: true,
        },
      });

      expect(submission).toMatchObject(mockSubmission);
    });
  });
});
