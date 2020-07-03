import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductservice } from 'app/shared/model/productservice.model';
import { ProductserviceService } from './productservice.service';

@Component({
  templateUrl: './productservice-delete-dialog.component.html',
})
export class ProductserviceDeleteDialogComponent {
  productservice?: IProductservice;

  constructor(
    protected productserviceService: ProductserviceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productserviceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productserviceListModification');
      this.activeModal.close();
    });
  }
}
