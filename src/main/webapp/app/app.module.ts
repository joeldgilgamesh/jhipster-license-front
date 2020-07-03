import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { GatewaySharedModule } from 'app/shared/shared.module';
import { GatewayCoreModule } from 'app/core/core.module';
import { GatewayAppRoutingModule } from './app-routing.module';
import { GatewayHomeModule } from './home/home.module';
import { GatewayEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { ManagementkeyModule } from 'app/managementkey/managementkey.module';
import { ProductServiceComponent } from 'app/managementkey/product-service/product-service.component';
import { TestConnexionComponent } from 'app/managementkey/test-connexion/test-connexion.component';

@NgModule({
  imports: [
    BrowserModule,
    GatewaySharedModule,
    GatewayCoreModule,
    ManagementkeyModule,
    GatewayHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    GatewayEntityModule,
    GatewayAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
  exports: [PageRibbonComponent, FooterComponent],
})
export class GatewayAppModule {}
