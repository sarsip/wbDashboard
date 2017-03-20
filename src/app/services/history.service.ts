import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { HttpClient } from './http-client';
@Injectable()
export class HistoryService {

    private http: HttpClient;

    private hostAndPort: string = "localhost:6969";

    constructor(http: HttpClient) {
        this.http = http;
        console.log('History Service Created');
    }

   getHistory(id:string){
        var url = 'http://'+this.hostAndPort + '/api/history/' + id;
        return this.http.get(url).map(res=>res.json());
    }

}