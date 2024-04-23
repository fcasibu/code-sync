import type { PrismaClient } from '@code-sync/db';
import type {
  ProblemCreateInput,
  ProblemUpdateInput,
  z,
} from '@code-sync/validations';
import type { Pagination } from '../types';

export class CodingProblemAPI {
  constructor(private readonly prisma: PrismaClient) {}

  public async getCodingProblems(pagination?: Pagination) {
    const { page = 1, limit = 20 } = pagination ?? {};
    const skip = (page - 1) * limit;

    return this.prisma.problem.findMany({
      include: {
        author: true,
        testCases: true,
        submissions: true,
        sessions: true,
      },
      skip,
      take: limit,
    });
  }

  public async getCodingProblemById(id: string) {
    return this.prisma.problem.findUnique({
      where: { id },
      include: {
        author: true,
        testCases: true,
        submissions: true,
        sessions: true,
      },
    });
  }

  public async createCodingProblem(data: z.infer<typeof ProblemCreateInput>) {
    return this.prisma.problem.create({
      data,
      include: {
        author: true,
        testCases: true,
        submissions: true,
        sessions: true,
      },
    });
  }

  public async updateCodingProblem(
    problemId: string,
    data: z.infer<typeof ProblemUpdateInput>,
  ) {
    return this.prisma.problem.update({
      where: { id: problemId },
      data,
      include: {
        author: true,
        testCases: true,
        submissions: true,
        sessions: true,
      },
    });
  }
}
