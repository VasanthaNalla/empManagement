import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/Login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './user/user.component';
import { Employee } from './Models/employee.model';
import { EmployeesListComponent } from './Employees/employees.component';
import { EmployeeDetailComponent } from './Employees/emp-details/emp-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'empDetails', component: EmployeeDetailComponent, canActivate: [AuthGuard] },
  { path: 'empList', component: EmployeesListComponent, canActivate: [AuthGuard] },
  { path: 'empEdit/:id', component: EmployeeDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
