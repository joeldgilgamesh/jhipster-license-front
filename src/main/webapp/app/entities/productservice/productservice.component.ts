import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductservice } from 'app/shared/model/productservice.model';
import { ProductserviceService } from './productservice.service';
import { ProductserviceDeleteDialogComponent } from './productservice-delete-dialog.component';

@Component({
  selector: 'jhi-productservice',
  templateUrl: './productservice.component.html',
})
export class ProductserviceComponent implements OnInit, OnDestroy {
  productservices?: IProductservice[];
  eventSubscriber?: Subscription;

  constructor(
    protected productserviceService: ProductserviceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.productserviceService.query().subscribe((res: HttpResponse<IProductservice[]>) => (this.productservices = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductservices();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductservice): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductservices(): void {
    this.eventSubscriber = this.eventManager.subscribe('productserviceListModification', () => this.loadAll());
  }

  delete(productservice: IProductservice): void {
    const modalRef = this.modalService.open(ProductserviceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productservice = productservice;
  }
}
