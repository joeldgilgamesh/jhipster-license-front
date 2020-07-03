import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ProductserviceComponent } from './productservice.component';
import { ProductserviceDetailComponent } from './productservice-detail.component';
import { ProductserviceUpdateComponent } from './productservice-update.component';
import { ProductserviceDeleteDialogComponent } from './productservice-delete-dialog.component';
import { productserviceRoute } from './productservice.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(productserviceRoute)],
  declarations: [
    ProductserviceComponent,
    ProductserviceDetailComponent,
    ProductserviceUpdateComponent,
    ProductserviceDeleteDialogComponent,
  ],
  entryComponents: [ProductserviceDeleteDialogComponent],
})
export class GatewayProductserviceModule {}
