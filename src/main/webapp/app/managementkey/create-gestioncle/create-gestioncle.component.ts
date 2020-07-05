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
    id: '',
    keyactivation: '',
    username: ['', Validators.required],
    productname: ['', Validators.required],
    nbreposte: ['', Validators.required],
    nbreinstanceon: ['', Validators.required],
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
        if (this.selectedmodelmanagekey?.id === undefined) {
          console.log('create key succesful');
        }
        this.updateForm(sp3);
      }
    });
  }

  updateForm(ps: any): void {
    this.editgestioncle.patchValue({
      id: ps.id,
      username: ps.username,
      keyactivation: ps.keyactivation,
      productname: ps.productname,
      nbreposte: ps.nbreposte,
      nbreinstanceon: ps.nbreinstanceon,
    });
  }

  updateData(modelgeskey: Modelmanegekey | undefined): void {
    // @ts-ignore
    modelgeskey.id = this.editgestioncle.get('id')!.value;
    // @ts-ignore
    modelgeskey.keyactivation = this.editgestioncle.get('keyactivation')!.value;
    // @ts-ignore
    modelgeskey.username = this.editgestioncle.get('username')!.value;
    // @ts-ignore
    modelgeskey.productname = this.editgestioncle.get('productname')!.value;
    // @ts-ignore
    modelgeskey.nbreposte = this.editgestioncle.get('nbrePoste')!.value;
    // @ts-ignore
    modelgeskey.nbreinstanceon = this.editgestioncle.get('nbreinstanceOn')!.value;
  }

  actionClick(): void {
    this.selectedmodelmanagekey = new Modelmanegekey();
    this.updateData(this.selectedmodelmanagekey);
    if (this.selectedmodelmanagekey?.id !== undefined) {
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
          id: this.editgestioncle.get('id')!.value,
          keyactivation: this.editgestioncle.get('keyactivation')!.value,
          username: this.editgestioncle.get(' username')!.value,
          productname: this.editgestioncle.get('productname')!.value,
          nbreposte: this.editgestioncle.get(' nbreposte')!.value,
          nbreinstanceon: this.editgestioncle.get('nbreinstanceon')!.value,
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
