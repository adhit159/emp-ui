import { Component, OnInit, Injectable } from '@angular/core';
import { HttpDataService } from 'src/http-data.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Emp } from './Emp';
import { AlertService } from '../alert/alert.service';


@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css'],
})

@Injectable({
  providedIn: 'root',
})
export class AddEmpComponent implements OnInit {

  genders:Array<Object>  = [{id:1,value: 'Male'}, 
                            {id:2,value: 'Female'},{id:3,value:'Transgender'},{id:4,value: 'Do not wish to disclose'}];

  loading = false;
  submitted = false;
  empForm: FormGroup;
  employees: Emp[] = [];

  constructor(private formBuilder: FormBuilder, private empService: HttpDataService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loadAllEmps();
    this.empForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dept: ['', [Validators.required]],
      dob: ['', [Validators.required]]
    });
  }

  get f() { return this.empForm.controls; }

  onFormSubmit() {
    this.submitted = true;
    this.loading = true;
    let article = this.empForm.value;

    if (this.empForm.invalid) {
      this.loading = false;
      return;
  }

   
    console.log("inside createEmp");
    article.gender = article.gender.value;

    this.empService.createEmp(article).subscribe(
      article => {
        console.log(article);
        this.loadAllEmps();
      },
      error => {
        console.log(error);
        this.alertService.error(error);
        this.loading = false;
      }
    );
    this.empForm.reset();
    this.submitted = false;
    this.loading = false;
    this.alertService.success("Saved successfully",true);
  }

  loadAllEmps() {
    this.empService.getAllEmployees().subscribe(emps => {
      this.employees = emps;
    }, error => {
      console.log(error);
      this.alertService.error(error);
    });
  }
}
