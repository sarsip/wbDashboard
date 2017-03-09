import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SnapshotService{

    private snapshotURL:string;

    constructor(private _http:Http){
    }

    getSnapshot(){
        this.snapshotURL  = 'http://localhost:6969/api/snapshot';
        return this._http.get(this.snapshotURL).map(res=>res.json());
    }

}