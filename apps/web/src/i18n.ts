import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getI18nMessages, locales } from '@code-sync/translations';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound();

  return { messages: getI18nMessages(locale) };
});
