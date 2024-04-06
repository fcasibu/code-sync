import { faker } from '@faker-js/faker';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { Document } from '@code-sync/db';
import { Language } from '@code-sync/db';
import { DocumentAPI } from '../document';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeEach(helper.setup);
afterEach(helper.teardown);

describe('Document#API', () => {
  describe('createDocument', () => {
    it('should be able to create a document', async () => {
      const mockPrisma = helper.prisma;
      const documentApi = new DocumentAPI(mockPrisma);

      const mockDocument: Document = {
        id: faker.string.uuid(),
        language: Language.TYPESCRIPT,
        content: 'console.log(Hello, World!);',
        createdAt: new Date(),
        roomId: 'room-0',
      };

      mockPrisma.document.create.mockResolvedValue(mockDocument);
      const input = {
        language: Language.TYPESCRIPT,
        roomId: 'room-0',
      };
      const result = await documentApi.createDocument(input);

      expect(mockPrisma.document.create).toHaveBeenCalledWith({
        data: {
          ...input,
          content: '',
        },
      });
      expect(result).toEqual(mockDocument);
    });
  });

  describe('saveDocument', () => {
    it('should be able to save a document with new content', async () => {
      const mockPrisma = helper.prisma;
      const documentApi = new DocumentAPI(mockPrisma);

      const mockDocument: Document = {
        id: faker.string.uuid(),
        language: Language.TYPESCRIPT,
        content: 'console.log(Hello, World!);',
        createdAt: new Date(),
        roomId: 'room-0',
      };

      mockPrisma.document.update.mockResolvedValue(mockDocument);
      const result = await documentApi.saveDocument(
        mockDocument.id,
        'New Content',
      );

      expect(mockPrisma.document.update).toHaveBeenCalledWith({
        where: {
          id: mockDocument.id,
        },
        data: {
          content: 'New Content',
        },
      });
      expect(result).toEqual(mockDocument);
    });
  });
});
