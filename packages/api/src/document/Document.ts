import type { PrismaClient } from '@code-sync/db';
import type { DocumentCreateInput, z } from '@code-sync/validations';

export class DocumentAPI {
  constructor(private readonly prisma: PrismaClient) {}

  public async createDocument(data: z.infer<typeof DocumentCreateInput>) {
    return this.prisma.document.create({
      data: {
        ...data,
        content: '',
      },
    });
  }

  public async saveDocument(documentId: string, content: string) {
    return this.prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        content,
      },
    });
  }
}
