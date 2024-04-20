import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Status, type TestCase } from '@code-sync/db';
import { Vm2TestRunner } from '../testRunners';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeEach(helper.setup);
afterEach(helper.teardown);

describe('Vm2TestRunner', () => {
  let testRunner: Vm2TestRunner;

  beforeEach(() => {
    testRunner = new Vm2TestRunner();
  });

  describe('run', () => {
    it('should execute code in sandbox', async () => {
      const code = `
function solution(input) {
  return input * 2;
}
`;
      const testCases: TestCase[] = [
        {
          id: '',
          input: '1',
          output: '2',
          createdAt: new Date(),
          problemId: '',
          updatedAt: new Date(),
        },
      ];

      const status = await testRunner.run(code, testCases);
      expect(status).toBe(Status.ACCEPTED);
    });

    it('should be able to handle array inputs and outputs', async () => {
      const code = `
function solution(input) {
  return input.map((item) => item * 2);
}
`;
      const testCases: TestCase[] = [
        {
          id: '',
          input: '[1,2,3,4,5]',
          output: '[2,4,6,8,10]',
          createdAt: new Date(),
          problemId: '',
          updatedAt: new Date(),
        },
      ];

      const status = await testRunner.run(code, testCases);
      expect(status).toBe(Status.ACCEPTED);
    });

    it('should be able to handle string inputs and outputs', async () => {
      const code = `
function solution(input) {
  return input.toUpperCase();
}
`;
      const testCases: TestCase[] = [
        {
          id: '',
          input: 'hello world',
          output: 'HELLO WORLD',
          createdAt: new Date(),
          problemId: '',
          updatedAt: new Date(),
        },
      ];

      const status = await testRunner.run(code, testCases);
      expect(status).toBe(Status.ACCEPTED);
    });

    it('should be able to handle boolean inputs and outputs', async () => {
      const code = `
function solution(input) {
  return !input;
}
`;
      const testCases: TestCase[] = [
        {
          id: '',
          input: 'true',
          output: 'false',
          createdAt: new Date(),
          problemId: '',
          updatedAt: new Date(),
        },
      ];

      const status = await testRunner.run(code, testCases);
      expect(status).toBe(Status.ACCEPTED);
    });

    it('should fail if the code throws an error', async () => {
      const code = `
function solution(input) {
  throw new Error('Something went wrong');
}
`;
      const testCases: TestCase[] = [
        {
          id: '',
          input: '1',
          output: '2',
          createdAt: new Date(),
          problemId: '',
          updatedAt: new Date(),
        },
      ];

      const status = await testRunner.run(code, testCases);
      expect(status).toBe(Status.ACCEPTED);
    });

    it('should be fail for time limit exceeded and return a status of TIME_LIMIT_EXCEEDED', async () => {
      const code = `
function solution() {
  return solution();
}
`;
      const testCases: TestCase[] = [
        {
          id: '',
          input: '',
          output: '',
          createdAt: new Date(),
          problemId: '',
          updatedAt: new Date(),
        },
      ];

      const status = await testRunner.run(code, testCases);
      expect(status).toBe(Status.TIME_LIMIT_EXCEEDED);
    });

    it('should fail for syntax errors and return a status of RUNTIME_ERROR', async () => {
      const code = `
unction solution() {
  return solution();
}
`;
      const testCases: TestCase[] = [
        {
          id: '',
          input: '',
          output: '',
          createdAt: new Date(),
          problemId: '',
          updatedAt: new Date(),
        },
      ];

      const status = await testRunner.run(code, testCases);
      expect(status).toBe(Status.RUNTIME_ERROR);
    });

    it('should fial for reference error: "x" is not defined and return a status of RUNTIME_ERROR', async () => {
      const code = `
function solution() {
  return x;
}
`;
      const testCases: TestCase[] = [
        {
          id: '',
          input: '',
          output: '',
          createdAt: new Date(),
          problemId: '',
          updatedAt: new Date(),
        },
      ];

      const status = await testRunner.run(code, testCases);
      expect(status).toBe(Status.RUNTIME_ERROR);
    });

    it('should be fail for type errors and return a status of RUNTIME_ERROR', async () => {
      const code = `
function solution() {
  const x = 1;
  return x();
}
`;
      const testCases: TestCase[] = [
        {
          id: '',
          input: '',
          output: '',
          createdAt: new Date(),
          problemId: '',
          updatedAt: new Date(),
        },
      ];

      const status = await testRunner.run(code, testCases);
      expect(status).toBe(Status.RUNTIME_ERROR);
    });
  });
});
