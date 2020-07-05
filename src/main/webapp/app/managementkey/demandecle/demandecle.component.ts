import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandcleService } from 'app/Service/demandcle.service';
import { ServiceProductService } from 'app/Service/service-product.service';

@Component({
  selector: 'jhi-demandecle',
  templateUrl: './demandecle.component.html',
  styleUrls: ['./demandecle.component.scss'],
})
export class DemandecleComponent implements OnInit {
  user: any;
  productList?: any[];

  editDemandeCle = this.fb.group({
    username: '',
    productname: '',
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
    const c = this.editDemandeCle.value;
    /*let body ={
      idUser:"" ,
      idProduct:"",
      nbPoste:"",
      validite:""*/

    this.demandcleService.sendAskKey(c).subscribe(
      data => {
        console.log(data);
        alert('Are you sure you want to send ??');
        //this.route.navigate(['/clients']);
      },
      error => {
        console.log('faail send request' + c);
      }
    );
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
