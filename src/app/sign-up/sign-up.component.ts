import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', Validators.required],
      address: this.formBuilder.group({
        city: [''],
        state: [''],
        zip: ['']
      }),
      email: [''],
      password: []
    });
  }

  isFirstNameValid() {
    return this.signUpForm.get('firstName').invalid && (this.signUpForm.get('firstName').dirty || this.signUpForm.get('firstName').touched);
    // return this.signUpForm.get('firstName').touched && this.signUpForm.get('firstName').invalid;
  }
  isLastNameValid() {
    return this.signUpForm.get('lastName').invalid && (this.signUpForm.get('lastName').dirty || this.signUpForm.get('lastName').touched);
    // return this.signUpForm.get('firstName').touched && this.signUpForm.get('firstName').invalid;
  }

}
