import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private spinner: NgxSpinnerService) { }

  // static BASE_URL = "https://shopping-website-back-end.herokuapp.com/";
  static BASE_URL = "http://localhost:8080/";

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }
}
