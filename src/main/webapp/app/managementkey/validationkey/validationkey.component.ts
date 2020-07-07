import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestiondecleService } from 'app/Service/gestiondecle.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-validationkey',
  templateUrl: './validationkey.component.html',
  styleUrls: ['./validationkey.component.scss'],
})
export class ValidationkeyComponent implements OnInit {
  editvaladationkey = this.fb.group({
    key1: ['', Validators.required],
    key2: ['', Validators.required],
    key3: ['', Validators.required],
    key4: ['', Validators.required],
  });

  constructor(private route: Router, private gestiondecleService: GestiondecleService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  validationkey(): void {
    const k = this.editvaladationkey.value;
    this.gestiondecleService.verificationkey(k).subscribe(
      data => {
        console.log(JSON.stringify(data));
      },
      error => {
        console.log('fail to send key' + error);
        console.log(JSON.stringify(k));
      }
    );
  }
}
