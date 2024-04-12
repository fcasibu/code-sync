import { Code } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Gutter, Text } from '@code-sync/ui';
import { Navigation } from '../navigation';
import styles from './Header.module.css';

export const Header = () => {
  const t = useTranslations('Generic');

  return (
    <header className={styles.header}>
      <Gutter className={styles.gutter}>
        <div className={styles.logo}>
          <Code size={20} />
          <Text>{t('siteTitle')}</Text>
        </div>
        <Navigation />
      </Gutter>
    </header>
  );
};
