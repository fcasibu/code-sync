import { faker } from '@faker-js/faker';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Difficulty } from '@code-sync/db';
import type { CompleteProblem } from '@code-sync/validations';
import { CodingProblemAPI } from '../problem';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeEach(helper.setup);
afterEach(helper.teardown);

describe('CodinaProblem#API', () => {
  describe('getCodingProblem', () => {
    it('should return all coding problems', async () => {
      const mockPrisma = helper.prisma;
      const problemApi = new CodingProblemAPI(mockPrisma);

      const titles = Array.from({ length: 10 }, () =>
        faker.company.catchPhrase(),
      );
      const mockProblems = titles.map(
        (title, idx): CompleteProblem => ({
          id: `problem-${idx}`,
          title,
          description: faker.lorem.paragraphs(),
          submissions: [],
          sessions: [],
          testCases: [],
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
        }),
      );

      mockPrisma.problem.findMany.mockResolvedValue(mockProblems);
      const problems = await problemApi.getCodingProblems();

      expect(mockPrisma.problem.findMany).toHaveBeenCalledWith({
        include: {
          author: true,
          testCases: true,
          submissions: true,
          sessions: true,
        },
      });
      expect(problems).toMatchObject(mockProblems);
    });
  });

  describe('getCodingProblemByid', () => {
    it('should return a specific problem by their id', async () => {
      const mockPrisma = helper.prisma;
      const problemApi = new CodingProblemAPI(mockPrisma);

      const testId = 'problem-0';
      const mockProblem = {
        id: testId,
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraphs(),
        submissions: [],
        sessions: [],
        testCases: [],
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

      mockPrisma.problem.findUnique.mockResolvedValue(mockProblem);
      const problem = await problemApi.getCodingProblemById(testId);

      expect(mockPrisma.problem.findUnique).toHaveBeenCalledWith({
        where: { id: testId },
        include: {
          author: true,
          testCases: true,
          submissions: true,
          sessions: true,
        },
      });
      expect(problem).toMatchObject(mockProblem);
    });
  });

  describe('createCodingProblem', () => {
    it('should be able to create a coding problem and return it', async () => {
      const mockPrisma = helper.prisma;
      const problemApi = new CodingProblemAPI(mockPrisma);

      const testId = 'problem-0';
      const mockProblem = {
        id: testId,
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraphs(),
        submissions: [],
        sessions: [],
        testCases: [],
        authorId: '',
        author: null,
        difficulty: faker.helpers.arrayElement(Object.values(Difficulty)),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      mockPrisma.problem.create.mockResolvedValue(mockProblem);
      const mockData = {
        title: mockProblem.title,
        description: mockProblem.description,
        difficulty: mockProblem.difficulty,
        authorId: mockProblem.authorId,
      };

      const problem = await problemApi.createCodingProblem(mockData);

      expect(mockPrisma.problem.create).toHaveBeenCalledWith({
        data: mockData,
        include: {
          author: true,
          testCases: true,
          submissions: true,
          sessions: true,
        },
      });

      expect(problem).toMatchObject(mockProblem);
    });
  });

  describe('updateCodingProblem', () => {
    it('should be able to update a coding problem and return it', async () => {
      const mockPrisma = helper.prisma;
      const problemApi = new CodingProblemAPI(mockPrisma);

      const testId = 'problem-0';
      const mockProblem = {
        id: testId,
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraphs(),
        submissions: [],
        sessions: [],
        testCases: [],
        authorId: '',
        author: null,
        difficulty: faker.helpers.arrayElement(Object.values(Difficulty)),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      mockPrisma.problem.update.mockResolvedValue(mockProblem);
      const mockData = {
        title: mockProblem.title,
        description: mockProblem.description,
        difficulty: mockProblem.difficulty,
      };

      const problem = await problemApi.updateCodingProblem(testId, mockData);

      expect(mockPrisma.problem.update).toHaveBeenCalledWith({
        where: { id: testId },
        data: mockData,
        include: {
          author: true,
          testCases: true,
          submissions: true,
          sessions: true,
        },
      });

      expect(problem).toMatchObject(mockProblem);
    });
  });
});
