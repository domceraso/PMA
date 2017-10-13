import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { propOwners } from '../_models/index';

@Injectable()
export class propOwnerService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/owners').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/owners' + _id).map((response: Response) => response.json());
    }
    
    update(user: propOwner) {
        return this.http.put('/owners' + propOwner.bizName, propOwners);
    }

    delete(_id: string) {
        return this.http.delete('/owners' + _id);
    }
}