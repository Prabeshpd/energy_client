import { RouteHandler, RouteMatcher } from 'cypress/types/net-stubbing';

declare global {
  namespace Cypress {
    interface Chainable {
      hasToastMessage(type: 'success' | 'error', message: string): Chainable<any>;
      hasActiveSpinner(): Chainable<any>;
      register(user: any): Chainable<any>;
      login(user: any): Chainable<any>;
      navigateTo(pageName: string): Chainable<any>;
      findByTableHeaderColumn(columnName: string): Chainable<any>;
      interceptWithDelay(
        method: HttpMethod,
        url: RouteMatcher,
        delayTime: number,
        response?: RouteHandler
      ): Chainable<any>;
    }
  }
}
