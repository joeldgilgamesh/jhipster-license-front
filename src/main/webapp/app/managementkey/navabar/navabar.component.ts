import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'app/Service/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-navabar',
  templateUrl: './navabar.component.html',
  styleUrls: ['./navabar.component.scss'],
})
export class NavabarComponent implements OnInit {
  authStatus?: boolean;

  constructor(public auth: AuthentificationService) {}

  ngOnInit(): void {}

  onSignOut(): void {
    this.auth.signOut();
  }
}
