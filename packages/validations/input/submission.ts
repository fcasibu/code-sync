import { submissionSchema } from '../schemas';

export const SubmissionCreateInput = submissionSchema.pick({
  userId: true,
  problemId: true,
  code: true,
  language: true,
});
