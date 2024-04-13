import requestGQL from 'supertest-graphql';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { CreateRoomInput } from '@/graphql/types';
import type { ResultOf, VariablesOf } from '@/utils';
import { graphql } from '@/utils';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeAll(helper.setup);
afterAll(helper.teardown);

// TODO: create helper functions to create initial user for testing
describe('resolver#Room', () => {
  describe('room', () => {
    it('should return a room through their ID', async () => {
      const query = graphql(`
        query RoomQuery($input: RoomByIdInput!) {
          room(input: $input) {
            id
            name
            description
            isPrivate
            spectatorLimit
            sessionLimit
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
            isPrivate
            spectatorLimit
            sessionLimit
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

      const ownerId = 'user-0';
      const input: CreateRoomInput = {
        ownerId,
        name: 'public room',
        description: 'This is a public room',
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

      expect(response.data?.createRoom).toMatchObject({
        owner: { id: ownerId },
        name: input.name,
        isPrivate: false,
      });
    });

    it('should create a private room and return it', async () => {
      const mutation = graphql(`
        mutation RoomMutation($input: CreateRoomInput!) {
          createPrivateRoom(input: $input) {
            id
            name
            description
            isPrivate
            spectatorLimit
            sessionLimit
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

      const ownerId = 'user-0';
      const input: CreateRoomInput = {
        ownerId,
        name: 'private room',
        description: 'This is a private room',
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

      expect(response.data?.createPrivateRoom).toMatchObject({
        owner: { id: ownerId },
        name: input.name,
        isPrivate: true,
      });
    });
  });

  describe('deleteRoom', () => {
    it('should delete a room through their ID and return true', async () => {
      const room = await helper.prismaClient.room.create({
        data: { name: 'room to delete', ownerId: 'user-0' },
      });

      const query = graphql(`
        mutation RoomMutation($roomId: String!) {
          deleteRoom(roomId: $roomId)
        }
      `);

      const response = await requestGQL<
        ResultOf<typeof query>,
        VariablesOf<typeof query>
      >(helper.app.expressServer)
        .query(query)
        .variables({ roomId: room.id })
        .expectNoErrors();

      expect(response.data?.deleteRoom).toBe(true);
    });

    it('should return false for failed deletion of a non-existing room', async () => {
      const query = graphql(`
        mutation RoomMutation($roomId: String!) {
          deleteRoom(roomId: $roomId)
        }
      `);

      const response = await requestGQL<
        ResultOf<typeof query>,
        VariablesOf<typeof query>
      >(helper.app.expressServer)
        .query(query)
        .variables({ roomId: 'some room that does not exist' })
        .expectNoErrors();

      expect(response.data?.deleteRoom).toBe(false);
    });
  });
});
