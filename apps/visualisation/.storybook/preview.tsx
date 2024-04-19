// sort-imports-ignore
import '../src/styles/globals.css';

import { useEffect } from 'react';
import type { Preview } from '@storybook/react';
import { Inter } from 'next/font/google';
import { viewports } from './viewports';
import {
  NextIntlClientProvider,
  getI18nMessages,
  locales,
} from '@code-sync/translations';

const inter = Inter({ subsets: ['latin'] });

const preview: Preview = {
  loaders: async ({ globals: { locale } }) => {
    return getI18nMessages(locale as string);
  },
  decorators: [
    (Story, context) => {
      const { loaded } = context;

      useEffect(() => {
        document.documentElement.setAttribute('class', inter.className);
      }, []);

      return (
        <NextIntlClientProvider timeZone="UTC" messages={loaded} locale="en">
          <Story />
        </NextIntlClientProvider>
      );
    },
  ],
  globalTypes: {
    locale: {
      description: 'Locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: locales.map((locale) => ({
          value: locale,
          title: locale.toUpperCase(),
        })),
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: { viewports: { ...viewports }, defaultViewport: 'Desktop' },
  },
};

export default preview;
