import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthentificationService } from 'app/Service/authentification.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router) {}

  // @ts-ignore
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticate()) return this.authService.isAuthenticate();
    else {
      this.router.navigate(['/sign-in']);
    }

    // eslint-disable-next-line @typescript-eslint/tslint/config
    // tslint:disable-next-line:typedef
    /* canActivate(
       route: ActivatedRouteSnapshot,
       state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       if (this.authService.isAuthenticate()) return this.authService.isAuthenticate();
       else {
         this.router.navigate(['/sign-in']);
       }
     }*/
  }
}
