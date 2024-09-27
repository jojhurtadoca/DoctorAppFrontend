import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    {
        path: '', component: LoginComponent, pathMatch: 'full'
    },
    {
        path:'layout',
        component: LayoutComponent,
        loadChildren: () => import('./shared/layout/routes').then(r => r.LAYOUT_ROUTES),
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard]
    },
    {
        path: 'login', component: LoginComponent, pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login',
    }
];
