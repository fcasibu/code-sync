import { faker } from '@faker-js/faker';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Difficulty } from '@code-sync/db';
import type { CompleteTestCase } from '@code-sync/validations';
import { TestCaseAPI } from '../testCase';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeEach(helper.setup);
afterEach(helper.teardown);

describe('TestCaseAPI', () => {
  describe('createTestCase', () => {
    it('should create a new test case', async () => {
      const mockPrisma = helper.prisma;
      const testCaseAPI = new TestCaseAPI(mockPrisma);

      const mockProblem = {
        id: 'problem-0',
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

      const mockTestCase: CompleteTestCase = {
        id: 'test-case-0',
        input: '[1,2,3,4,5]',
        output: '[2,4,6,8,10]',
        problemId: 'problem-0',
        problem: mockProblem,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      mockPrisma.testCase.create.mockResolvedValue(mockTestCase);

      const mockData = {
        input: mockTestCase.input,
        output: mockTestCase.output,
        problemId: mockProblem.id,
      };

      const testCase = await testCaseAPI.createTestCase(mockData);

      expect(mockPrisma.testCase.create).toHaveBeenCalledWith({
        data: mockData,
        include: {
          problem: true,
        },
      });

      expect(testCase).toMatchObject(mockTestCase);
    });
  });

  describe('updateTestcase', () => {
    it('should update an existing test case', async () => {
      const mockPrisma = helper.prisma;
      const testCaseAPI = new TestCaseAPI(mockPrisma);

      const mockProblem = {
        id: 'problem-0',
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

      const mockTestCase = {
        id: 'test-case-0',
        input: '[1,2,3,4,5]',
        output: '[2,4,6,8,10]',
        problemId: 'problem-0',
        problem: mockProblem,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      const updatedMockTestCase = {
        ...mockTestCase,
        input: faker.lorem.sentence(),
        expectedOutput: faker.lorem.sentence(),
        updatedAt: faker.date.recent(),
      };

      mockPrisma.testCase.update.mockResolvedValue(updatedMockTestCase);

      const mockData = {
        input: updatedMockTestCase.input,
        output: updatedMockTestCase.output,
      };

      const testCase = await testCaseAPI.updateTestcase(
        mockTestCase.id,
        mockData,
      );

      expect(mockPrisma.testCase.update).toHaveBeenCalledWith({
        where: { id: mockTestCase.id },
        data: mockData,
        include: {
          problem: true,
        },
      });

      expect(testCase).toMatchObject(updatedMockTestCase);
    });
  });
});
