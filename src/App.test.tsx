import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { WrappedApp, App } from './App';

describe('App', () => {
  it('Renders hello world', () => {
    // ARRANGE
    render(<WrappedApp />);
    // ACT

    // EXPECT
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hello World'
    );
  });

  it('Renders not found', () => {
    // ARRANGE
    render(
      <MemoryRouter
        initialEntries={[
          '/not-found',
          '/suuuuuui',
          '/chimp/through/the/looking/glass',
        ]}
      >
        <App />
      </MemoryRouter>
    );
    // ACT
    // Navigate to a non-existing page
    // EXPECT
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Not Found'
    );
  });
});
