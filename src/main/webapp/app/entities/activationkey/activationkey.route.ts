import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IActivationkey, Activationkey } from 'app/shared/model/activationkey.model';
import { ActivationkeyService } from './activationkey.service';
import { ActivationkeyComponent } from './activationkey.component';
import { ActivationkeyDetailComponent } from './activationkey-detail.component';
import { ActivationkeyUpdateComponent } from './activationkey-update.component';

@Injectable({ providedIn: 'root' })
export class ActivationkeyResolve implements Resolve<IActivationkey> {
  constructor(private service: ActivationkeyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IActivationkey> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((activationkey: HttpResponse<Activationkey>) => {
          if (activationkey.body) {
            return of(activationkey.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Activationkey());
  }
}

export const activationkeyRoute: Routes = [
  {
    path: '',
    component: ActivationkeyComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Activationkeys',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ActivationkeyDetailComponent,
    resolve: {
      activationkey: ActivationkeyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Activationkeys',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ActivationkeyUpdateComponent,
    resolve: {
      activationkey: ActivationkeyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Activationkeys',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ActivationkeyUpdateComponent,
    resolve: {
      activationkey: ActivationkeyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Activationkeys',
    },
    canActivate: [UserRouteAccessService],
  },
];
