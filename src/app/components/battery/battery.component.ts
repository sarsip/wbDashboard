import { Component, OnInit } from '@angular/core';
import { SnapshotService } from '../../services/snapshot.service';
import { Entry } from '../../models/Entry';

@Component({
    moduleId: module.id,
    selector: 'battery',
    templateUrl: `battery.component.html`,
})
export class BatteryComponent implements OnInit {

    entries: Entry[];
    constructor(private _snapshotService: SnapshotService) {

    }

    ngOnInit() {
        this._snapshotService.getSnapshot()
            .subscribe(entry => {
                this.entries = entry;
                var j: number;
                for (j = 0; j < this.entries.length; j++) {

                    this.entries[j].init = true;
                    this.entries[j].status = "OK";

                    this.entries[j].fall = null;

                    console.log(this.entries[j].status);
                }
            });
    }
}
