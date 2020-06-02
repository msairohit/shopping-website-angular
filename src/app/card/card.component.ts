import { Component, OnInit, Input } from '@angular/core';
import { Vegetable } from '../vegetable';
import { LocalStorageService } from '../local-storage.service';
import { element } from 'protractor';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  childMessage;

  buttonDisabled: boolean = false;
  addToCartString = "Add to cart";
  updateCartString = "Update cart";
  buttonName: string = this.addToCartString;

  
  @Input('parentData') parentData: Vegetable[];

  constructor(private localStorageService : LocalStorageService) { }

  ngOnInit() {
   
  }

  isButtonDisabled(data) {
    console.log(this.localStorageService.vegetableAlreadyExists(data));
    return this.localStorageService.vegetableAlreadyExists(data);
  }


  addOrUpdateCart(data) {
    //TODO : update store functionality to keep track of current situation.
    console.log({data});
    console.log("add to cart called, need to write rest call to save the data");
    if(!this.localStorageService.vegetableAlreadyExists(data)) {//Add to cart functionality
      this.localStorageService.addToLocalStorage(data);
      console.log("item added to cart");
      this.localStorageService.printCartItems();
      this.disableButton(data);
    } else {//Update cart functionality
      //call update rest call.
      this.disableButton(data);

    }
  }

  toggleButtonName(data) {
    document.getElementById("btn-" + data.id).innerHTML =
      document.getElementById("btn-" + data.id).innerHTML == this.addToCartString ? this.updateCartString : this.addToCartString;
  }

  disableButton(data) {
    (document.getElementById("btn-"+data.id) as any).disabled = true;
  }

  enableButton(data) {
    (document.getElementById("btn-"+data.id) as any).disabled = false;
  }

  receiveMessage(event, data) {
    console.log(event);
    console.log({data});
    this.childMessage = event;
    // data.price = event;

    if (this.localStorageService.vegetableAlreadyExists(data) && document.getElementById("btn-"+data.id).innerHTML == this.addToCartString) {
      // this.buttonName = this.updateCartString;//TODO : based on this button name change the create or update functionlaity.
      this.toggleButtonName(data);
      this.enableButton(data);
    }

    if (this.localStorageService.vegetableAlreadyExists(data) && document.getElementById("btn-"+data.id).innerHTML == this.updateCartString) {
      // this.buttonName = this.updateCartString;//TODO : based on this button name change the create or update functionlaity.
      this.enableButton(data);
    }
  }

}
