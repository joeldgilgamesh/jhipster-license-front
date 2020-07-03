import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IActivationkey } from 'app/shared/model/activationkey.model';
import { ActivationkeyService } from './activationkey.service';

@Component({
  templateUrl: './activationkey-delete-dialog.component.html',
})
export class ActivationkeyDeleteDialogComponent {
  activationkey?: IActivationkey;

  constructor(
    protected activationkeyService: ActivationkeyService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.activationkeyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('activationkeyListModification');
      this.activeModal.close();
    });
  }
}
