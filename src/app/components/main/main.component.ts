import { Component , OnInit} from '@angular/core';
import {SnapshotService} from '../../services/snapshot.service';

import {Entry} from '../../models/Entry';

@Component({
    moduleId: module.id,
    selector: 'main',
    templateUrl: `main.component.html`,
})
export class MainComponent implements OnInit { 
    
    constructor(private _snapshotService: SnapshotService){

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

           
    }
    
    
    
    /// Old code below
    i:number = 0;
    getNumber = function()
    {
        return this.i++;
    }
}
