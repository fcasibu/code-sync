import { problemSchema } from '../schemas';

export const ProblemCreateInput = problemSchema.pick({
  authorId: true,
  title: true,
  description: true,
  difficulty: true,
});

export const ProblemUpdateInput = ProblemCreateInput.omit({ authorId: true });
