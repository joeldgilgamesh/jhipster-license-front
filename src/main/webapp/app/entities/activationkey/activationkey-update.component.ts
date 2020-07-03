import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IActivationkey, Activationkey } from 'app/shared/model/activationkey.model';
import { ActivationkeyService } from './activationkey.service';

@Component({
  selector: 'jhi-activationkey-update',
  templateUrl: './activationkey-update.component.html',
})
export class ActivationkeyUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    username: [],
    keyactivation: [],
    productname: [],
    nbreposte: [],
    nbreinstanceon: [],
  });

  constructor(protected activationkeyService: ActivationkeyService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ activationkey }) => {
      this.updateForm(activationkey);
    });
  }

  updateForm(activationkey: IActivationkey): void {
    this.editForm.patchValue({
      id: activationkey.id,
      username: activationkey.username,
      keyactivation: activationkey.keyactivation,
      productname: activationkey.productname,
      nbreposte: activationkey.nbreposte,
      nbreinstanceon: activationkey.nbreinstanceon,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const activationkey = this.createFromForm();
    if (activationkey.id !== undefined) {
      this.subscribeToSaveResponse(this.activationkeyService.update(activationkey));
    } else {
      this.subscribeToSaveResponse(this.activationkeyService.create(activationkey));
    }
  }

  private createFromForm(): IActivationkey {
    return {
      ...new Activationkey(),
      id: this.editForm.get(['id'])!.value,
      username: this.editForm.get(['username'])!.value,
      keyactivation: this.editForm.get(['keyactivation'])!.value,
      productname: this.editForm.get(['productname'])!.value,
      nbreposte: this.editForm.get(['nbreposte'])!.value,
      nbreinstanceon: this.editForm.get(['nbreinstanceon'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IActivationkey>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
