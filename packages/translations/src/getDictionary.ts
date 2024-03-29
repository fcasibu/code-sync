import type { AbstractIntlMessages } from 'next-intl';

export const getDictionary = async (locale: string) => {
  try {
    const messages = (await import(`./messages/${locale}.json`)) as {
      default: AbstractIntlMessages;
    };
    return messages.default;
  } catch {
    return null;
  }
};
