/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { VM } from 'vm2';
import { Status, type TestCase } from '@code-sync/db';
import type { TestRunner } from './types';

export class Vm2TestRunner implements TestRunner {
  private readonly vm = new VM({
    sandbox: {},
    compiler: 'javascript',
    timeout: 20000,
  });

  async run(code: string, testCases: TestCase[]): Promise<Status> {
    let result: Status = Status.ACCEPTED;

    for (const testCase of testCases) {
      const testCode = `
        const output = (function() {
          ${code}
          return solution(${coerceToType(testCase.input)});
        })();

        Promise.resolve(output);`;

      try {
        const output = await this.vm.run(testCode);
        const actual =
          typeof output === 'string' ? output : JSON.stringify(output);

        if (actual !== testCase.output) {
          result = Status.WRONG_ANSWER;
          break;
        }
      } catch (error) {
        return getStatus((error as Error).toString());
      }
    }

    return result;
  }
}

function getStatus(message: string) {
  // TODO: This is not precise, fix it
  switch (message.slice(0, message.indexOf(':'))) {
    case 'RangeError':
      return Status.TIME_LIMIT_EXCEEDED;
    case 'TypeError':
    case 'ReferenceError':
    case 'SyntaxError':
      return Status.RUNTIME_ERROR;
    default:
      return Status.ACCEPTED;
  }
}

function coerceToType(input: string): any {
  if (input === 'true') {
    return true;
  } else if (input === 'false') {
    return false;
  }

  try {
    const parsedArray = JSON.parse(input);
    if (Array.isArray(parsedArray)) {
      return input;
    }
  } catch (error) {
    // If the input is not a valid array string, move on to the next check
  }

  try {
    const parsedObject = JSON.parse(input);
    if (typeof parsedObject === 'object' && parsedObject !== null) {
      return parsedObject;
    }
  } catch (error) {
    // If the input is not a valid object string, move on to the next check
  }

  const numberValue = Number(input);
  if (!isNaN(numberValue)) {
    return numberValue;
  }

  return `"${input}"`;
}
