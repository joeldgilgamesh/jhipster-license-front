import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients/clients.component';
import { CreateClientsComponent } from './create-clients/create-clients.component';
import { DemandecleComponent } from './demandecle/demandecle.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SingleClientsComponent } from './single-clients/single-clients.component';
import { ProductServiceComponent } from './product-service/product-service.component';
import { CreateProductServiceComponent } from './create-product-service/create-product-service.component';
import { NavabarComponent } from './navabar/navabar.component';
import { CreateGestioncleComponent } from './create-gestioncle/create-gestioncle.component';
import { GestioncleComponent } from './gestioncle/gestioncle.component';
import { RouterModule } from '@angular/router';
import { GatewayAppModule } from 'app/app.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TestConnexionComponent } from './test-connexion/test-connexion.component';
import { SinglekeyComponent } from './singlekey/singlekey.component';
import { ValidationkeyComponent } from './validationkey/validationkey.component';

@NgModule({
  declarations: [
    ClientsComponent,
    CreateClientsComponent,
    DemandecleComponent,
    SignInComponent,
    PageNotFoundComponent,
    SingleClientsComponent,
    ProductServiceComponent,
    CreateProductServiceComponent,
    NavabarComponent,
    CreateGestioncleComponent,
    GestioncleComponent,
    TestConnexionComponent,
    SinglekeyComponent,
    ValidationkeyComponent,
  ],
  exports: [NavabarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    // GatewayAppModule
  ],
})
export class ManagementkeyModule {}
