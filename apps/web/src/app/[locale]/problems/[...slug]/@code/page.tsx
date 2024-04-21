import { Code as CodeIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Text } from '@code-sync/ui';
import { CodeEditor } from '@/components';
import styles from './page.module.css';

const Code = () => {
  const t = useTranslations('CodeEditor');

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <CodeIcon size={15} aria-hidden />
        <Text as="span">{t('title')}</Text>
      </div>
      <CodeEditor
        className={styles.codeEditor}
        initialCode='console.log("Hello, World!");'
      />
    </div>
  );
};

export default Code;
