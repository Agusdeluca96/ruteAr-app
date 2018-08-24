import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { RegisterComponent } from './components/register/register.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ActividadListComponent } from './components/actividad-list/actividad-list.component';
import { ActividadNewComponent } from './components/actividad-new/actividad-new.component';
import { ActividadUpdateComponent } from './components/actividad-update/actividad-update.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: 'admin',
                component: AdminHomeComponent,
                children: [
                    { path: 'users/list', component: UserListComponent },
                    { path: 'actividad/list', component: ActividadListComponent },
                    { path: 'actividad/new', component: ActividadNewComponent },
                    { path: 'actividad/update/:id', component: ActividadUpdateComponent },
                ]
            },
            {
                path: 'user',
                component: UserHomeComponent,
                children: [
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
