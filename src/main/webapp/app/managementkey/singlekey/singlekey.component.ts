import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestiondecleService } from 'app/Service/gestiondecle.service';

@Component({
  selector: 'jhi-singlekey',
  templateUrl: './singlekey.component.html',
  styleUrls: ['./singlekey.component.scss'],
})
export class SinglekeyComponent implements OnInit {
  modelmanagekey: any;

  constructor(private router: ActivatedRoute, private gestiondecleService: GestiondecleService, private route: Router) {}

  ngOnInit(): void {
    this.loadalldetailkey();
  }

  loadalldetailkey(): void {
    const id = this.router.snapshot.params['id'];
    this.gestiondecleService.getDataById(id).subscribe(
      data => {
        this.modelmanagekey = data;
      },
      () => {
        console.log('error to retrieve key infos');
      },
      () => {
        console.log('Succesful to retrieve key infos');
      }
    );
  }

  onBack(): void {
    this.route.navigate(['/manage-key']);
  }
}
