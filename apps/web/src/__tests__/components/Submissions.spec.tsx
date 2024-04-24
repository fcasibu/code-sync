import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Submissions } from '@/app/[locale]/problems/[...slug]/@explorer/_components';
import type { Submission } from '@/services';
import { TestProviders, testHelper } from '../testHelpers';

const helper = testHelper();

afterEach(helper.teardown);

vi.mock('@codemirror/lang-javascript');

describe('components#Submissions', () => {
  it('should render the submissions component correctly', () => {
    const mockSubmissions: Submission[] = [
      {
        id: 'submission-0',
        status: 'ACCEPTED',
        userId: '',
        language: 'JAVASCRIPT',
        problemId: '',
        code: '',
        updatedAt: null,
        createdAt: null,
      },
      {
        id: 'submission-1',
        status: 'WRONG_ANSWER',
        userId: '',
        language: 'JAVASCRIPT',
        problemId: '',
        code: '',
        updatedAt: null,
        createdAt: null,
      },
    ];
    render(
      <TestProviders>
        <Submissions submissions={mockSubmissions} />
      </TestProviders>,
    );

    expect(screen.getByText(/status/i)).toBeDefined();
    expect(screen.getByText(/language/i)).toBeDefined();
    expect(screen.getAllByText(/javascript/i).length).toBe(2);
    expect(screen.getByText(/wrong_answer/i)).toBeDefined();
    expect(screen.getByText(/accepted/i)).toBeDefined();
  });

  it('should be able to render correct classes for accepted/non-accepted submissions', () => {
    const mockSubmissions: Submission[] = [
      {
        id: 'submission-0',
        status: 'ACCEPTED',
        userId: '',
        language: 'JAVASCRIPT',
        problemId: '',
        code: '',
        updatedAt: null,
        createdAt: null,
      },
      {
        id: 'submission-1',
        status: 'WRONG_ANSWER',
        userId: '',
        language: 'JAVASCRIPT',
        problemId: '',
        code: '',
        updatedAt: null,
        createdAt: null,
      },
      {
        id: 'submission-2',
        status: 'TIME_LIMIT_EXCEEDED',
        userId: '',
        language: 'RUST',
        problemId: '',
        code: '',
        updatedAt: null,
        createdAt: null,
      },
    ];
    render(
      <TestProviders>
        <Submissions submissions={mockSubmissions} />
      </TestProviders>,
    );

    expect(screen.getByText(/status/i)).toBeDefined();
    expect(screen.getByText(/language/i)).toBeDefined();
    expect(screen.getAllByText(/javascript/i).length).toBe(2);
    expect(screen.getByText(/rust/i)).toBeDefined();
    expect(screen.getByText(/wrong_answer/i).className).toMatch(/error/i);
    expect(screen.getByText(/wrong_answer/i).className).not.toMatch(/success/i);
    expect(screen.getByText(/accepted/i).className).toMatch(/success/i);
    expect(screen.getByText(/accepted/i).className).not.toMatch(/error/i);
    expect(screen.getByText(/time_limit_exceeded/i).className).toMatch(
      /error/i,
    );
    expect(screen.getByText(/time_limit_exceeded/i).className).not.toMatch(
      /success/i,
    );
  });

  it('should render a no submissionns found text if empty', () => {
    const mockSubmissions: Submission[] = [];
    render(
      <TestProviders>
        <Submissions submissions={mockSubmissions} />
      </TestProviders>,
    );

    expect(screen.getByText(/no submissions yet./i)).toBeDefined();
    expect(screen.queryByText(/status/i)).toBeNull();
    expect(screen.queryByText(/language/i)).toBeNull();
  });

  it('should render a dialog with the code of the submission after clicking on it', async () => {
    const mockSubmissions: Submission[] = [
      {
        id: 'submission-0',
        status: 'ACCEPTED',
        userId: '',
        language: 'JAVASCRIPT',
        problemId: '',
        code: 'console.log("Hello, World!")',
        updatedAt: null,
        createdAt: null,
      },
    ];

    render(
      <TestProviders>
        <Submissions submissions={mockSubmissions} />
      </TestProviders>,
    );

    await userEvent.click(screen.getByText(/accepted/i));

    expect(screen.findByRole('dialog')).toBeDefined();
    expect(screen.findByText(mockSubmissions[0].code)).toBeDefined();
  });
});
