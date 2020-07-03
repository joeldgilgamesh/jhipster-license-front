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
    codeproduct: ['', [Validators.required, Validators.email]],
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
        if (this.selectedServicesProduits?.idproduct === undefined) {
          console.log('create product');
        }
        this.updateForm(sp1);
      }
    });
  }

  updateForm(ps: any): void {
    this.editProduct.patchValue({
      idproduct: ps.id_product,
      productname: ps.product_name,
      codeproduct: ps.code_product,
      version: ps.version,
    });
  }

  updateData(product: ProductService): void {
    product.idproduct = this.editProduct.get('id_product')!.value;
    product.productname = this.editProduct.get('product_name')!.value;
    product.codeproduct = this.editProduct.get('code_product')!.value;
    product.version = this.editProduct.get('version')!.value;
  }

  actionClick(): void {
    this.selectedServicesProduits = new ProductService();
    this.updateData(this.selectedServicesProduits);
    if (this.selectedServicesProduits?.idproduct !== undefined) {
      this.serviceProduitService.updateServiceproduit(this.selectedServicesProduits).subscribe(
        data => {
          console.log('sucessfull updtate !');
          this.route.navigate(['/services-produit']);
        },
        error => {
          console.log('fail to update');
        }
      );
    } else {
      this.serviceProduitService
        .addServiceproduit({
          idproduct: this.editProduct.get('idproduct')!.value,
          productname: this.editProduct.get('productname')!.value,
          codeproduct: this.editProduct.get('codeproduct')!.value,
          version: this.editProduct.get('version')!.value,
        })
        .subscribe(
          data => {
            console.log('sucessfull add !');
            this.route.navigate(['/services-produit']);
          },
          error => {
            console.log('fail to save');
          }
        );
    }
  }
}
