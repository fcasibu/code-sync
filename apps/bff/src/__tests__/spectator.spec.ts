import { faker } from '@faker-js/faker';
import requestGQL from 'supertest-graphql';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { JoinRoomInput, SpectatorIdInput } from '@/graphql/types';
import type { ResultOf, VariablesOf } from '@/utils';
import { graphql } from '@/utils';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeAll(helper.setup);
afterAll(helper.teardown);

describe('resolver#Spectator', () => {
  // TODO: create helper
  let testRoomId: string;
  let testSpectatorId: string;

  beforeAll(async () => {
    const testRoom = await helper.prismaClient.room.create({
      data: { ownerId: 'user-0', name: 'test room' },
    });
    testRoomId = testRoom.id;

    const testSpectator = await helper.prismaClient.spectator.create({
      data: { name: faker.internet.displayName(), roomId: testRoomId },
    });
    testSpectatorId = testSpectator.id;
  });

  describe('Mutation', () => {
    describe('joinRoom', () => {
      it('should allow a user to join a room as a spectator', async () => {
        const mutation = graphql(`
          mutation JoinRoom($input: JoinRoomInput!) {
            joinRoom(input: $input) {
              id
              name
              isGuest
              canEdit
            }
          }
        `);

        const input: JoinRoomInput = {
          roomId: testRoomId,
          name: 'Test Spectator',
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

        expect(response.data?.joinRoom).toMatchObject({
          name: 'Test Spectator',
          isGuest: true,
          canEdit: false,
        });
        expect(response.data?.joinRoom?.id).toBeDefined();
      });
    });

    describe('switchSpectatorToCollaborator', () => {
      it('should switch a spectator to a collaborator', async () => {
        const mutation = graphql(`
          mutation SwitchSpectatorToCollaborator($input: SpectatorIdInput!) {
            switchSpectatorToCollaborator(input: $input) {
              id
              canEdit
            }
          }
        `);

        const input: SpectatorIdInput = {
          spectatorId: testSpectatorId,
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

        expect(response.data?.switchSpectatorToCollaborator).toMatchObject({
          id: testSpectatorId,
          canEdit: true,
        });
      });
    });

    describe('switchCollaboratorToSpectator', () => {
      it('should switch a collaborator to a spectator', async () => {
        const mutation = graphql(`
          mutation SwitchCollaboratorToSpectator($input: SpectatorIdInput!) {
            switchCollaboratorToSpectator(input: $input) {
              id
              canEdit
            }
          }
        `);

        const input: SpectatorIdInput = {
          spectatorId: testSpectatorId,
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

        expect(response.data?.switchCollaboratorToSpectator).toMatchObject({
          id: testSpectatorId,
          canEdit: false,
        });
      });
    });
  });
});
