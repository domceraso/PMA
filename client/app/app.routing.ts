import { Routes, RouterModule } from '@angular/router';

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
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'locations', component: LocationsComponent, canActivate: [AuthGuard] },
    { path: 'units', component: UnitsComponent, canActivate: [AuthGuard] },
    { path: 'tenants', component: TenantsComponent, canActivate: [AuthGuard] },
    { path: 'leases', component: LeasesComponent, canActivate: [AuthGuard] },
    { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard] },
    { path: 'maintenance', component: MaintenanceComponent, canActivate: [AuthGuard] },
    { path: 'bills', component: BillsComponent, canActivate: [AuthGuard] },
    { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);