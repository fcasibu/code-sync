'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { Dialog, DialogContent, DialogTrigger, Text } from '@code-sync/ui';
import { CodeEditor } from '@/components';
import type { Submission } from '@/services';
import styles from './Submissions.module.css';

interface SubmissionsProps {
  submissions: Submission[];
}

export const Submissions = ({ submissions }: Readonly<SubmissionsProps>) => {
  const t = useTranslations('ProblemDetail.Explorer.Submissions');

  if (!submissions.length) {
    return <NoSubmissions>{t('noSubmissions')}</NoSubmissions>;
  }

  return (
    <table className={styles.submissions}>
      <thead>
        <tr>
          <th>{t('status')}</th>
          <th>{t('language')}</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map(({ id, status, language, code }) => (
          <Dialog key={id}>
            <DialogContent>
              <SubmissionContent code={code} />
            </DialogContent>
            <DialogTrigger asChild>
              <tr>
                <td>
                  {/* TODO: type safety */}
                  <Text
                    className={clsx(
                      status === 'ACCEPTED' ? styles.success : styles.error,
                    )}
                    size="xs"
                  >
                    {status}
                  </Text>
                </td>
                <td>
                  <Text size="xs">{language}</Text>
                </td>
              </tr>
            </DialogTrigger>
          </Dialog>
        ))}
      </tbody>
    </table>
  );
};

const NoSubmissions = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={styles.noSubmissions}>
      <Text>{children}</Text>
    </div>
  );
};

interface SubmissionContentProps {
  code: string;
}

const SubmissionContent = ({ code }: Readonly<SubmissionContentProps>) => {
  return <CodeEditor initialCode={code} readOnly />;
};
