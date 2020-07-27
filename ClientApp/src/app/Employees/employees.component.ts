import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employeeService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees.component.html',
  styles: []
})
export class EmployeesListComponent implements OnInit {
  public empList;

  constructor(private service: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.getEmpList();
  }

  getEmpList() {
    this.service.getAllEmployees().subscribe(data => {
      this.empList = data;
    });
  }

  onEdit(id: number) {
    this.router.navigate(['/empEdit/',id]);  
  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteEmployee(id)
        .subscribe(res => {
          this.getEmpList();
          this.getEmpList();
          //this.toastr.warning('Deleted successfully', 'Payment Detail Register');
        },
          err => {
            console.log(err);
          })
    }

  }

}
