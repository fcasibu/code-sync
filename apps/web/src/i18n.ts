import type { AbstractIntlMessages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@code-sync/translations';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound();

  try {
    const messages = (await import(
      `@code-sync/translations/src/messages/${locale}.json`
    )) as AbstractIntlMessages;
    return {
      messages,
    };
  } catch (e) {
    return {
      messages: {},
    };
  }
});
