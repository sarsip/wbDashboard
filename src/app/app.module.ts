import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MainComponent} from './components/main/main.component';
import {ProfileComponent} from './components/profile/profile.component';
import {FormsModule} from '@angular/forms';
import {DatepickerModule} from 'ng2-bootstrap';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {routing} from './app.routing';
import {HttpModule} from '@angular/http';


@NgModule({
  imports:      [ BrowserModule
                , routing
                , HttpModule 
                ,FormsModule
                , DatepickerModule.forRoot()              
                ],
  declarations: [ AppComponent,
                  NavbarComponent,
                  MainComponent,
                  ProfileComponent
                 ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);