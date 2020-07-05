import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/model/product-service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthentificationService } from 'app/Service/authentification.service';
import { ServiceProductService } from 'app/Service/service-product.service';

@Component({
  selector: 'jhi-product-service',
  templateUrl: './product-service.component.html',
  styleUrls: ['./product-service.component.scss'],
})
export class ProductServiceComponent implements OnInit {
  productService?: ProductService[];

  selectedServiceProduit?: ProductService;

  operation = 'add';

  editProduct = this.fb.group({
    productname: ['', Validators.required],
    codeproduct: ['', Validators.required],
    version: ['', Validators.required],
  });

  constructor(
    private serviceProduitService: ServiceProductService,
    private httpClient: HttpClient,
    private route: Router,
    public authService: AuthentificationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadServiceProduit();
    this.initproduct();
  }

  initproduct(): void {
    this.selectedServiceProduit = new ProductService();
  }

  loadServiceProduit(): void {
    this.serviceProduitService.getServiceproduit().subscribe(
      data => {
        this.productService = data;
        console.log(this.productService);
      },
      error => {
        console.log('Une erreur est survenus. !!');
      },
      () => {
        console.log('chargement liste et produit reussis...');
      }
    );
  }

  deleteServiceProduit(id: number | undefined): void {
    this.serviceProduitService.deleteServiceproduit(id).subscribe(
      () => {
        this.loadServiceProduit();
      },
      () => {
        console.log('Erreur de suppresion du service ');
      },
      () => {
        console.log('suppresion service réussis');
      }
    );
  }

  editServiceProduit(): void {
    this.route.navigate(['create-servcie-product']);
  }

  editUpdateServiceProduit(id: number | undefined): void {
    this.route.navigate(['update-servcie-product', id]);
  }
}
