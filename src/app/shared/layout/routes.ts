import { Route } from "@angular/router";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { SpecialtyComponent } from "../../specialty/pages/specialty/specialty.component";
import { DoctorListComponent } from "../../doctor/pages/doctor-list/doctor-list.component";
import { ListUsersComponent } from "../../user/pages/list-users/list-users.component";

export const LAYOUT_ROUTES: Route[] = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard', component: DashboardComponent
    },
    {
        path: 'specialty',
        component: SpecialtyComponent,
    },
    {
        path: 'users',
        component: ListUsersComponent,
    },
    {
        path: 'doctor',
        component: DoctorListComponent,
    },
    {
        path: '**',
        redirectTo: '',
    },
];

