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

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { RegisterComponent } from './components/register/register.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminHomeComponent,
    UserHomeComponent,
    RegisterComponent,
    UserListComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SelectModule,
    NgbModule.forRoot()
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
