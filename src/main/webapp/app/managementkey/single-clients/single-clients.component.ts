import { Component, OnInit } from '@angular/core';
import { Client } from 'app/shared/model/client.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'app/Service/client.service';

@Component({
  selector: 'jhi-single-clients',
  templateUrl: './single-clients.component.html',
  styleUrls: ['./single-clients.component.scss'],
})
export class SingleClientsComponent implements OnInit {
  client?: Client;

  constructor(private router: ActivatedRoute, private clientService: ClientService, private route: Router) {}

  ngOnInit(): void {
    // @ts-ignore
    this.client = new Client('', '', '', '', '');
    const id = this.router.snapshot.params['id'];
    this.clientService.getUserById(id).subscribe((clt: Client) => {
      this.client = clt;
    });
  }
  onBack(): void {
    this.route.navigate(['/clients']);
  }
}
