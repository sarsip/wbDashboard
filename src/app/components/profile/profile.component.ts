import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { HttpClient } from '../../services/http-client';
import { Profile } from '../../models/Profile';
import { Router, ActivatedRoute } from '@angular/router';

import { DatepickerModule } from 'ng2-bootstrap';
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'profile',
    templateUrl: `profile.component.html`,
})
export class ProfileComponent implements OnInit {

    prof: Profile;

    temp: Profile;

    dob: Date;
    day:number;
    month:number;
    year:number;

    months = [
            ['Jan', 0],
            ['Feb', 1],
            ['Mar', 2],
            ['Apr', 3],
            ['May', 4],
            ['Jun', 5],
            ['Jul', 6],
            ['Aug', 7],
            ['Sep', 8],
            ['Oct', 9],
            ['Nov', 10],
            ['Dec', 11]
                ];

    ngOnInit() {
        this._route.params
            .map(params => params['residentId'])
            .subscribe(id => {
                if (id != null && id.length > 0) {
                    this._profileService.getProfile(id)
                        .subscribe(xyz => {
                            this.prof = xyz[0];
                            this.formatDate();
                        });
                    console.log('yes');
                } /*else {

                    this.prof = new Profile();
                    this.prof.firstNameEng = "";
                    this.prof.lastNameEng = "";
                    this.prof.firstNameOther = "";
                    this.prof.lastNameOther = "";
                    this.prof.device = "";
                    this.prof.residentId = "";
                    console.log('no');
                }*/
            });
    }

    constructor(private _profileService: ProfileService, private _route: ActivatedRoute) {

        this.prof = new Profile();
        this.prof.firstNameEng = "";
        this.prof.lastNameEng = "";
        this.prof.firstNameOther = "";
        this.prof.lastNameOther = "";
        this.prof.device = "";
        this.prof.residentId = "";
        // this.day=0;
        // this.m=0;
        // this.y=0;
    }

    formatDate(){
        var d = new Date(this.prof.dob);
        this.year = d.getFullYear();
        this.month = d.getMonth();
        this.day  = d.getDate();
    }


    setDob() {

        this.dob = new Date();
        this.dob.setFullYear(this.year);
        this.dob.setMonth(this.month);
        this.dob.setDate(this.day);
        this.prof.dob = this.dob;
        // console.log(this.prof);
    }




    postForm() {
        this.setDob();

        // console.log(this.prof);

        var result = this._profileService.createProfile(this.prof);

        console.log(result);
    }

    updateForm(){
        this.setDob();

        console.log(this.prof);
        this._profileService.updateProfile(this.prof);
    }

    engName() {
        if (this.prof.firstNameEng.trim().length < 1 || this.prof.lastNameEng.trim().length < 1) {
            return;
        }
        this.prof.displayName = this.prof.firstNameEng.trim() + " " + this.prof.lastNameEng.trim();
    }

    otherName() {
        if (this.prof.firstNameOther.trim().length < 1 || this.prof.lastNameOther.trim().length < 1) {
            return;
        }
        this.prof.displayName = this.prof.lastNameOther.trim() + this.prof.firstNameOther.trim();
    }

}
