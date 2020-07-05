import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'app/Service/client.service';
import { User } from 'app/model/user';

@Component({
  selector: 'jhi-single-clients',
  templateUrl: './single-clients.component.html',
  styleUrls: ['./single-clients.component.scss'],
})
export class SingleClientsComponent implements OnInit {
  client?: any;

  constructor(private router: ActivatedRoute, private clientService: ClientService, private route: Router) {}

  ngOnInit(): void {
    this.loaddetailclient();
  }

  loaddetailclient(): void {
    // @ts-ignore
    //this.client = new Client('', '', '', '', '');
    const id = this.router.snapshot.params['id'];
    this.clientService.getUserById(id).subscribe(
      data => {
        this.client = data;
        console.log('voici la liste de clients recuperer');
        console.log(this.client);
      },
      error => {
        console.log('Une erreur est survenus. !!');
      },
      () => {
        console.log('chargement Clint reussis...');
      }
    );
    /* this.clientService.getUserById(id).subscribe(
      (clt: Client) => {
      this.client = clt;
      console.log('voici la liste de clients recuperer');
      console.log(this.client);
    });*/
  }

  onBack(): void {
    this.route.navigate(['/clients']);
  }
}
