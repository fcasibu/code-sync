import { type PrismaClient } from '@code-sync/db';
import type {
  TestCaseCreateInput,
  TestCaseUpdateInput,
  z,
} from '@code-sync/validations';

export class TestCaseAPI {
  constructor(private readonly prisma: PrismaClient) {}

  public async createTestCase(data: z.infer<typeof TestCaseCreateInput>) {
    return this.prisma.testCase.create({
      data,
      include: {
        problem: true,
      },
    });
  }

  public async updateTestcase(
    testCaseId: string,
    data: z.infer<typeof TestCaseUpdateInput>,
  ) {
    return this.prisma.testCase.update({
      where: { id: testCaseId },
      data,
      include: {
        problem: true,
      },
    });
  }
}
