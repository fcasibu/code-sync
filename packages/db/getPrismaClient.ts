import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

export const getPrismaClient = (
  pool: ConstructorParameters<typeof PrismaPg>[0],
) => {
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  return prisma;
};
