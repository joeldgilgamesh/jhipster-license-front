import { Component, OnInit } from '@angular/core';
import { Modelmanegekey } from 'app/model/modelmanegekey';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GestiondecleService } from 'app/Service/gestiondecle.service';

@Component({
  selector: 'jhi-create-gestioncle',
  templateUrl: './create-gestioncle.component.html',
  styleUrls: ['./create-gestioncle.component.scss'],
})
export class CreateGestioncleComponent implements OnInit {
  selectedmodelmanagekey?: Modelmanegekey;

  editgestioncle = this.fb.group({
    username: ['', Validators.required],
    idproduct: ['', Validators.required],
    productname: ['', Validators.required],
    nbrePoste: ['', Validators.required],
    nbreinstanceOn: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private httpClient: HttpClient,
    private route: Router,
    private gestiondecleService: GestiondecleService
  ) {}

  ngOnInit(): void {
    this.router.data.subscribe(({ sp3 }) => {
      if (sp3) {
        this.selectedmodelmanagekey = sp3;
        if (this.selectedmodelmanagekey?.activationkey === undefined) {
          console.log('create key succesful');
        }
        this.updateForm(sp3);
      }
    });
  }

  updateForm(ps: any): void {
    this.editgestioncle.patchValue({
      username: ps.username,
      activationkey: ps.activationkey,
      productname: ps.productname,
      nbrePoste: ps.activationnumber,
      nbreinstanceOn: ps.nbreinstanceOn,
    });
  }

  updateData(modelgeskey: Modelmanegekey): void {
    modelgeskey.activationkey = this.editgestioncle.get(' activation_key')!.value;
    modelgeskey.username = this.editgestioncle.get('user_name')!.value;
    modelgeskey.productname = this.editgestioncle.get('product_name')!.value;
    modelgeskey.nbrePoste = this.editgestioncle.get('nbrePoste')!.value;
    modelgeskey.nbreinstanceOn = this.editgestioncle.get('nbreinstanceOn')!.value;
  }

  actionClick(): void {
    this.selectedmodelmanagekey = new Modelmanegekey();
    this.updateData(this.selectedmodelmanagekey);
    if (this.selectedmodelmanagekey?.activationkey !== undefined) {
      this.gestiondecleService.updateDatagestion(this.selectedmodelmanagekey).subscribe(
        data => {
          console.log('sucessfull updtate !');
          this.route.navigate(['/manage-key']);
        },
        error => {
          console.log('fail to update');
        }
      );
    } else {
      this.gestiondecleService
        .addDatagestion({
          activationkey: this.editgestioncle.get('activation_key')!.value,
          username: this.editgestioncle.get(' user_name')!.value,
          productname: this.editgestioncle.get('product_name')!.value,
          nbrePoste: this.editgestioncle.get(' nbrePoste')!.value,
          nbreinstanceOn: this.editgestioncle.get('nbreinstanceOn')!.value,
        })
        .subscribe(
          data => {
            console.log('sucessfull add !');
            this.route.navigate(['/manage-key']);
          },
          error => {
            console.log('fail to save');
          }
        );
    }
  }
}
