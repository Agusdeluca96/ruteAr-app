import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';

// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Services
import { UserService, ActividadService, RutaService, AuthenticationService } from './_services';

// Pipes
import { TextcorrectorPipe } from './_pipes/textcorrector.pipe';

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
import { RutaViewComponent } from './ruta-view/ruta-view.component';
import { RutaUpdateComponent } from './ruta-update/ruta-update.component';
import { RutasAgregadasComponent } from './rutas-agregadas/rutas-agregadas.component';
import { RutasRecorridasComponent } from './rutas-recorridas/rutas-recorridas.component';
import { RutasDescubrirComponent } from './rutas-descubrir/rutas-descubrir.component';

// Helpers
import { JwtInterceptor } from './_helpers';
import { ErrorInterceptor } from './_helpers';

// Guards
import { AuthGuard } from './_guards';

// Icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Google Maps API
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

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
        RutaNewComponent,
        RutaViewComponent,
        RutaUpdateComponent,
        RutasAgregadasComponent,
        RutasRecorridasComponent,
        RutasDescubrirComponent,
        TextcorrectorPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        SelectModule,
        FontAwesomeModule,
        NgbModule.forRoot(),
        MDBBootstrapModule.forRoot(),
        AgmCoreModule.forRoot({ apiKey: 'AIzaSyBPwz_Bk0e4hHPbUKf1fuJaINJAqnBGcRE' }), 
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        UserService,
        ActividadService,
        RutaService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        GoogleMapsAPIWrapper, 
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
