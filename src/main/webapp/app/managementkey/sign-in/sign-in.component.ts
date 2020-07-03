import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'app/Service/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  authStatus?: boolean;

  private router: Router;

  constructor(private auth: AuthentificationService, router: Router) {
    this.router = router;
  }

  ngOnInit(): void {}
}
