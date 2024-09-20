import { Route } from "@angular/router";
import { DashboardComponent } from "../dashboard/dashboard.component";

export const LAYOUT_ROUTES: Route[] = [
    {
        path: 'dashboard', component: DashboardComponent
    },
    {
        path: '**',
        redirectTo: '',
    }
];

