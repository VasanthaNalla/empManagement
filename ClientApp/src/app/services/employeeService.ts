import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Employee } from '../Models/employee.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;
  readonly rootURL = 'http://localhost:59035/api';
  list: Employee[];
  emp: Employee;
  constructor(private http: HttpClient) { }

  addEmployee(emp: Employee) {
    return this.http.post('/Employee/', emp);
  }
  updateEmployee(emp: Employee) {
    return this.http.put('/Employee/' , emp);
  }
  deleteEmployee(id) {
    return this.http.delete('/Employee/' + id);
  }

  getEmployee(id): Observable<any> {
    return this.http.get('/Employee/' + id);
  }

  getAllEmployees() {
    return this.http.get('/Employee');
  }

  refreshList() {
    this.http.get('/getAllEmp')
      .toPromise()
      .then(res => this.list = res as Employee[]);
  }
}
