import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UserHomeComponent} from './components/user-home/user-home.component';
import { RegisterComponent} from './components/register/register.component';
import { UserListComponent} from './components/user-list/user-list.component';
import { ActividadListComponent } from './components/actividad-list/actividad-list.component';
import { ActividadNewComponent } from './components/actividad-new/actividad-new.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: 'register', component: RegisterComponent },
            {
                path: 'admin',
                component: AdminHomeComponent,
                children: [
                    { path: 'users/list', component: UserListComponent },
                    { path: 'actividad/list', component: ActividadListComponent },
                    { path: 'actividad/new', component: ActividadNewComponent },
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
