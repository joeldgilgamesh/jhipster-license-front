import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterModule, RouterStateSnapshot } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/shared/constants/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { PageNotFoundComponent } from 'app/managementkey/page-not-found/page-not-found.component';
import { SignInComponent } from 'app/managementkey/sign-in/sign-in.component';
import { AuthGuardService } from 'app/Service/auth-guard.service';
import { CreateGestioncleComponent } from 'app/managementkey/create-gestioncle/create-gestioncle.component';
import { CreateClientsComponent } from 'app/managementkey/create-clients/create-clients.component';
import { GestioncleComponent } from 'app/managementkey/gestioncle/gestioncle.component';
import { DemandecleComponent } from 'app/managementkey/demandecle/demandecle.component';
import { SingleClientsComponent } from 'app/managementkey/single-clients/single-clients.component';
import { ClientsComponent } from 'app/managementkey/clients/clients.component';
import { ProductServiceComponent } from 'app/managementkey/product-service/product-service.component';
import { CreateProductServiceComponent } from 'app/managementkey/create-product-service/create-product-service.component';
import { GestiondecleService } from 'app/Service/gestiondecle.service';
import { Modelmanegekey } from 'app/model/modelmanegekey';
import { Observable, of } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { ProductService } from 'app/model/product-service';
import { Contacts } from 'app/model/contacts';
import { ServiceProductService } from 'app/Service/service-product.service';
import { ClientService } from 'app/Service/client.service';
import { User } from 'app/model/user';
import { TestConnexionComponent } from 'app/managementkey/test-connexion/test-connexion.component';
import { SinglekeyComponent } from 'app/managementkey/singlekey/singlekey.component';

@Injectable({ providedIn: 'root' })
export class ActionManagementGestioncle implements Resolve<Modelmanegekey> {
  constructor(private gestiondecleService: GestiondecleService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Modelmanegekey> {
    const id = route.params['id'];
    if (id) {
      return this.gestiondecleService.getDataById(id);
    }

    return of(new Modelmanegekey());
  }
}
@Injectable({ providedIn: 'root' })
export class ActionResolveProduct implements Resolve<ProductService> {
  constructor(private serviceProductService: ServiceProductService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProductService> {
    const id = route.params['id'];
    if (id) {
      return this.serviceProductService.getByIdServiceproduit(id);
    }
    return of(new ProductService());
  }
}
@Injectable({ providedIn: 'root' })
export class ActionResolveClient implements Resolve<User> {
  constructor(private clientService: ClientService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const id = route.params['id'];
    if (id) {
      return this.clientService.getUserById(id);
    }
    return of(new User());
  }
}

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: '', component: TestConnexionComponent },
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },

        { path: 'service', component: ProductServiceComponent, canActivate: [AuthGuardService] },
        { path: 'clients', component: ClientsComponent, canActivate: [AuthGuardService] },
        { path: 'manage-key', component: GestioncleComponent, canActivate: [AuthGuardService] },
        { path: 'view-client/:id', component: SingleClientsComponent, canActivate: [AuthGuardService] },
        { path: 'view-key/:id', component: SinglekeyComponent, canActivate: [AuthGuardService] },
        { path: 'formulaire-cle', component: DemandecleComponent },
        { path: 'sign-in', component: SignInComponent },
        { path: 'sign', component: TestConnexionComponent },

        {
          path: 'create-servcie-product',
          component: CreateProductServiceComponent,
          canActivate: [AuthGuardService],
          resolve: { sp1: ActionResolveProduct },
        },
        {
          path: 'update-servcie-product/:id',
          component: CreateProductServiceComponent,
          canActivate: [AuthGuardService],
          resolve: { sp1: ActionResolveProduct },
        },

        {
          path: 'create-client',
          component: CreateClientsComponent,
          canActivate: [AuthGuardService],
          resolve: { sp2: ActionResolveClient },
        },
        {
          path: 'update-client/:id',
          component: CreateClientsComponent,
          canActivate: [AuthGuardService],
          resolve: { sp2: ActionResolveClient },
        },

        {
          path: 'update-gestioncle',
          component: CreateGestioncleComponent,
          canActivate: [AuthGuardService],
          resolve: { sp3: ActionManagementGestioncle },
        },
        {
          path: 'update-gestioncle/:id',
          component: CreateGestioncleComponent,
          canActivate: [AuthGuardService],
          resolve: { sp3: ActionManagementGestioncle },
        },

        { path: 'not-found', component: PageNotFoundComponent },
        { path: '**', redirectTo: 'not-found' },

        ...LAYOUT_ROUTES,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class GatewayAppRoutingModule {}
