import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Services
import { UserService } from './services/user.service';
import { ActividadService } from './services/actividad.service';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { RegisterComponent } from './components/register/register.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ActividadListComponent } from './components/actividad-list/actividad-list.component';
import { ActividadNewComponent } from './components/actividad-new/actividad-new.component';
import { ActividadUpdateComponent } from './components/actividad-update/actividad-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminHomeComponent,
    UserHomeComponent,
    RegisterComponent,
    UserListComponent,
    ActividadListComponent,
    ActividadNewComponent,
    LoginComponent,
    ActividadUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SelectModule,
    NgbModule.forRoot()
  ],
  providers: [UserService, ActividadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
