import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-signup-test',
  templateUrl: './login-signup-test.component.html',
  styleUrls: ['./login-signup-test.component.scss']
})
export class LoginSignupTestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSignUp() {
    alert("signUp");
  }
  onSignIn() {
    alert("signIn");
  }

  ngAfterViewInit() {
    document.querySelector('.img__btn').addEventListener('click', function() {
      document.querySelector('.cont').classList.toggle('s--signup');
    });
  }


}
