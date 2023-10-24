import '@testing-library/jest-dom';

import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RegistrationForm } from './Form';

describe('SignUp Form:', () => {
  const registerUser = jest.fn();

  it('renders the component', () => {
    render(<RegistrationForm registerUser={registerUser} />);

    const inputNameElement = screen.getByPlaceholderText('Name');
    expect(inputNameElement).toHaveAttribute('type', 'text');
    expect(inputNameElement).toHaveValue('');

    const inputEmailElement = screen.getByPlaceholderText('email');
    expect(inputEmailElement).toHaveAttribute('type', 'email');
    expect(inputEmailElement).toHaveValue('');

    const inputPasswordElement = screen.getByPlaceholderText('password');
    expect(inputPasswordElement).toHaveAttribute('type', 'password');
    expect(inputPasswordElement).toHaveValue('');

    const submitButtonElement = screen.getByRole('button', { name: 'Register' });
    expect(submitButtonElement).toHaveAttribute('type', 'submit');
  });

  it('submits the form"s input values on submit', async () => {
    render(<RegistrationForm registerUser={registerUser} />);

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Name'), 'John');
    await user.type(screen.getByPlaceholderText('email'), 'john.dee@gmail.com');
    await user.type(screen.getByPlaceholderText('password'), 'Admin@123');

    await user.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() =>
      expect(registerUser).toHaveBeenCalledWith({
        email: 'john.dee@gmail.com',
        name: 'John',
        password: 'Admin@123',
      })
    );
  });
});
