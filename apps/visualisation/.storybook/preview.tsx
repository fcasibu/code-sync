// sort-imports-ignore
import '../src/styles/globals.css';

import { useEffect } from 'react';
import type { Preview } from '@storybook/react';
import { Inter } from 'next/font/google';
import { viewports } from './viewports';

const inter = Inter({ subsets: ['latin'] });

const preview: Preview = {
  decorators: [
    (Story) => {
      useEffect(() => {
        document.documentElement.setAttribute('class', inter.className);
      }, []);

      return <Story />;
    },
  ],
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
