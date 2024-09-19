import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path: '', component: LoginComponent, pathMatch: 'full'
    },
    {
        path: 'login', component: LoginComponent, pathMatch: 'full'
    },
    {
        path:'layout',
        component: LayoutComponent,
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: ''
    }
];
