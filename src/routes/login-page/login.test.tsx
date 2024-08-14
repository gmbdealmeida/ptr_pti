import React from 'react';
import { fireEvent, render,  waitFor } from '@testing-library/react';
import Login from './login';
import { MemoryRouter } from 'react-router';
import * as apiMockService from '../../_services/api'
// here we mock our api call file with jest.mock so we can use it below in testing
jest.mock('../../_services/api.ts')

test('Login page', async () => {
  // type cast to jest.Mock to preserve typescript safety
  (apiMockService.Login as jest.Mock).mockResolvedValueOnce({data: {
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTYxNzQ2NzUyMiwiZXhwIjoxNjE3NDcxMTIyLCJuYmYiOjE2MTc0Njc1MjIsImp0aSI6Im9OVzU4OXNuaUlsRzRJTDMiLCJzdWIiOjcsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.NL8UxSAC4N2OjQtyB3TaqpYPayzEpY4bxDAzTdHbNWY",
      "token_type": "bearer",
      "expires_in": 3600
  }
})
  
  const { getByPlaceholderText , getByText, debug } = render(
      <MemoryRouter>
          <Login />
      </MemoryRouter>
  );
  // sets the value of each element as the value in the fireEvent.change...
  // We have to use actual values and not the i18n placeholder's because we have a resolved i18n instance in login for pop-ups
  // considering removing it and just using our values and listening to when the language changes 
  // for now we will continue to use an i18n instance for simplicity
  // observation: i18n is loading its default translation in english but fallback language is pt
  // kinda weird
  const emailElement = getByPlaceholderText('E-mail') as HTMLInputElement;
  fireEvent.change(emailElement, { target: { value: 'TestUser@gmail.com'}})
  expect(emailElement.value).toBe('TestUser@gmail.com');

  const passwordElement = getByPlaceholderText('Password') as HTMLInputElement;
  fireEvent.change(passwordElement, { target: { value: 'pass1'}})
  expect(passwordElement.value).toBe('pass1');

  const submitElement = getByText('Log In') as HTMLButtonElement;
  fireEvent.click(submitElement)

  // Expects the login to have been called with this information and only be called once
  expect(apiMockService.Login).toHaveBeenCalled()
  expect(apiMockService.Login).toHaveBeenCalledWith("TestUser@gmail.com", "e6c3da5b206634d7f3f3586d747ffdb36b5c675757b380c6a5fe5c570c714349")
  await waitFor(() => null)
});