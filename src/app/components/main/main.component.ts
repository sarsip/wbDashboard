import * as io from "socket.io-client";
import { Component , OnInit} from '@angular/core';
import {SnapshotService} from '../../services/snapshot.service';

import {Entry} from '../../models/Entry';



@Component({
    moduleId: module.id,
    selector: 'main',
    templateUrl: `main.component.html`,
})
export class MainComponent implements OnInit { 
    socket:any = null;


    constructor(private _snapshotService: SnapshotService){

        this.socket = io('http://localhost:8090',  {reconnection: true});
    }

    entries: Entry[];

    ngOnInit()
    {
           this._snapshotService.getSnapshot()
           .subscribe(entry => {this.entries = entry; 

            var j:number;
            for(j=0;j<this.entries.length; j++){
                this.getHRStyle(this.entries[j]);
                this.getO2Style(this.entries[j]);
                this.entries[j].water_datetime = this.formatDate(this.entries[j].water_datetime);
                this.entries[j].med_datetime = this.formatDate(this.entries[j].med_datetime);
                this.entries[j].init = true;
                this.entries[j].status = "OK";
                this.entries[j].status = this.getStatus(this.entries[j]);
                console.log(this.entries[j].name);
            }
            
     
           
           } );

           this.socket.on("connect", function(){
                console.log("connected ");
           });

           this.socket.on("update", (data:any)=>{
             
                // console.log(data.new_val);
                var i:Entry;
                for ( i of this.entries){
                    if(i.residentId == data.new_val.residentId)
                    {
                        console.log('matched');
                        i.hr = data.new_val.hr;
                        i.hr_class  = this.getHRStyle(i);

                        i.batt_percent = data.new_val.batt_percent;
                        i.step = data.new_val.step;
                        i.floors = data.new_val.floors;
                        i.floors_asc = data.new_val.floors_asc;
                        i.floors_desc = data.new_val.floors_desc;

                        i.o2_sat_percent = data.new_val.o2_sat_percent;
                        i.oxygen_class  = this.getO2Style(i);

                        i.water_datetime = this.formatDate(data.new_val.water_datetime);
                        i.water_intake_ml = data.new_val.water_intake_ml;
                        i.med_datetime = this.formatDate(data.new_val.med_datetime);
                        i.sleep = data.new_val.sleep
                        i.fall = data.new_val.fall;
                        i.init = false;

                        i.status = this.getStatus(i);

                    }
                }
           });

           
    }
    
    formatDate(str:string){
        var date = new Date(str);
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var second = date.getSeconds();

        return year+"-"+month+"-"+day+" "+hours+":"+minutes;
    }
    
    /// Old code below
    i:number = 0;
    getNumber = function()
    {
        return this.i++;
    }


    getStatus(e:Entry)
    {
        var _fall:number;
        _fall = +e.fall;
        if(_fall>0){
            return "Danger";
        }

        var _O2Status:string;
        _O2Status = this.getO2Style(e);
        
        var _HRstatus:string;
        _HRstatus = this.getHRStyle(e);

        if(_O2Status=="DANGER" || _HRstatus == "DANGER"){
            return "Danger";
        }

        if(_O2Status=="WARN" || _HRstatus == "WARN"){
            return "Warn";
        }

        return "OK";

    }    


    getO2Style(e:Entry){
        console.log("checking O2: " +e.o2_sat_percent);
        if(e.o2_sat_percent<90){
            return "DANGER";
        }
        else if(e.o2_sat_percent <= 92){
            return "WARN";
        }
        else
            return "SUCCESS";
    }

    getHRStyle(e:Entry)
    {
        console.log("checking HR: " +e.hr);
        if(e.hr<=30){
        return "DANGER";
        }
         else if (e.hr<=60){
                return "WARN";
        }
        else if (e.hr<=110){
                return "SUCCESS";
        }
        else if (e.hr<130) {
                return "WARN";
        }
        else{
               return "DANGER";
        }

    }



    
   
}


