import { Component } from '@angular/core';
import {SnapshotService} from './services/snapshot.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [SnapshotService]
})
export class AppComponent  { name = 'Angular'; }
