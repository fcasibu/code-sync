import type { RoomAPI, UserAPI } from '@code-sync/api';

export interface Context {
  userApi: UserAPI;
  roomApi: RoomAPI;
}
