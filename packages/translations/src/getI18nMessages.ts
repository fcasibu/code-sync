import type { AbstractIntlMessages } from 'next-intl';

export const getI18nMessages = async (locale: string) => {
  try {
    const messages = (await import(
      `./messages/${locale}.json`
    )) as AbstractIntlMessages;
    return messages;
  } catch (e) {
    return {};
  }
};
