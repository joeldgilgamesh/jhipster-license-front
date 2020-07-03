import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IActivationkey } from 'app/shared/model/activationkey.model';
import { ActivationkeyService } from './activationkey.service';
import { ActivationkeyDeleteDialogComponent } from './activationkey-delete-dialog.component';

@Component({
  selector: 'jhi-activationkey',
  templateUrl: './activationkey.component.html',
})
export class ActivationkeyComponent implements OnInit, OnDestroy {
  activationkeys?: IActivationkey[];
  eventSubscriber?: Subscription;

  constructor(
    protected activationkeyService: ActivationkeyService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.activationkeyService.query().subscribe((res: HttpResponse<IActivationkey[]>) => (this.activationkeys = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInActivationkeys();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IActivationkey): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInActivationkeys(): void {
    this.eventSubscriber = this.eventManager.subscribe('activationkeyListModification', () => this.loadAll());
  }

  delete(activationkey: IActivationkey): void {
    const modalRef = this.modalService.open(ActivationkeyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.activationkey = activationkey;
  }
}
