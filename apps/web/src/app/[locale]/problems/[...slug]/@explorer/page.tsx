import { notFound } from 'next/navigation';
import { getCodingProblemById } from '@/services';
import { ExplorerClient } from './page.client';

interface ExplorerProps {
  params: { slug: string[] };
}

const Explorer = async ({ params }: Readonly<ExplorerProps>) => {
  const problemId = params.slug[0];
  const tabValue = params.slug.slice(0, 2).at(-1);

  const { codingProblem } = await getCodingProblemById(problemId);
  if (!codingProblem) return notFound();

  return (
    <ExplorerClient
      problemId={problemId}
      tabValue={tabValue}
      codingProblem={codingProblem}
    />
  );
};

export default Explorer;
