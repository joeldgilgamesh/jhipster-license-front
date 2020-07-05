import { Component, OnInit } from '@angular/core';
import { ServiceProductService } from 'app/Service/service-product.service';
import { ProductService } from 'app/model/product-service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'jhi-create-product-service',
  templateUrl: './create-product-service.component.html',
  styleUrls: ['./create-product-service.component.scss'],
})
export class CreateProductServiceComponent implements OnInit {
  selectedServicesProduits?: ProductService;

  // operation = 'add' ;

  editProduct = this.fb.group({
    id: '',
    productname: ['', Validators.required],
    codeproduct: ['', Validators.required],
    version: '',
  });

  constructor(
    private serviceProduitService: ServiceProductService,
    private router: ActivatedRoute,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.router.data.subscribe(({ sp1 }) => {
      if (sp1) {
        this.selectedServicesProduits = sp1;
        if (this.selectedServicesProduits?.id === undefined) {
          console.log('create product');
        }
        this.updateForm(sp1);
      }
    });
  }

  updateForm(ps: any): void {
    this.editProduct.patchValue({
      id: ps.id,
      productname: ps.productname,
      codeproduct: ps.codeproduct,
      version: ps.version,
    });
  }

  updateData(product: ProductService | undefined): void {
    // @ts-ignore
    product.id = this.editProduct.get('id')!.value;
    // @ts-ignore
    product.productname = this.editProduct.get('productname')!.value;
    // @ts-ignore
    product.codeproduct = this.editProduct.get('codeproduct')!.value;
    // @ts-ignore
    product.version = this.editProduct.get('version')!.value;
  }

  actionClick(): void {
    // this.selectedServicesProduits = new ProductService();
    this.updateData(this.selectedServicesProduits);
    if (this.selectedServicesProduits?.id !== undefined) {
      this.serviceProduitService.updateServiceproduit(this.selectedServicesProduits).subscribe(
        data => {
          console.log('sucessfull updtate !');
          this.route.navigate(['/service']);
        },
        error => {
          console.log('fail to update');
        }
      );
    } else {
      this.serviceProduitService
        .addServiceproduit({
          id: this.editProduct.get('id')!.value,
          productname: this.editProduct.get('productname')!.value,
          codeproduct: this.editProduct.get('codeproduct')!.value,
          version: this.editProduct.get('version')!.value,
        })
        .subscribe(
          data => {
            console.log('sucessfull add !');
            this.route.navigate(['/service']);
          },
          error => {
            console.log('fail to save');
          }
        );
    }
  }
}
