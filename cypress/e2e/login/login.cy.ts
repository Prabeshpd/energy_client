import { LOGIN_SELECTOR } from './selectors';

describe('Login with Credentials', () => {
  describe('given valid credentials', () => {
    it('redirects user to home page', () => {
      const [email, password] = ['defaultUser@gmail.com', 'password'];
      cy.visit('/auth/login');
      cy.interceptWithDelay('POST', '**/api/v1/auth/login', 100, {
        statusCode: 200,
        fixture: 'Authentication/valid.json',
      });

      cy.findByTestId(LOGIN_SELECTOR.inputEmail).type(email);
      cy.findByTestId(LOGIN_SELECTOR.inputPassword).type(password);
      cy.findByTestId(LOGIN_SELECTOR.submitButton).invoke('click');

      cy.hasToastMessage('success', 'You have logged in successfully.');
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/');
      });
    });
  });

  describe('given INVALID credentials', () => {
    it('throws error', () => {
      const [email, password] = ['defaultUser@gmail.com', 'password'];
      cy.visit('/auth/login');
      cy.interceptWithDelay('POST', '**/api/v1/auth/login', 100, {
        statusCode: 400,
        fixture: 'Authentication/error.json',
      });

      cy.findByTestId(LOGIN_SELECTOR.inputEmail).type(email);
      cy.findByTestId(LOGIN_SELECTOR.inputPassword).type(password);
      cy.findByTestId(LOGIN_SELECTOR.submitButton).invoke('click');

      cy.hasToastMessage('error', 'The provided credentials are invalid.');
    });
  });
});
