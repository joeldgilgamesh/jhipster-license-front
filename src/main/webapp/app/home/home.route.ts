import { Route } from '@angular/router';

import { HomeComponent } from './home.component';
import { ClientsComponent } from 'app/managementkey/clients/clients.component';
import { TestConnexionComponent } from 'app/managementkey/test-connexion/test-connexion.component';

export const HOME_ROUTE: Route = {
  path: '',
  component: TestConnexionComponent,
  /*data: {
    authorities: [],
    pageTitle: 'Welcome, Java Hipster!',
  },*/
};
