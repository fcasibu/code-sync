import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as translations from '@code-sync/translations';
import { Header, Navigation } from '@/components';
import { TestProviders, testHelper } from '../testHelpers';

const helper = testHelper();

afterEach(helper.teardown);

describe('components#Header', () => {
  it('should render the header correctly', () => {
    render(
      <TestProviders>
        <Header />
      </TestProviders>,
    );

    const headerLogo = screen.getByRole<HTMLAnchorElement>('link', {
      name: /code sync/i,
    });
    expect(headerLogo).toBeDefined();
    expect(headerLogo.pathname).toBe('/en');
    expect(screen.getByText(/toggle user menu/i)).toBeDefined();
    expect(screen.getByRole('navigation')).toBeDefined();
  });

  describe('components#Navigation', () => {
    it('should render the navigation correctly', () => {
      render(
        <TestProviders>
          <Navigation />
        </TestProviders>,
      );

      expect(screen.getByRole('navigation')).toBeDefined();
      expect(screen.getByRole('list')).toBeDefined();
      expect(screen.getByRole('list').children).toHaveLength(2);
      expect(screen.getByRole('list').children[0].textContent).toMatch(
        /explore/i,
      );
      expect(screen.getByRole('list').children[1].textContent).toMatch(
        /problems/i,
      );
      expect(screen.getByText(/toggle user menu/i)).toBeDefined();
    });

    it('should highlight a link based on the current path', () => {
      vi.spyOn(translations, 'useLocalizedPathname').mockReturnValue(
        '/explore',
      );

      render(
        <TestProviders>
          <Navigation />
        </TestProviders>,
      );

      expect(screen.getByRole('link', { name: /explore/i }).className).toMatch(
        /linkHighlight/i,
      );
    });

    it('should open a dropdown menu when clicking the avatar', async () => {
      render(
        <TestProviders>
          <Navigation />
        </TestProviders>,
      );

      const avatar = screen.getByText(/toggle user menu/i);
      expect(screen.queryByText(/my account/i)).toBeNull();
      expect(screen.queryByRole('link', { name: /settings/i })).toBeNull();
      expect(screen.queryByRole('link', { name: /logout/i })).toBeNull();

      await userEvent.click(avatar);

      expect(screen.queryByText(/my account/i)).not.toBeNull();
      expect(screen.queryByRole('link', { name: /settings/i })).not.toBeNull();
      expect(screen.queryByRole('link', { name: /logout/i })).not.toBeNull();
    });
  });
});
