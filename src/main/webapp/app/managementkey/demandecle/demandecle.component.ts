import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandcleService } from 'app/Service/demandcle.service';
import { ServiceProductService } from 'app/Service/service-product.service';
import { User } from 'app/model/user';

@Component({
  selector: 'jhi-demandecle',
  templateUrl: './demandecle.component.html',
  styleUrls: ['./demandecle.component.scss'],
})
export class DemandecleComponent implements OnInit {
  user: any;
  productList?: any[];

  editDemandeCle = this.fb.group({
    productname: ['', Validators.required],
    nbreposte: ['', Validators.required],
    dureecle: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private demandcleService: DemandcleService,
    private serviceProduitService: ServiceProductService
  ) {}

  ngOnInit(): void {
    //recuperation liste des nom produits
    this.loadproduct();
  }

  sendRequest(): void {
    const client = new User();
    client.id = 1;
    client.username = 'toto';
    client.phone = 3334;
    client.email = 'trtrtr';
    const c = this.editDemandeCle.value;
    const body = {
      user: client,
      productname: this.editDemandeCle.get('productname')!.value,
      nbreposte: this.editDemandeCle.get('nbreposte')!.value,
      dureecle: this.editDemandeCle.get('dureecle')!.value,
    };
    console.log(JSON.stringify(body));
    if (body.productname !== '-1') {
      this.demandcleService.sendAskKey(body).subscribe(
        data => {
          console.log(JSON.stringify(data));
          //this.route.navigate(['/clients']);
        },
        error => {
          console.log('faail send request' + error);
        }
      );
    } else {
      alert('selectionner produit');
    }
  }

  loadproduct(): void {
    this.serviceProduitService.getServiceproduit().subscribe(
      data => {
        this.productList = data;
        console.log(this.productList);
      },
      error => {
        console.log('Une erreur est survenus. !!');
      },
      () => {
        console.log('chargement liste et produit reussis...');
      }
    );
  }
}
