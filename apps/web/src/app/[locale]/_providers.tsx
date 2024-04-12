import { UserProvider } from '@auth0/nextjs-auth0/client';
import { NextIntlProvider } from '@/providers';

interface ProvidersProps extends React.PropsWithChildren {
  locale: string;
}

export const Providers = ({ children, locale }: Readonly<ProvidersProps>) => {
  return (
    <UserProvider>
      <NextIntlProvider locale={locale}>{children}</NextIntlProvider>
    </UserProvider>
  );
};
