import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from './search';
import { MemoryRouter } from 'react-router';

test('Search page', () => {
  render(
      <MemoryRouter>
          <Search />
      </MemoryRouter>
  );
  // const linkElement = screen.getAllByText(/Apartment/i);
  // expect(linkElement[0]).toBeInTheDocument();//change to something unique in search
});