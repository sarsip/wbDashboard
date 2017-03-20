import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/Profile';


@Component({
    moduleId: module.id,
    selector: 'profileList',
    templateUrl: `profileList.component.html`,
})
export class ProfileListComponent implements OnInit  {


    profiles: Profile[];

  constructor(private _profileService: ProfileService){

  }


 ngOnInit()
    {
           this._profileService.listProfile()
           .subscribe(entry => {this.profiles = entry; 


            
            for(var x of this.profiles)
            {
                this.calculateAge(x);
                x.dobStr = this.formatDate(x.dob.toString());
            }
           

        } );
    }

    calculateAge(p:Profile){
        var now = Date.now();
        var then = new Date(p.dob).getTime();
        console.log('then: ' + then);
        console.log('now: ' + now);

        var ageDate = new Date(then-now);

        var age =Math.abs(ageDate.getUTCFullYear()-1970);
        age = age -1;  
        console.log(age);
        p.age = age;

    }

   formatDate(str:string){
        if(str==null) return "";

        var date = new Date(str);
        var day = date.getDate();
        var month = date.getMonth()+1;
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var second = date.getSeconds();

        return day+"-"+month+"-"+year;
    }
}