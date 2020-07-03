import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'productservice',
        loadChildren: () => import('./productservice/productservice.module').then(m => m.GatewayProductserviceModule),
      },

      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.GatewayClientModule),
      },
      {
        path: 'demandecle',
        loadChildren: () => import('./demandecle/demandecle.module').then(m => m.GatewayDemandecleModule),
      },

      {
        path: 'activationkey',
        loadChildren: () => import('./activationkey/activationkey.module').then(m => m.GatewayActivationkeyModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayEntityModule {}
