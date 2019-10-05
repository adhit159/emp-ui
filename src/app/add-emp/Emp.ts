import { AbstractControl } from "@angular/forms";

export interface Emp {
    id: Number;
    firstName: AbstractControl;
    lastName: AbstractControl;
    gender: AbstractControl;
    dept: AbstractControl;
    dob: AbstractControl;
  }