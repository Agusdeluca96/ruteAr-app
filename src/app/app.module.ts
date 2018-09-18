import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Services
import { UserService } from './_services';
import { ActividadService } from './_services';
import { RutaService } from './_services';
import { AuthenticationService } from './_services';


// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { ActividadListComponent } from './actividad-list/actividad-list.component';
import { ActividadNewComponent } from './actividad-new/actividad-new.component';
import { ActividadUpdateComponent } from './actividad-update/actividad-update.component';
import { RutaNewComponent } from './ruta-new/ruta-new.component';

// Helpers
import { JwtInterceptor } from './_helpers';
import { ErrorInterceptor } from './_helpers';

// Guards
import { AuthGuard } from './_guards';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        RegisterComponent,
        UserListComponent,
        ActividadListComponent,
        ActividadNewComponent,
        LoginComponent,
        ActividadUpdateComponent,
        RutaNewComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        SelectModule,
        NgbModule.forRoot()
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        ActividadService,
        RutaService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
