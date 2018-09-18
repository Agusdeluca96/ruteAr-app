import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { ActividadListComponent } from './actividad-list/actividad-list.component';
import { ActividadNewComponent } from './actividad-new/actividad-new.component';
import { ActividadUpdateComponent } from './actividad-update/actividad-update.component';
import { RutaNewComponent } from './ruta-new/ruta-new.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            // Administrador routes
            { path: 'users/list', component: UserListComponent },
            { path: 'actividad/list', component: ActividadListComponent },
            { path: 'actividad/new', component: ActividadNewComponent },
            { path: 'actividad/update/:id', component: ActividadUpdateComponent },

            // Usuario Basico routes
            { path: 'ruta/new', component: RutaNewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
