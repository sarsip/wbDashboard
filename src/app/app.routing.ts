import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {MainComponent} from './components/main/main.component';
import {ProfileComponent} from './components/profile/profile.component';


const appRoutes: Routes = [
    {
        path:'',
        component:MainComponent
    },
    {
        path:'profile',
        component:ProfileComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);