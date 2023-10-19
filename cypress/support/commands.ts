import '@testing-library/cypress/add-commands';

import { Method as HttpMethod } from 'axios';
import { RouteHandler, RouteMatcher } from 'cypress/types/net-stubbing';

import { APPLICATION_LOADER } from '../constants/selectors';
import { REGISTRATION_SELECTOR } from '../e2e/register/selectors';

Cypress.Commands.add('hasToastMessage', (type: 'success' | 'error', message: string) => {
  const toastId = type === 'success' ? 'toast-success' : 'toast-error';

  cy.get(`[id=${toastId}]`).should('contain', message);
});

Cypress.Commands.add('hasActiveSpinner', () => {
  cy.get(`[aria-label=${APPLICATION_LOADER}]`).should('be.visible');
});

Cypress.Commands.add('register', (user: any) => {
  cy.visit('/register');
  cy.findByTestId(REGISTRATION_SELECTOR.inputName).type('Default User');
  cy.findByTestId(REGISTRATION_SELECTOR.inputEmail).type('defaultUser@gmail.com');
  cy.findByTestId(REGISTRATION_SELECTOR.inputPassword).type('password');

  cy.findByTestId(REGISTRATION_SELECTOR.submitButton).click();
});

Cypress.Commands.add('findByTableHeaderColumn', (columnName: string) => {
  cy.get(`td[headers=${columnName}]`);
});

Cypress.Commands.add(
  'interceptWithDelay',
  (method: HttpMethod, url: RouteMatcher, delayTime: number, response?: RouteHandler): void => {
    cy.intercept(method, url, (req) => {
      return Cypress.Promise.delay(delayTime, response).then(req.reply);
    });
  }
);
