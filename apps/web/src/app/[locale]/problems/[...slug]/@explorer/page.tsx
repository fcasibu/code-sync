import { notFound } from 'next/navigation';
import { LocalizedLink, getTranslations } from '@code-sync/translations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@code-sync/ui';
import { getCodingProblemById } from '@/services';
import { isDefined } from '@/utils';
import { Description, Submissions } from './_components';

interface ExplorerProps {
  params: { slug: string[] };
}

const Explorer = async ({ params }: Readonly<ExplorerProps>) => {
  const problemId = params.slug[0];
  const tabValue = params.slug.slice(0, 2).at(-1);

  console.log(params.slug);

  const { codingProblem } = await getCodingProblemById(problemId);
  if (!codingProblem) return notFound();

  const t = await getTranslations('ProblemDetail.Explorer');
  const { description, submissions } = codingProblem;

  const tabTriggers = [
    {
      href: `/problems/${problemId}`,
      title: t('tabs.description'),
      value: problemId,
    },
    {
      href: `/problems/${problemId}/submissions`,
      title: t('tabs.submissions:'),
      value: 'submissions',
    },
  ];

  return (
    <div>
      <Tabs value={tabValue}>
        <TabsList>
          {tabTriggers.map(({ value, href, title }) => (
            <TabsTrigger value={value} key={value}>
              <LocalizedLink href={href}>{title}</LocalizedLink>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={problemId}>
          <Description description={description} />
        </TabsContent>
        <TabsContent value="submissions">
          <Submissions submissions={submissions.filter(isDefined)} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Explorer;
