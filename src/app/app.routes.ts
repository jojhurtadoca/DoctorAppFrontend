import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
    {
        path: '', component: LoginComponent, pathMatch: 'full'
    },
    {
        path:'layout',
        component: LayoutComponent,
        loadChildren: () => import('./shared/layout/routes').then(r => r.LAYOUT_ROUTES)
    },
    {
        path: 'login', component: LoginComponent, pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login',
    }
];
