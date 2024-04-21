import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import type {
  Problem,
  Session,
  SessionSpectator,
  Submission,
  TestCase,
  User,
} from '@prisma/client';
import { Difficulty, Language, Mode, Status } from '@prisma/client';
import { logger } from '@code-sync/logger';

const userIds = Array.from({ length: 20 }, (_, i) => `user-${i}`);
const problemIds = Array.from({ length: 50 }, (_, i) => `problem-${i}`);
const testCaseIds = Array.from({ length: 100 }, (_, i) => `testCase-${i}`);
const submissionIds = Array.from({ length: 200 }, (_, i) => `submission-${i}`);
const sessionIds = Array.from({ length: 30 }, (_, i) => `session-${i}`);
const spectatorIds = Array.from({ length: 100 }, (_, i) => `spectator-${i}`);

const users = userIds.map((id, index): User => {
  faker.seed(index);

  const displayName = faker.person.firstName();

  return {
    id,
    email: faker.internet.email({ firstName: displayName }),
    profilePicture: faker.image.urlPlaceholder({
      width: 150,
      height: 150,
      text: displayName,
    }),
    authId: faker.string.nanoid(),
    authProvider: 'github',
    displayName,
    createdAt: new Date(),
  };
});

const problems = problemIds.map((id, index): Problem => {
  faker.seed(index);

  return {
    id,
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(),
    difficulty: faker.helpers.arrayElement(Object.values(Difficulty)),
    authorId: faker.helpers.arrayElement(userIds),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
});

const testCases = testCaseIds.map(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (id, index): TestCase & { input: any; output: any } => {
    faker.seed(index);

    return {
      id,
      input: '',
      output: '',
      problemId: faker.helpers.arrayElement(problemIds),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };
  },
);

const submissions = submissionIds.map((id, index): Submission => {
  faker.seed(index);

  return {
    id,
    userId: faker.helpers.arrayElement(userIds),
    problemId: faker.helpers.arrayElement(problemIds),
    code: '',
    language: faker.helpers.arrayElement(Object.values(Language)),
    status: faker.helpers.arrayElement(Object.values(Status)),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
});

const sessions = sessionIds.map((id, index): Session => {
  faker.seed(index);

  return {
    id,
    problemId: faker.helpers.arrayElement(problemIds),
    hostId: faker.helpers.arrayElement(userIds),
    sharedCode: '',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
});

const spectators = spectatorIds.map((id, index): SessionSpectator => {
  faker.seed(index);

  return {
    id,
    sessionId: faker.helpers.arrayElement(sessionIds),
    userId: faker.helpers.arrayElement(userIds),
    mode: faker.helpers.arrayElement(Object.values(Mode)),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
});

const prisma = new PrismaClient();

async function main() {
  logger.info('Seeding...');

  await prisma.user.deleteMany({});
  await prisma.problem.deleteMany({});
  await prisma.testCase.deleteMany({});
  await prisma.submission.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.sessionSpectator.deleteMany({});

  await prisma.user.createMany({
    data: users,
  });

  await prisma.problem.createMany({
    data: problems,
  });

  await prisma.testCase.createMany({
    data: testCases,
  });

  await prisma.submission.createMany({
    data: submissions,
  });

  await prisma.session.createMany({
    data: sessions,
  });

  await prisma.sessionSpectator.createMany({
    data: spectators,
  });
}

main()
  .then(async () => {
    logger.info('Finished seeding!');
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    logger.error(error, 'Something went wrong with the seeding process');
    await prisma.$disconnect();
    process.exit(1);
  });
