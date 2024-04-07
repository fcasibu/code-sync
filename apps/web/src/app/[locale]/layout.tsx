import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './_providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<LocaleLayoutProps>) {
  return (
    <html lang={locale}>
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
