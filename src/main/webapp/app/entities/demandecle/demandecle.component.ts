import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDemandecle } from 'app/shared/model/demandecle.model';
import { DemandecleService } from './demandecle.service';
import { DemandecleDeleteDialogComponent } from './demandecle-delete-dialog.component';

@Component({
  selector: 'jhi-demandecle',
  templateUrl: './demandecle.component.html',
})
export class DemandecleComponent implements OnInit, OnDestroy {
  demandecles?: IDemandecle[];
  eventSubscriber?: Subscription;

  constructor(protected demandecleService: DemandecleService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.demandecleService.query().subscribe((res: HttpResponse<IDemandecle[]>) => (this.demandecles = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDemandecles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDemandecle): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDemandecles(): void {
    this.eventSubscriber = this.eventManager.subscribe('demandecleListModification', () => this.loadAll());
  }

  delete(demandecle: IDemandecle): void {
    const modalRef = this.modalService.open(DemandecleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.demandecle = demandecle;
  }
}
