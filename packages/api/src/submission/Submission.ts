import { type PrismaClient } from '@code-sync/db';
import type { SubmissionCreateInput, z } from '@code-sync/validations';
import type { CodingProblemAPI } from '../problem';
import type { TestRunner } from '../testRunners';

export class SubmissionAPI {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly codingProblemApi: CodingProblemAPI,
    private readonly testRunner: TestRunner,
  ) {}

  public async submit(data: z.infer<typeof SubmissionCreateInput>) {
    const codingProblem = await this.codingProblemApi.getCodingProblemById(
      data.problemId,
    );

    if (!codingProblem) {
      // TODO: create custom error
      throw new Error('Coding problem does not exist.');
    }

    return this.prisma.submission.create({
      data: {
        ...data,
        status: await this.testRunner.run(data.code, codingProblem.testCases),
      },
      include: {
        user: true,
        problem: true,
      },
    });
  }
}
