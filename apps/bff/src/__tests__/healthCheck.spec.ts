import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { testHelper } from './testHelper';

const helper = testHelper();

beforeAll(helper.setup);
afterAll(helper.teardown);

describe('startServer', () => {
  it('should be initialized without issue', async () => {
    const response = await request(helper.app.expressServer).get('/health');

    expect(response.status).toBe(200);
  });
});
