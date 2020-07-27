
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employeeService';
import { ActivatedRoute } from '@angular/router';
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
  public employee;
  constructor(private service: EmployeeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.service.getEmployee(this.id).subscribe(data => this.employee = data);
    } else {
      this.isNewEmp = true;
    }
    this.form = this.getformConfig();
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
    if (!this.id)
      this.insertRecord(this.emp);
    else
      this.updateRecord(this.emp);
    this.form.reset();
  }

  insertRecord(emp: Employee) {
    this.service.addEmployee(emp).subscribe(
      res => {
        //this.toastr.success('Submitted successfully', 'Payment Detail Register');
      },
      err => {
        debugger;
        console.log(err);
      }
    )
  }
  updateRecord(emp: Employee) {
    this.service.updateEmployee(emp).subscribe(
      res => {
       // this.toastr.info('Submitted successfully', 'Payment Detail Register');
      },
      err => {
        console.log(err);
      }
    )
  }

}
