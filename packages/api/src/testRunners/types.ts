/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Status, TestCase } from '@code-sync/db';

export interface TestRunner {
  run: (code: string, testCases: TestCase[]) => Promise<Status>;
}
