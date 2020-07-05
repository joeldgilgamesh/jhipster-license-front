import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'app/Service/client.service';
import { User } from 'app/model/user';

@Component({
  selector: 'jhi-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  client: User[] | undefined;
  selectedClient: User | undefined;

  constructor(private clientService: ClientService, private httpClient: HttpClient, private fb: FormBuilder, private route: Router) {}

  ngOnInit(): void {
    this.initClients();
    this.loadClient();
  }

  initClients(): void {
    this.selectedClient = new User();
  }

  loadClient(): void {
    this.clientService.getClientList().subscribe(
      data => {
        this.client = data;
        console.log(this.selectedClient);
        console.log(this.client);
      },
      error => {
        console.log('Une erreur est survenus. !!');
      },
      () => {
        console.log('chargement liste Cleint reussis...');
      }
    );
  }

  deleteClients(id: number | undefined): void {
    this.clientService.deleteUser(id).subscribe(
      () => {
        this.loadClient();
      },
      () => {
        console.log('Erreur de suppresion du client ');
        console.log(this.client);
        console.log(this.selectedClient);
      },
      () => {
        console.log('suppresion client réussis');
      }
    );
  }

  editClients(): void {
    this.route.navigate(['create-client']);
  }

  editUpdateClients(id: number | undefined): void {
    this.route.navigate(['update-client', id]);
  }

  onViewClient(id: number | undefined): void {
    this.route.navigate(['view-client', id]);
  }
}
