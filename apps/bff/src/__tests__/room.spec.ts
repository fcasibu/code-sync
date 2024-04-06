import type { CreateRoomInput } from 'src/graphql/types';
import requestGQL from 'supertest-graphql';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { ResultOf, VariablesOf } from '../utils/gqlHelper';
import { graphql } from '../utils/gqlHelper';
import { testHelper } from '../utils/testHelpers';

const helper = testHelper();

beforeAll(helper.setup);
afterAll(helper.teardown);

describe('resolver#Room', () => {
  describe('rooms', () => {
    it('should return a list of rooms', async () => {
      const query = graphql(`
        query RoomQuery {
          rooms {
            id
            name
            description
            document {
              id
              content
              language
            }
            owner {
              id
              displayName
              profilePicture
            }
            spectators {
              id
              name
              canEdit
              isGuest
            }
          }
        }
      `);

      const response = await requestGQL<ResultOf<typeof query>>(
        helper.app.expressServer,
      )
        .query(query)
        .expectNoErrors();

      expect(response.data?.rooms).not.toHaveLength(0);
      expect(response.data).toMatchSnapshot();
    });
  });

  describe('room', () => {
    it('should return a room through their ID', async () => {
      const query = graphql(`
        query RoomQuery($input: RoomByIdInput!) {
          room(input: $input) {
            id
            name
            description
            document {
              id
              content
              language
            }
            owner {
              id
              displayName
              profilePicture
            }
            spectators {
              id
              name
              canEdit
              isGuest
            }
          }
        }
      `);

      const roomId = 'room-0';
      const response = await requestGQL<
        ResultOf<typeof query>,
        VariablesOf<typeof query>
      >(helper.app.expressServer)
        .query(query)
        .variables({ input: { id: roomId } })
        .expectNoErrors();

      expect(response.data?.room?.id).toBe(roomId);
      expect(response.data).toMatchSnapshot();
    });
  });

  describe('createRoom', () => {
    it('should create a room and return it', async () => {
      const mutation = graphql(`
        mutation RoomMutation($input: CreateRoomInput!) {
          createRoom(input: $input) {
            id
            name
            description
            document {
              id
              content
              language
            }
            owner {
              id
              displayName
              profilePicture
            }
            spectators {
              id
              name
              canEdit
              isGuest
            }
          }
        }
      `);

      const document = await helper.prismaClient.document.create({
        data: {
          language: 'TYPESCRIPT',
          content: "console.log('Hello, World!');",
        },
      });

      const ownerId = 'user-0';
      const input: CreateRoomInput = {
        ownerId,
        documentId: document.id,
        name: 'test room',
        description: 'This is a test room',
      };
      const response = await requestGQL<
        ResultOf<typeof mutation>,
        VariablesOf<typeof mutation>
      >(helper.app.expressServer)
        .mutate(mutation)
        .variables({
          input,
        })
        .expectNoErrors();

      expect(response.data?.createRoom?.document.language).toMatch(
        document.language,
      );
      expect(response.data?.createRoom?.document.content).toMatch(
        document.content,
      );
      expect(response.data?.createRoom?.document.id).toBe(document.id);
      expect(response.data?.createRoom?.owner.id).toMatch(/0/i);
      expect(response.data?.createRoom?.name).toMatch(/test room/i);
    });
  });
});
