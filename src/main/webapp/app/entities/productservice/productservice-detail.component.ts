import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductservice } from 'app/shared/model/productservice.model';

@Component({
  selector: 'jhi-productservice-detail',
  templateUrl: './productservice-detail.component.html',
})
export class ProductserviceDetailComponent implements OnInit {
  productservice: IProductservice | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productservice }) => (this.productservice = productservice));
  }

  previousState(): void {
    window.history.back();
  }
}
