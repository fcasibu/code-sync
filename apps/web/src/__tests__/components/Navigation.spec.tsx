import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { Navigation } from '@/components';
import { TestProviders, testHelper } from '../testHelpers';

const helper = testHelper();

afterEach(helper.teardown);

describe('components#Navigation', () => {
  it('should render the component correctly', () => {
    render(
      <TestProviders>
        <Navigation />
      </TestProviders>,
    );

    expect(screen.getByRole('navigation')).toBeDefined();
    expect(screen.getByRole('list')).toBeDefined();
    expect(screen.getByRole('list').children).toHaveLength(3);
    expect(screen.getByRole('list').children[0].textContent).toMatch(
      /projects/i,
    );
    expect(screen.getByRole('list').children[1].textContent).toMatch(
      /members/i,
    );
    expect(screen.getByRole('list').children[2].textContent).toMatch(/chat/i);
    expect(screen.getByText(/toggle user menu/i)).toBeDefined();
  });

  it('should open a dropdown menu when clicking the avatar', async () => {
    render(
      <TestProviders>
        <Navigation />
      </TestProviders>,
    );

    const avatar = screen.getByText(/toggle user menu/i);
    expect(screen.queryByText(/my account/i)).toBeNull();
    expect(screen.queryByText(/settings/i)).toBeNull();
    expect(screen.queryByText(/logout/i)).toBeNull();

    await userEvent.click(avatar);

    expect(screen.queryByText(/my account/i)).toBeDefined();
    expect(screen.queryByText(/settings/i)).toBeDefined();
    expect(screen.queryByText(/logout/i)).toBeDefined();
  });
});
