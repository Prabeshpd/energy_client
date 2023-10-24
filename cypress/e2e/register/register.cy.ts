import { REGISTRATION_SELECTOR } from './selectors';

describe('Register', () => {
  describe('given valid credentials', () => {
    it('creates user successfully', () => {
      cy.visit('/auth/register');
      cy.interceptWithDelay('POST', '**/api/v1/users', 100, {
        fixture: 'Register/valid.json',
      });

      cy.findByTestId(REGISTRATION_SELECTOR.inputName).type('Default User');
      cy.findByTestId(REGISTRATION_SELECTOR.inputEmail).type('defaultUser@gmail.com');
      cy.findByTestId(REGISTRATION_SELECTOR.inputPassword).type('password');

      cy.findByTestId(REGISTRATION_SELECTOR.submitButton).invoke('click');

      cy.hasToastMessage(
        'success',
        'The user account has been successfully created. You can now log in.'
      );
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/auth/login');
      });
    });
  });

  describe('given email is NOT unique', () => {
    it('throws error', () => {
      const [name, email, password] = ['default User', 'defaultUser@gmail.com', 'password'];
      cy.interceptWithDelay('POST', '**/api/v1/users', 100, {
        statusCode: 422,
        fixture: 'Register/error.json',
      });

      cy.visit('/auth/register');
      cy.findByTestId(REGISTRATION_SELECTOR.inputName).type(name);
      cy.findByTestId(REGISTRATION_SELECTOR.inputEmail).type(email);
      cy.findByTestId(REGISTRATION_SELECTOR.inputPassword).type(password);

      cy.findByTestId(REGISTRATION_SELECTOR.submitButton).invoke('click');

      cy.hasToastMessage('error', 'An issue occurred when creating the user account');
    });
  });
});
