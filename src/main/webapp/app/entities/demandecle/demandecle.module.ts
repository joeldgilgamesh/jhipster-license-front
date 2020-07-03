import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { DemandecleComponent } from './demandecle.component';
import { DemandecleDetailComponent } from './demandecle-detail.component';
import { DemandecleUpdateComponent } from './demandecle-update.component';
import { DemandecleDeleteDialogComponent } from './demandecle-delete-dialog.component';
import { demandecleRoute } from './demandecle.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(demandecleRoute)],
  declarations: [DemandecleComponent, DemandecleDetailComponent, DemandecleUpdateComponent, DemandecleDeleteDialogComponent],
  entryComponents: [DemandecleDeleteDialogComponent],
})
export class GatewayDemandecleModule {}
