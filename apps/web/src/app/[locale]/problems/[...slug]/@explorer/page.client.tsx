import { notFound } from 'next/navigation';
import { LocalizedLink, useTranslations } from '@code-sync/translations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@code-sync/ui';
import type { CompleteCodingProblem } from '@/services';
import { isDefined } from '@/utils';
import { Description, Submissions } from './_components';

interface ExplorerClientProps {
  tabValue?: string;
  problemId: string;
  codingProblem: CompleteCodingProblem;
}

export const ExplorerClient = ({
  tabValue,
  problemId,
  codingProblem,
}: ExplorerClientProps) => {
  const t = useTranslations('ProblemDetail.Explorer');

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

  if (!tabTriggers.some(({ value }) => value === tabValue)) {
    return notFound();
  }

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
