import React from 'react';
import { fireEvent, render,  waitFor } from '@testing-library/react';
import Register from './register';
import { MemoryRouter } from 'react-router';
import * as apiMockService from '../../_services/api'
// here we mock our api call file with jest.mock so we can use it below in testing
jest.mock('../../_services/api.ts')

test('Register page', async () => {
  // type cast to jest.Mock to preserve typescript safety
  (apiMockService.SignUp as jest.Mock).mockResolvedValueOnce({"message": "CREATED"})
  
  const { getByPlaceholderText , getByText, debug } = render(
      <MemoryRouter>
          <Register />
      </MemoryRouter>
  );
  // sets the value of each element as the value in the fireEvent.change...
  // check login.test.tsx to why we use actual resolved values on getBy and not the i18n placeholders.
  const usernameElement = getByPlaceholderText('Username') as HTMLInputElement;
  fireEvent.change(usernameElement, { target: { value: 'TestUser'}})
  expect(usernameElement.value).toBe('TestUser');
  
  const emailElement = getByPlaceholderText('E-mail') as HTMLInputElement;
  fireEvent.change(emailElement, { target: { value: 'TestUser@gmail.com'}})
  expect(emailElement.value).toBe('TestUser@gmail.com');

  const passwordElement = getByPlaceholderText('Password') as HTMLInputElement;
  fireEvent.change(passwordElement, { target: { value: 'pass1'}})
  expect(passwordElement.value).toBe('pass1');

  const repeatPasswordElement = getByPlaceholderText('Repeat password') as HTMLInputElement;
  fireEvent.change(repeatPasswordElement, { target: { value: 'pass1'}})
  expect(repeatPasswordElement.value).toBe('pass1');

  const submitElement = getByText('Sign Up') as HTMLButtonElement;
  fireEvent.click(submitElement)

  // Expects the signUp to have been called with this information and only be called once
  expect(apiMockService.SignUp).toHaveBeenCalled()
  expect(apiMockService.SignUp).toHaveBeenCalledWith("TestUser", "TestUser@gmail.com", "e6c3da5b206634d7f3f3586d747ffdb36b5c675757b380c6a5fe5c570c714349")
  await waitFor(() => null)
});