import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './services/userService';
import { LoginComponent } from './user/Login/login.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { EmployeeDetailComponent } from './Employees/emp-details/emp-details.component';
import { EmployeesListComponent } from './Employees/employees.component';
import { NgProgressModule } from 'ngx-progressbar';
import { BrowserXhr } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './services/loader-interceptor.service';
import { MyLoaderComponent } from './Loader/loader.component';
import { LoaderService } from './services/loader.service';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    UserComponent,
    HomeComponent,
    EmployeeDetailComponent,
    EmployeesListComponent,
    MyLoaderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgProgressModule
  
    //ToastrModule.forRoot({
    //  progressBar: true
    //})
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
