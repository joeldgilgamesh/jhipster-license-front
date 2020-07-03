import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDemandecle, Demandecle } from 'app/shared/model/demandecle.model';
import { DemandecleService } from './demandecle.service';
import { DemandecleComponent } from './demandecle.component';
import { DemandecleDetailComponent } from './demandecle-detail.component';
import { DemandecleUpdateComponent } from './demandecle-update.component';

@Injectable({ providedIn: 'root' })
export class DemandecleResolve implements Resolve<IDemandecle> {
  constructor(private service: DemandecleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDemandecle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((demandecle: HttpResponse<Demandecle>) => {
          if (demandecle.body) {
            return of(demandecle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Demandecle());
  }
}

export const demandecleRoute: Routes = [
  {
    path: '',
    component: DemandecleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Demandecles',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DemandecleDetailComponent,
    resolve: {
      demandecle: DemandecleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Demandecles',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DemandecleUpdateComponent,
    resolve: {
      demandecle: DemandecleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Demandecles',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DemandecleUpdateComponent,
    resolve: {
      demandecle: DemandecleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Demandecles',
    },
    canActivate: [UserRouteAccessService],
  },
];
