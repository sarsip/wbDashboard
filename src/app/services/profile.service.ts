import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import {HttpClient} from './http-client';

@Injectable()
export class ProfileService{

    private profileUrl:string;

    private http:HttpClient;

    constructor(http: HttpClient){
        this.http = http;
        console.log('Profile Service Created');
    }



    createProfile(data:any){
        this.profileUrl  = 'http://localhost:6969/api/profile';

      
        return this.http.post(this.profileUrl, JSON.stringify(data)).subscribe(result => {
            console.log(result);
        });
        
    }

}