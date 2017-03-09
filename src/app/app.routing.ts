import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {MainComponent} from './components/main/main.component';

const appRoutes: Routes = [
    {
        path:'',
        component:MainComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);