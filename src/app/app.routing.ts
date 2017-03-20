import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileListComponent } from './components/profileList/profileList.component';
import { AboutComponent } from './components/about/about.component';
import {BatteryComponent} from './components/battery/battery.component';
import {HistoryComponent} from './components/history/history.component';

const appRoutes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
    , {
        path: 'profile/:residentId',
        component: ProfileComponent
    }
    , {
        path: 'profiles',
        component: ProfileListComponent
    }
    , {
        path: 'about',
        component: AboutComponent
    }
    , {
        path: 'battery',
        component: BatteryComponent
    }
    , {
        path: 'history/:residentId',
        component: HistoryComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);