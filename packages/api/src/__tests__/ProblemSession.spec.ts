import { faker } from '@faker-js/faker';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type {
  CompleteSession,
  SessionCreateInput,
  z,
} from '@code-sync/validations';
import { CodingProblemSessionAPI } from '../problemSession';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeEach(helper.setup);
afterEach(helper.teardown);

describe('CodingProblemSession#API', () => {
  describe('createSession', () => {
    it('should be able to create a session and return it', async () => {
      const mockPrisma = helper.prisma;
      const codingProblemSessionApi = new CodingProblemSessionAPI(mockPrisma);

      const mockSession: CompleteSession = {
        problem: {
          author: {
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
          testCases: [],
          submissions: [],
          sessions: [],
          id: '',
          createdAt: faker.date.past(),
          title: '',
          description: '',
          difficulty: 'EASY',
          authorId: '',
          updatedAt: faker.date.past(),
        },
        spectators: [],
        host: {
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
        id: 'session-0',
        createdAt: faker.date.past(),
        problemId: '',
        hostId: '',
        sharedCode: '',
        updatedAt: faker.date.past(),
      };
      mockPrisma.session.create.mockResolvedValue(mockSession);

      const mockData: z.infer<typeof SessionCreateInput> = {
        problemId: '',
        hostId: '',
      };

      const problemSession =
        await codingProblemSessionApi.createSession(mockData);

      expect(mockPrisma.session.create).toHaveBeenCalledWith({
        data: {
          ...mockData,
          sharedCode: '',
        },
        include: {
          problem: true,
          spectators: true,
          host: true,
        },
      });

      expect(problemSession).toMatchObject(mockSession);
    });
  });

  describe('updateSession', () => {
    it('should be able to update a session and return it', async () => {
      const mockPrisma = helper.prisma;
      const codingProblemSessionApi = new CodingProblemSessionAPI(mockPrisma);

      const testId = 'session-0';
      const mockSession: CompleteSession = {
        problem: {
          author: {
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
          testCases: [],
          submissions: [],
          sessions: [],
          id: '',
          createdAt: faker.date.past(),
          title: '',
          description: '',
          difficulty: 'EASY',
          authorId: '',
          updatedAt: faker.date.past(),
        },
        spectators: [],
        host: {
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
        id: testId,
        createdAt: faker.date.past(),
        problemId: '',
        hostId: '',
        sharedCode: 'console.log("Hello, World!")',
        updatedAt: faker.date.past(),
      };
      mockPrisma.session.update.mockResolvedValue(mockSession);

      const problemSession = await codingProblemSessionApi.updateSession(
        testId,
        'console.log("Hello, World!")',
      );

      expect(mockPrisma.session.update).toHaveBeenCalledWith({
        where: { id: testId },
        data: {
          sharedCode: 'console.log("Hello, World!")',
        },
        include: {
          problem: true,
          spectators: true,
          host: true,
        },
      });

      expect(problemSession).toMatchObject(mockSession);
    });
  });
});
