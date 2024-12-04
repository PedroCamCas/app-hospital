import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { PatientComponent } from './components/patient/patient.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'doctors', component: DoctorComponent },
    { path: 'patients', component: PatientComponent },
    { path: 'user-edit', component: UserComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
