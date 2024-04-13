import requestGQL from 'supertest-graphql';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { ResultOf } from '@/utils';
import { graphql } from '@/utils';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeAll(helper.setup);
afterAll(helper.teardown);

// TODO: Remove
describe('resolver#Test', () => {
  it("test.helloWorld should return 'Hello, World!'", async () => {
    const query = graphql(`
      query Query {
        test {
          helloWorld
        }
      }
    `);

    const response = await requestGQL<ResultOf<typeof query>>(
      helper.app.expressServer,
    )
      .query(query)
      .expectNoErrors();

    expect(response.data?.test.helloWorld).toBe('Hello, World!');
  });
});
