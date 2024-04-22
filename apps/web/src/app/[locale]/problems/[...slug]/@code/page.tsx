import { notFound } from 'next/navigation';
import { getCodingProblemById } from '@/services';
import { CodeClient } from './page.client';

interface CodeProps {
  params: { slug: string[] };
}

const Code = async ({ params }: CodeProps) => {
  const problemId = params.slug[0];

  const { codingProblem } = await getCodingProblemById(problemId);
  if (!codingProblem) return notFound();

  // TODO: create initial code
  return (
    <CodeClient initialCode={codingProblem.submissions.at(-1)?.code ?? ''} />
  );
};

export default Code;
