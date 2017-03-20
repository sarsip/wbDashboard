import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { Entry } from '../../models/Entry';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'history',
    templateUrl: `history.component.html`,
})
export class HistoryComponent implements OnInit {
    entries: Entry[];
    constructor(private _historyService: HistoryService, private _route: ActivatedRoute) {

    }

    ngOnInit() {
        this._route.params
            .map(params => params['residentId'])
            .subscribe(id => {
                if (id != null && id.length > 0) {
                    this._historyService.getHistory(id)
                        .subscribe(xyz => {
                            this.entries = xyz;

                        });
                } 
            });
    }
}







