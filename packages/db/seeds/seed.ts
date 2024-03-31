import { PrismaClient } from '@prisma/client';
import logger from '@code-sync/logger';
import { users } from './user';

const prisma = new PrismaClient();

async function main() {
  logger.info('Seeding...');
  const records = [users];

  await Promise.all(
    records.map((record) => {
      logger.info(`Seeding data for ${record.type} model`);
      const model = prisma[record.type];

      return model.createMany({
        data: record.data,
        skipDuplicates: true,
      });
    }),
  );
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
