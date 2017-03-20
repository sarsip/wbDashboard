import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import {HttpClient} from './http-client';

@Injectable()
export class ProfileService{

    private profileUrl:string;

    private profileListUrl : string;

    private http:HttpClient;

    private hostAndPort:string = "localhost:6969";

    constructor(http: HttpClient){
        this.http = http;
        console.log('Profile Service Created');
    }


    getProfile(id:string){
        var url = 'http://'+this.hostAndPort + '/api/profile/' + id;
        return this.http.get(url).map(res=>res.json());
    }


    updateProfile(data:any){
        
        console.log("updateProfile: "   + JSON.stringify(data));

        var url = 'http://'+this.hostAndPort + '/api/profile/' + data.id;
             return this.http.put(url, JSON.stringify(data)).subscribe(result => {
            console.log(result);
        });
    }

    createProfile(data:any){
        this.profileUrl  = 'http://'+this.hostAndPort+'/api/profile';

      
        return this.http.post(this.profileUrl, JSON.stringify(data)).subscribe(result => {
            console.log(result);
        });
        
    }

    listProfile(){
        this.profileListUrl =   'http://'+this.hostAndPort+'/api/profiles';
         return this.http.get(this.profileListUrl).map(res=>res.json());
    }

}