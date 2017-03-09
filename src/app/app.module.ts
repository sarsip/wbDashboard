import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MainComponent} from './components/main/main.component';


import {routing} from './app.routing';
import {HttpModule} from '@angular/http';


@NgModule({
  imports:      [ BrowserModule, routing, HttpModule ],
  declarations: [ AppComponent,
                  NavbarComponent,
                  MainComponent
                 ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
