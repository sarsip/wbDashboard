import { Component, Input } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { HttpClient } from '../../services/http-client';
import { Profile } from '../../models/Profile';

import { DatepickerModule } from 'ng2-bootstrap';
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'profile',
    templateUrl: `profile.component.html`,
})
export class ProfileComponent {

    prof: Profile;

    dob: Date;

    constructor(private _profileService: ProfileService) {
        this.prof = new Profile();
        this.prof.firstNameEng = "";
        this.prof.lastNameEng = "";
        this.prof.firstNameOther = "";
        this.prof.lastNameOther = "";
        this.prof.device = "";
        this.prof.residentId = "";
    }


    setDob() {

        this.prof.dob = this.dob;
        console.log(this.prof);
    }

    postForm() {
        console.log(this.dob);
        this._profileService.createProfile(this.prof);
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
