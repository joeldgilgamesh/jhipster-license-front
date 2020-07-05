import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  isAuth = false;

  constructor(private route: Router) {}

  // Retour changer
  // eslint-disable-next-line @typescript-eslint/tslint/config
  // tslint:disable-next-line:typedef
  signIn(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.isAuth = true;
        sessionStorage.setItem(`isAuth`, `true`);
        resolve(true);
      }, 2000);
    });
  }
  // eslint-disable-next-line @typescript-eslint/tslint/config
  // tslint:disable-next-line:typedef
  signOut() {
    sessionStorage.removeItem(`isAuth`);
    this.route.navigate(['/sign']);
  }

  isAuthenticate(): boolean {
    const session = sessionStorage.getItem(`isAuth`);
    if (session === 'true') return true;
    else return false;
  }
}
