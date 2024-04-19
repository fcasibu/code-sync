import { cleanup } from '@testing-library/react';
import { vi } from 'vitest';
import { getI18nMessages } from '@code-sync/translations';
import { Providers } from '@/app/[locale]/_providers';

vi.mock('next-intl', async (importOriginal) => {
  const messages = await getI18nMessages('en');

  return {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    ...(await importOriginal<typeof import('next-intl')>()),
    useMessages: () => messages,
    useTimeZone: () => 'UTC',
  };
});

export const TestProviders = ({ children }: React.PropsWithChildren) => {
  return <Providers locale="en">{children}</Providers>;
};

export const testHelper = () => {
  const setup = () => {};

  const teardown = () => {
    vi.restoreAllMocks();
    cleanup();
  };

  return {
    setup,
    teardown,
  };
};
