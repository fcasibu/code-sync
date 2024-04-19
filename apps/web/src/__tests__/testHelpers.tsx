import { cleanup } from '@testing-library/react';
import { vi } from 'vitest';
import { Providers } from '@/app/[locale]/_providers';

vi.mock('next-intl', async (importOriginal) => {
  return {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    ...(await importOriginal<typeof import('next-intl')>()),
    useMessages: () => ({
      Navigation: {
        links: {
          projects: 'Projects',
          members: 'Members',
          chat: 'Chat',
        },
        userMenu: {
          toggleUserMenu: 'Toggle user menu',
          menuLabel: 'My Account',
          settings: 'Settings',
          logout: 'Logout',
        },
      },
    }),
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
