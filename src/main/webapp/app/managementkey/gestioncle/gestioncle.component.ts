import { Component, OnInit } from '@angular/core';
import { Modelmanegekey } from 'app/model/modelmanegekey';
import { GestiondecleService } from 'app/Service/gestiondecle.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'jhi-gestioncle',
  templateUrl: './gestioncle.component.html',
  styleUrls: ['./gestioncle.component.scss'],
})
export class GestioncleComponent implements OnInit {
  modelmanagekey?: Modelmanegekey[];
  selectedkey?: Modelmanegekey;

  /*  productList?: Productservice[];
    userList?: any[];*/

  constructor(
    private gestiondecleService: GestiondecleService,
    private httpClient: HttpClient,
    private route: Router
  ) // private serviceProduitService: ServiceProductService,
  // private clientService: ClientService
  {}

  ngOnInit(): void {
    this.selectedkey = new Modelmanegekey();
    /*   this.loadServiceProduit();
       this.loadClients();*/
    this.loadDataKey();
  }

  loadDataKey(): void {
    this.gestiondecleService.getDatagestion().subscribe(
      data => {
        this.modelmanagekey = data;
        console.log(this.modelmanagekey);
      },
      error => {
        console.log('Une erreur est survenus. !!');
      },
      () => {
        console.log('chargement liste des information des clés reussis...');
      }
    );
  }

  deleteKey(id: number | undefined): void {
    this.gestiondecleService.deleteKey(id).subscribe(
      data => {
        this.loadDataKey();
      },
      error => {
        console.log('Une erreur est survenus. !!');
      },
      () => {
        console.log('Suppresion clés reussis...');
      }
    );
  }

  /*  loadServiceProduit(): void {
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

    loadClients(): void {
      this.clientService.getClientList().subscribe(
        data => {
          this.userList = data;
          console.log(this.userList);
        },
        error => {
          console.log('Une erreur est survenus. !!');
        },
        () => {
          console.log('chargement liste Cleint reussis...');
        }
      );
    }*/

  editDataKey(id: number | undefined): void {
    this.route.navigate(['update-gestioncle', id]);
  }

  onViewKey(id: number | undefined): void {
    this.route.navigate(['view-key', id]);
  }
}
