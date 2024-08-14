import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import App from './App';
import { MemoryRouter, Router } from 'react-router';

describe('App', () => {
  test('testing routes login, register, /', () => {
    const { getAllByText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    const loginButton = getAllByText('Log In')[0]
    fireEvent.click(loginButton)
    expect(screen.getByText(('or Sign In with'))).toBeInTheDocument()

    const createAccountButton = getAllByText('Create Account')[0]
    fireEvent.click(createAccountButton)
    expect(screen.getByText('Already have an account?')).toBeInTheDocument()
  })
})


