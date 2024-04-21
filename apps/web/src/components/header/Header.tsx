import { Code } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LocalizedLink } from '@code-sync/translations';
import { Gutter, Text } from '@code-sync/ui';
import { Navigation } from '../navigation';
import styles from './Header.module.css';

export const Header = () => {
  const t = useTranslations('Generic');

  return (
    <header className={styles.header}>
      <Gutter className={styles.gutter}>
        <LocalizedLink className={styles.logo} href="/">
          <Code size={20} />
          <Text>{t('siteTitle')}</Text>
        </LocalizedLink>
        <Navigation />
      </Gutter>
    </header>
  );
};
