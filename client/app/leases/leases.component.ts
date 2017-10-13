import { Component, OnInit } from '@angular/core';
import { propOwners } from '../_models/index';
import { propOwnerService } from '../_services';

@Component({
    moduleId: module.id,
    templateUrl: 'leases.component.html'
})

export class LeasesComponent implements OnInit {
   lease: Lease;
   lease: Leases[] = [];
}