import type { CreateDocumentInput, SaveDocumentInput } from 'src/graphql/types';
import requestGQL from 'supertest-graphql';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Language } from '@code-sync/db';
import type { ResultOf, VariablesOf } from '../utils/gqlHelper';
import { graphql } from '../utils/gqlHelper';
import { testHelper } from '../utils/testHelpers';

const helper = testHelper();

beforeAll(helper.setup);
afterAll(helper.teardown);

describe('resolver#Document', () => {
  describe('createDocument', () => {
    it('should be able to create a document', async () => {
      const room = await helper.prismaClient.room.create({
        data: {
          name: 'test room',
          ownerId: 'user-0',
        },
      });
      const mutation = graphql(`
        mutation DocumentMutation($input: CreateDocumentInput!) {
          createDocument(input: $input) {
            id
            content
            language
          }
        }
      `);

      const input: CreateDocumentInput = {
        language: Language.TYPESCRIPT,
        roomId: room.id,
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input })
        .expectNoErrors();

      expect(response.data?.createDocument?.language).toBe(input.language);
      expect(response.data?.createDocument?.content).toBe('');
    });
  });

  describe('saveDocument', () => {
    it('should be able to save a document with new content', async () => {
      const room = await helper.prismaClient.room.create({
        data: {
          name: 'test room',
          ownerId: 'user-0',
        },
      });
      const oldDoc = await helper.prismaClient.document.create({
        data: {
          language: 'TYPESCRIPT',
          content: '',
          roomId: room.id,
        },
      });

      const mutation = graphql(`
        mutation DocumentMutation($input: SaveDocumentInput!) {
          saveDocument(input: $input) {
            id
            content
            language
          }
        }
      `);

      const input: SaveDocumentInput = {
        content: 'console.log("Hello, World!");',
        documentId: oldDoc.id,
      };

      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({ input })
        .expectNoErrors();

      expect(oldDoc.content).toBe('');
      expect(response.data?.saveDocument).toMatchObject({
        id: oldDoc.id,
        language: oldDoc.language,
        content: input.content,
      });
    });
  });
});
