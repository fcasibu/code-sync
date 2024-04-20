import { testCaseSchema } from '../schemas';

export const TestCaseCreateInput = testCaseSchema.pick({
  input: true,
  output: true,
  problemId: true,
});

export const TestCaseUpdateInput = TestCaseCreateInput.pick({
  input: true,
  output: true,
});
