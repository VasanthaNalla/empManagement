
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employeeService';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../Models/employee.model';

@Component({
  selector: 'app-emp-detail',
  templateUrl: './emp-details.html',
  styles: []
})
export class EmployeeDetailComponent implements OnInit {

  form: FormGroup;
  id: string;
  isNewEmp: boolean;
  emp: Employee = new Employee();
  employee: Employee = new Employee();
  constructor(private service: EmployeeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.service.getEmployee(this.id).subscribe(data => {
        // this.employee=   data;
        // console.log(data);
        // console.log(this.employee );
        //this.form = this.getformConfig();
        debugger;
        this.form.patchValue({
          name: data.name,
          email: data.email,
          contact: data.contact,
          jobTitle: data.jobTitle,
          location: data.location
        });
      }
      );
    } else {
      this.isNewEmp = true;
      this.form = this.getformConfig();
    }
    this.form = this.getformConfig();
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  getformConfig() {
    let formConfig = this.formBuilder.group({
      name: [{ value: this.isNewEmp ? null : this.employee.Name, disabled: false }, Validators.required],
      email: [{ value: this.isNewEmp ? null : this.employee.Email, disabled: false }, Validators.required],
      contact: [{ value: this.isNewEmp ? null : this.employee.Contact, disabled: false }, Validators.required],
      jobTitle: [{ value: this.isNewEmp ? null : this.employee.JobTitle, disabled: false }, Validators.required],
      location: [{ value: this.isNewEmp ? null : this.employee.Location, disabled: false }],
    });
    return formConfig;
  }
  resetForm(form?: FormGroup) {
    if (form != null)
      form.reset();
  }

  setEmp() {
    this.emp.Contact = this.form.value.contact;
    this.emp.Email = this.form.value.email;
    this.emp.JobTitle = this.form.value.jobTitle;
    this.emp.Location = this.form.value.location;
    this.emp.Name = this.form.value.name;
  }

  onSubmit() {
    this.setEmp();
    if (this.form.valid) {
      if (!this.id)
        this.insertRecord(this.emp);
      else
        this.updateRecord(this.emp);
    } else { return false; }
  }

  insertRecord(emp: Employee) {
    this.service.addEmployee(emp).subscribe(
      res => {
        this.form.reset();
        this.router.navigate(['/empList']);
        //this.toastr.success('Submitted successfully', 'Payment Detail Register');
      },
      err => {
        debugger;
        console.log(err);
      }
    )
  }
  updateRecord(emp: Employee) {
    emp.Id = Number(this.id);
    this.service.updateEmployee(emp).subscribe(
      res => {
        this.form.reset();
        this.router.navigate(['/empList']);
        // this.toastr.info('Submitted successfully', 'Payment Detail Register');
      },
      err => {
        console.log(err);
      }
    )
  }

}
