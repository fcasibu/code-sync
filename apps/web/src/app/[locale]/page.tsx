import { useTranslations } from '@code-sync/translations';

export default function Home() {
  const t = useTranslations('Home');
  return <main className="text-4xl">{t('title')}</main>;
}
