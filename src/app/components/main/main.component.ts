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

        // this.socket = io('http://10.152.152.127:8090',  {reconnection: true});
         this.socket = io('http://localhost:8090',  {reconnection: true});
    }

    entries: Entry[];

    immediateAttention:number;
    hrAlert:number;
    normalCount:number;
    batteryReplaceCount:number;
    batteryThreshold:number;

    ngOnInit()
    {

	   this.batteryThreshold  = 95;
	   this.immediateAttention = 0;
	   this.hrAlert = 0;
           this.normalCount = 0;
           this.batteryReplaceCount  = 0;
           this._snapshotService.getSnapshot()
           .subscribe(entry => {this.entries = entry; 

            var j:number;
            for(j=0;j<this.entries.length; j++){
                this.getHRStyle(this.entries[j]);
                
                if(this.entries[j].o2_sat_percent!=null)
                    this.getO2Style(this.entries[j]);

                this.entries[j].water_datetime = this.formatDate(this.entries[j].water_datetime);
                this.entries[j].med_datetime = this.formatDate(this.entries[j].med_datetime);
                this.entries[j].init = true;
                this.entries[j].status = "OK";
                this.entries[j].status = this.getStatus(this.entries[j]);
                this.entries[j].fall = null;

                console.log(this.entries[j].status);

		if(this.entries[j].fall!=null && +this.entries[j].fall > 0 ){
			this.immediateAttention += 1;
                }	

		if (this.entries[j].status == "Danger"|| this.entries[j].status == "Warn")
		{
			this.hrAlert += 1;
		}
		else
		{
			this.normalCount +=1;
		}

		if(this.entries[j].batt_percent!= null && this.entries[j].batt_percent< this.batteryThreshold)
		{
                        this.batteryReplaceCount += 1;
		}
		
		
            }
            
     
           
           } );

           this.socket.on("connect", function(){
                console.log("connected ");
           });

           this.socket.on("update", (data:any)=>{
             
                 console.log(data.new_val);
                var i:Entry;
                var found:boolean = false;
                for ( i of this.entries){
                    if(i.residentId == data.new_val.residentId)
                    {
                        console.log('matched');
                        found = true;
			
                    if(data.new_val.hr!=null){
                        i.hr = data.new_val.hr;
                        i.hr_class  = this.getHRStyle(i);
                    }

                    if(data.new_val.batt_percent!=null)
                        i.batt_percent = data.new_val.batt_percent;
                    if(data.new_val.step!=null)
                        i.step = data.new_val.step;
                    if(data.new_val.floors!=null)
                        i.floors = data.new_val.floors;
                    if(data.new_val.floors_asc!=null)
                        i.floors_asc = data.new_val.floors_asc;
                    if(data.new_val.floors_desc!=null)
                        i.floors_desc = data.new_val.floors_desc;

                    if(data.new_val.o2_sat_percent!=null) {
                        i.o2_sat_percent = data.new_val.o2_sat_percent;
                        i.oxygen_class  = this.getO2Style(i);
                    }

                    if(data.new_val.water_datetime!=null)
                        i.water_datetime = this.formatDate(data.new_val.water_datetime);
                    if(data.new_val.water_intake_ml!=null)
                        i.water_intake_ml = data.new_val.water_intake_ml;
                    if(data.new_val.med_datetime!=null)
                        i.med_datetime = this.formatDate(data.new_val.med_datetime);
                    if(data.new_val.sleep!=null)
                        i.sleep = data.new_val.sleep
                    if(data.new_val.fall!=null)
                        i.fall = data.new_val.fall;
                        i.init = false;

                        i.status = this.getStatus(i);

                    	i.name = data.new_val.name;

                        console.log(i);
                    }
                }
                if(!found){
                    var entry = new Entry();
                    entry.name = data.new_val.name;
                    if(data.new_val.hr!=null){
                        entry.hr = data.new_val.hr;
                        entry.hr_class  = this.getHRStyle(entry);
                        }

                    if(data.new_val.batt_percent!=null)
                        entry.batt_percent = data.new_val.batt_percent;
                    if(data.new_val.step!=null)
                        entry.step = data.new_val.step;
                   
                    if(data.new_val.floors!=null)
                        entry.floors = data.new_val.floors;
                    else
                        entry.floors = 0;

                    if(data.new_val.floors_asc!=null)
                        entry.floors_asc = data.new_val.floors_asc;
                    else   
                        entry.floors_asc  = 0 ;

                    if(data.new_val.floors_desc!=null)
                        entry.floors_desc = data.new_val.floors_desc;
                    else 
                        entry.floors_desc = 0;

                    if(data.new_val.o2_sat_percent!=null) {
                        entry.o2_sat_percent = data.new_val.o2_sat_percent;
                        entry.oxygen_class  = this.getO2Style(entry);
                    }

                    if(data.new_val.water_datetime!=null)
                        entry.water_datetime = this.formatDate(data.new_val.water_datetime);
                    if(data.new_val.water_intake_ml!=null)
                        entry.water_intake_ml = data.new_val.water_intake_ml;
                    else
                        entry.water_intake_ml = 0;
                    if(data.new_val.med_datetime!=null)
                        entry.med_datetime = this.formatDate(data.new_val.med_datetime);
                    if(data.new_val.sleep!=null)
                        entry.sleep = data.new_val.sleep
                    if(data.new_val.fall!=null)
                        entry.fall = data.new_val.fall;
                        entry.init = false;

                        entry.status = this.getStatus(entry);
                        entry.residentId = data.new_val.residentId;
                        this.entries.push(entry);
                        console.log(entry);
                }

		this.refreshWidgets();
           });

           
    }


	refreshWidgets() {
		if(this.entries == null ) return;
	
		   this.immediateAttention = 0;
		   this.hrAlert = 0;
		   this.normalCount = 0;
		   this.batteryReplaceCount  = 0;

		for (var e of this.entries){
                        e.hr_class  = this.getHRStyle(e);
			if(e.fall!=null && +e.fall >0 ){
				this.immediateAttention += 1;
			}					

			console.log(e.hr_class);
			if (e.hr_class == "DANGER"|| e.hr_class == "WARN")
			{
				this.hrAlert += 1;
			}
			else
			{
				this.normalCount +=1;
			}

			if(e.batt_percent!= null && e.batt_percent< this.batteryThreshold)
			{
				this.batteryReplaceCount += 1;
			}
	
		}
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
        if(e.o2_sat_percent==null) return "";
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
        if(e.hr==null)return "";
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


