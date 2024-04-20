import { faker } from '@faker-js/faker';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type {
  CompleteSessionSpectator,
  SessionSpectatorCreateInput,
  z,
} from '@code-sync/validations';
import { SessionSpectatorAPI } from '../problemSessionSpectator';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeEach(helper.setup);
afterEach(helper.teardown);

describe('SessionSpectator#API', () => {
  describe('createSpectator', () => {
    it('should be able to create a spectator and return it', async () => {
      const mockPrisma = helper.prisma;
      const spectatorApi = new SessionSpectatorAPI(mockPrisma);

      const mockSpectator: CompleteSessionSpectator = {
        id: 'spectator-0',
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        session: {
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
          id: '',
          createdAt: faker.date.past(),
          updatedAt: faker.date.past(),
          problemId: '',
          hostId: '',
          sharedCode: '',
        },
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
        userId: '',
        sessionId: '',
        mode: 'SPECTATOR',
      };
      mockPrisma.sessionSpectator.create.mockResolvedValue(mockSpectator);

      const mockData: z.infer<typeof SessionSpectatorCreateInput> = {
        userId: '',
        sessionId: '',
      };

      const spectator = await spectatorApi.createSpectator(mockData);

      expect(mockPrisma.sessionSpectator.create).toHaveBeenCalledWith({
        data: mockData,
        include: {
          session: true,
          user: true,
        },
      });

      expect(spectator).toMatchObject(mockSpectator);
    });
  });

  describe('updateSession', () => {
    it('should be able to update a session and return it', async () => {
      const mockPrisma = helper.prisma;
      const spectatorApi = new SessionSpectatorAPI(mockPrisma);

      const testId = 'spectator-0';
      const mockSpectator: CompleteSessionSpectator = {
        id: testId,
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
        session: {
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
          id: '',
          createdAt: faker.date.past(),
          updatedAt: faker.date.past(),
          problemId: '',
          hostId: '',
          sharedCode: '',
        },
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
        userId: '',
        sessionId: '',
        mode: 'COLLABORATOR',
      };
      mockPrisma.sessionSpectator.update.mockResolvedValue(mockSpectator);

      const spectator = await spectatorApi.updateSpectator(
        testId,
        'COLLABORATOR',
      );

      expect(mockPrisma.sessionSpectator.update).toHaveBeenCalledWith({
        where: { id: testId },
        data: {
          mode: 'COLLABORATOR',
        },
        include: {
          session: true,
          user: true,
        },
      });

      expect(spectator).toMatchObject(mockSpectator);
    });
  });
});
