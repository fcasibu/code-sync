'use client';

import { useState } from 'react';
import { Code as CodeIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Text } from '@code-sync/ui';
import { CodeEditor } from '@/components';
import styles from './page.module.css';

interface CodeClientProps {
  initialCode: string;
}

export const CodeClient = ({ initialCode }: CodeClientProps) => {
  const [code, setCode] = useState(initialCode);
  const t = useTranslations('CodeEditor');

  const handleChangeCode = (value: string) => {
    setCode(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <CodeIcon size={15} aria-hidden />
        <Text as="span">{t('title')}</Text>
      </div>
      <CodeEditor
        className={styles.codeEditor}
        code={code}
        onChange={handleChangeCode}
      />
    </div>
  );
};
