import { Component } from '@angular/core';
import {SnapshotService} from './services/snapshot.service';
import {ProfileService} from './services/profile.service';
import {HttpClient} from './services/http-client';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [SnapshotService,
             ProfileService,
             HttpClient
  ]
})
export class AppComponent  { name = 'Angular'; }
