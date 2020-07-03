import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IActivationkey } from 'app/shared/model/activationkey.model';

@Component({
  selector: 'jhi-activationkey-detail',
  templateUrl: './activationkey-detail.component.html',
})
export class ActivationkeyDetailComponent implements OnInit {
  activationkey: IActivationkey | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ activationkey }) => (this.activationkey = activationkey));
  }

  previousState(): void {
    window.history.back();
  }
}
