import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDemandecle } from 'app/shared/model/demandecle.model';

@Component({
  selector: 'jhi-demandecle-detail',
  templateUrl: './demandecle-detail.component.html',
})
export class DemandecleDetailComponent implements OnInit {
  demandecle: IDemandecle | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demandecle }) => (this.demandecle = demandecle));
  }

  previousState(): void {
    window.history.back();
  }
}
