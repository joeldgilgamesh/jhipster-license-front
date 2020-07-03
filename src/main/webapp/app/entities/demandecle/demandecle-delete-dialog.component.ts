import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDemandecle } from 'app/shared/model/demandecle.model';
import { DemandecleService } from './demandecle.service';

@Component({
  templateUrl: './demandecle-delete-dialog.component.html',
})
export class DemandecleDeleteDialogComponent {
  demandecle?: IDemandecle;

  constructor(
    protected demandecleService: DemandecleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.demandecleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('demandecleListModification');
      this.activeModal.close();
    });
  }
}
