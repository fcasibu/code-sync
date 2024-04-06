import { PrismaClient } from '@prisma/client';
import logger from '@code-sync/logger';
import { documents } from './document.seed';
import { rooms } from './room.seed';
import { spectators } from './spectator.seed';
import { users } from './user.seed';

const prisma = new PrismaClient();

async function main() {
  logger.info('Seeding...');

  await prisma.room.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.document.createMany({
    data: documents,
  });

  await prisma.user.createMany({
    data: users,
  });

  await prisma.room.createMany({
    data: rooms,
  });

  await prisma.spectator.createMany({
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
