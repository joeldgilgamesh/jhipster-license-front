import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'app/Service/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-test-connexion',
  templateUrl: './test-connexion.component.html',
  styleUrls: ['./test-connexion.component.scss'],
})
export class TestConnexionComponent implements OnInit {
  myForm = this.fb.group({
    email: new FormControl(''),
    password: new FormControl(''),
    rememberme: new FormControl(''),
  });

  authStatus: Boolean | undefined;

  constructor(private auth: AuthentificationService, private router: Router, private fb: FormBuilder) {}

  // eslint-disable-next-line @typescript-eslint/tslint/config
  // tslint:disable-next-line:typedef
  ngOnInit(): void {}

  // eslint-disable-next-line @typescript-eslint/tslint/config
  // tslint:disable-next-line:typedef
  onSignIn() {
    this.auth.signIn().then(() => {
      console.log('Sign in successful' + this.auth.isAuth);
      this.authStatus = this.auth.isAuth;
      this.router.navigate(['/service']);
    });
  }
}
