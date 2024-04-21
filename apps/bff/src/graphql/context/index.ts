import type {
  CodingProblemAPI,
  CodingProblemSessionAPI,
  SessionSpectatorAPI,
  SubmissionAPI,
  TestCaseAPI,
  UserAPI,
} from '@code-sync/api';

export interface Context {
  userApi: UserAPI;
  codingProblemApi: CodingProblemAPI;
  submissionApi: SubmissionAPI;
  codingProblemSessionApi: CodingProblemSessionAPI;
  sessionSpectatorApi: SessionSpectatorAPI;
  testCaseApi: TestCaseAPI;
  isAuthorized: boolean;
}
