import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  @Input('userNameFromParent') userNameFromSignUp : String;
  
  constructor(private formBuilder: FormBuilder, private restService: RestService, private router: Router
    ,private changeDetector : ChangeDetectorRef) { }

  ngOnInit() {

    this.signInForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngAfterViewChecked() {
    if(this.userNameFromSignUp != undefined && this.userNameFromSignUp != "") {
      this.signInForm.controls['userName'].setValue(this.userNameFromSignUp);
    }
    this.changeDetector.detectChanges();
  }

  isValid(formControlName) {
    return this.signInForm.get(formControlName).invalid && (this.signInForm.get(formControlName).dirty || this.signInForm.get(formControlName).touched);
  }

  isFormInValid() {
    return !(this.signInForm.get('userName').dirty || this.signInForm.get('userName').touched) &&
      !(this.signInForm.get('password').dirty || this.signInForm.get('password').touched)
    // return !this.signInForm.valid;
  }

  onSubmit() {
    console.log(this.signInForm);
    this.restService.get(CommonService.BASE_URL+"login/" + this.signInForm.value.userName + "/" + this.signInForm.value.password).subscribe(
      (data) => {
        console.log(data);
        if (data == true) {
          console.log("login success");
          localStorage.setItem("userName", this.signInForm.value.userName);
          localStorage.setItem("isUserLoggedIn", "true");
          this.router.navigate(['vegetables']);
        } else {
          alert("invalid userName/Password \n Try to remember harder!!!");
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onForgetPassword() {
    alert("to be implemented \n forget password");
  }

}
