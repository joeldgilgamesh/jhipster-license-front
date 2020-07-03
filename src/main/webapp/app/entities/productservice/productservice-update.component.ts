import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductservice, Productservice } from 'app/shared/model/productservice.model';
import { ProductserviceService } from './productservice.service';

@Component({
  selector: 'jhi-productservice-update',
  templateUrl: './productservice-update.component.html',
})
export class ProductserviceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    productname: [],
    codeproduct: [],
    version: [],
  });

  constructor(protected productserviceService: ProductserviceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productservice }) => {
      this.updateForm(productservice);
    });
  }

  updateForm(productservice: IProductservice): void {
    this.editForm.patchValue({
      id: productservice.id,
      productname: productservice.productname,
      codeproduct: productservice.codeproduct,
      version: productservice.version,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productservice = this.createFromForm();
    if (productservice.id !== undefined) {
      this.subscribeToSaveResponse(this.productserviceService.update(productservice));
    } else {
      this.subscribeToSaveResponse(this.productserviceService.create(productservice));
    }
  }

  private createFromForm(): IProductservice {
    return {
      ...new Productservice(),
      id: this.editForm.get(['id'])!.value,
      productname: this.editForm.get(['productname'])!.value,
      codeproduct: this.editForm.get(['codeproduct'])!.value,
      version: this.editForm.get(['version'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductservice>>): void {
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
