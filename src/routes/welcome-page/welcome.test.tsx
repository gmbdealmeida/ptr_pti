import React from 'react';
import { render, screen } from '@testing-library/react';
import Welcome from './welcome';
import { MemoryRouter } from 'react-router';

test('Welcome page', () => {
  render(
    <MemoryRouter>
      <Welcome />
    </MemoryRouter>
    );
  const linkElement = screen.getByText(/search/i);
  expect(linkElement).toBeInTheDocument();
});