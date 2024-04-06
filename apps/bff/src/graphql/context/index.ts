import type {
  DocumentAPI,
  RoomAPI,
  SpectatorAPI,
  UserAPI,
} from '@code-sync/api';

export interface Context {
  userApi: UserAPI;
  roomApi: RoomAPI;
  documentApi: DocumentAPI;
  spectatorApi: SpectatorAPI;
}
