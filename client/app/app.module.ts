import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { customHttpProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { LocationsComponent } from './locations/index';
import { UnitsComponent } from './units/index';
import { TenantsComponent } from './tenants/index';
import { LeasesComponent } from './leases/index';
import { PaymentsComponent } from './payments/index';
import { MaintenanceComponent } from './maintenance/index';
import { BillsComponent } from './bills/index';
import { ReportsComponent } from './reports/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        LocationsComponent,
        UnitsComponent,
        TenantsComponent,
        LeasesComponent,
        PaymentsComponent,
        MaintenanceComponent,
        BillsComponent,
        ReportsComponent,
    ],
    providers: [
        customHttpProvider,
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }