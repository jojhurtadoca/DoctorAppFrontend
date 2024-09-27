import { Route } from "@angular/router";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { SpecialtyComponent } from "../../specialty/pages/specialty/specialty.component";
import { DoctorListComponent } from "../../doctor/pages/doctor-list/doctor-list.component";

export const LAYOUT_ROUTES: Route[] = [
    {
        path: 'dashboard', component: DashboardComponent
    },
    {
        path: 'specialty',
        component: SpecialtyComponent,
    },
    {
        path: '**',
        redirectTo: '',
    },
    {
        path: 'doctor',
        component: DoctorListComponent,
    },
];

