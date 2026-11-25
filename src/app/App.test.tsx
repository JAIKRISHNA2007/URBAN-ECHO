import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import '@/shared/i18n';

import { App } from './App';

describe('shared application shell', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('renders the foundation without feature-specific workflows', async () => {
    render(<App />);

    expect(
      await screen.findByRole('heading', {
        name: 'The common application shell is ready.',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Canonical contracts')).toBeInTheDocument();
  });
});
