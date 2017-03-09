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

        this.socket = io('http://localhost:8090');
    }

    entries: Entry[];

    ngOnInit()
    {
           this._snapshotService.getSnapshot()
           .subscribe(entry => {this.entries = entry; 

            var j:number;
            for(j=0;j<this.entries.length; j++)
            console.log(this.entries[j].name);
            console.log(this.entries[0].med_datetime);
           
           } );

           this.socket.on("connect", function(){
                console.log("connected ");
           });

           this.socket.on("update", (data:any)=>{
             
                // console.log(data.new_val);
                var i;
                for ( i of this.entries){
                    if(i.residentId == data.new_val.residentId)
                    {
                        console.log('matched');
                        i.hr = data.new_val.hr;
                        i.batt_percent = data.new_val.batt_percent;
                        i.step = data.new_val.step;
                    }
                }
           });

           
    }
    
    
    
    /// Old code below
    i:number = 0;
    getNumber = function()
    {
        return this.i++;
    }
}
