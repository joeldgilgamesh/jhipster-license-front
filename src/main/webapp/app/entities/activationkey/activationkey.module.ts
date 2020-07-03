import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ActivationkeyComponent } from './activationkey.component';
import { ActivationkeyDetailComponent } from './activationkey-detail.component';
import { ActivationkeyUpdateComponent } from './activationkey-update.component';
import { ActivationkeyDeleteDialogComponent } from './activationkey-delete-dialog.component';
import { activationkeyRoute } from './activationkey.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(activationkeyRoute)],
  declarations: [ActivationkeyComponent, ActivationkeyDetailComponent, ActivationkeyUpdateComponent, ActivationkeyDeleteDialogComponent],
  entryComponents: [ActivationkeyDeleteDialogComponent],
})
export class GatewayActivationkeyModule {}
