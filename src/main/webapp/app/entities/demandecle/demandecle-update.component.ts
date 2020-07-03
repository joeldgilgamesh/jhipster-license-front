import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDemandecle, Demandecle } from 'app/shared/model/demandecle.model';
import { DemandecleService } from './demandecle.service';

@Component({
  selector: 'jhi-demandecle-update',
  templateUrl: './demandecle-update.component.html',
})
export class DemandecleUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nbreposte: [],
    dureecle: [],
    productname: [],
  });

  constructor(protected demandecleService: DemandecleService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demandecle }) => {
      this.updateForm(demandecle);
    });
  }

  updateForm(demandecle: IDemandecle): void {
    this.editForm.patchValue({
      id: demandecle.id,
      nbreposte: demandecle.nbreposte,
      dureecle: demandecle.dureecle,
      productname: demandecle.productname,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const demandecle = this.createFromForm();
    if (demandecle.id !== undefined) {
      this.subscribeToSaveResponse(this.demandecleService.update(demandecle));
    } else {
      this.subscribeToSaveResponse(this.demandecleService.create(demandecle));
    }
  }

  private createFromForm(): IDemandecle {
    return {
      ...new Demandecle(),
      id: this.editForm.get(['id'])!.value,
      nbreposte: this.editForm.get(['nbreposte'])!.value,
      dureecle: this.editForm.get(['dureecle'])!.value,
      productname: this.editForm.get(['productname'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDemandecle>>): void {
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
