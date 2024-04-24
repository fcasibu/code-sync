'use client';

import { notFound } from 'next/navigation';
import { useLocalizedRouter, useTranslations } from '@code-sync/translations';
import { Tabs, TabsContent, TabsList, TabsTrigger, Text } from '@code-sync/ui';
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
  const router = useLocalizedRouter();
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

  const handleTabClick = (href: string) => () => {
    router.push(href);
  };

  return (
    <div>
      <Tabs value={tabValue}>
        <TabsList>
          {tabTriggers.map(({ value, href, title }) => (
            <TabsTrigger
              onClick={handleTabClick(href)}
              value={value}
              key={value}
            >
              <Text>{title}</Text>
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
