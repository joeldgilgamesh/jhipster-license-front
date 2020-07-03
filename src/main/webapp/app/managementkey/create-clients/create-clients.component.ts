import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from 'app/Service/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'jhi-create-clients',
  templateUrl: './create-clients.component.html',
  styleUrls: ['./create-clients.component.scss'],
})
export class CreateClientsComponent implements OnInit {
  selectedClient?: User;

  // operation = 'add' ;

  editClient = this.fb.group({
    iduser: '',
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: '',
  });

  constructor(
    private clientService: ClientService,
    private router: ActivatedRoute,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loadroutedata();
  }

  loadroutedata(): void {
    this.router.data.subscribe(({ sp2 }) => {
      if (sp2) {
        this.selectedClient = sp2;
        if (this.selectedClient?.iduser === undefined) {
          console.log('create product');
        }
        this.updateForm(sp2);
      }
    });
  }

  updateForm(ps: any): void {
    this.editClient.patchValue({
      iduser: ps.iduser,
      username: ps.username,
      email: ps.email,
      phone: ps.phone,
    });
  }

  updateData(client: User): void {
    client.iduser = this.editClient.get('iduser')!.value;
    client.username = this.editClient.get('username')!.value;
    client.email = this.editClient.get('email')!.value;
    client.phone = this.editClient.get('phone')!.value;
  }

  actionClick(): void {
    this.selectedClient = new User();
    this.updateData(this.selectedClient);
    if (this.selectedClient?.iduser !== undefined) {
      this.clientService.updateUser(this.selectedClient).subscribe(
        data => {
          console.log('sucessfull updtate !');
          this.route.navigate(['/clients']);
        },
        error => {
          console.log('fail to update');
        }
      );
    } else {
      this.clientService
        .addUser({
          iduser: this.editClient.get('iduser')!.value,
          username: this.editClient.get('username')!.value,
          email: this.editClient.get('email')!.value,
          phone: this.editClient.get('phone')!.value,
        })
        .subscribe(
          () => {
            this.route.navigate(['/clients']);

            console.log('sucessfull update !');
          },
          () => {
            console.log('fail to update');
          }
        );
    }
  }
}
