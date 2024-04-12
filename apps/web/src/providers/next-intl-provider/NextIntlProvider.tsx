import type { AbstractIntlMessages } from 'next-intl';
import { NextIntlClientProvider, useMessages, useTimeZone } from 'next-intl';

interface NextIntlProviderProps extends React.PropsWithChildren {
  locale: string;
}

export const NextIntlProvider = ({
  locale,
  children,
  ...props
}: Readonly<NextIntlProviderProps>) => {
  const messages = useMessages();
  const timezone = useTimeZone();

  return (
    <NextIntlClientProvider
      messages={JSON.parse(JSON.stringify(messages)) as AbstractIntlMessages}
      timeZone={timezone}
      locale={locale}
      {...props}
    >
      {children}
    </NextIntlClientProvider>
  );
};
