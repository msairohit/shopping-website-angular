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
  buttonName: string = "Add to cart";

  
  @Input('parentData') parentData: Vegetable[];

  constructor(private localStorageService : LocalStorageService) { }

  ngOnInit() {
   
  }

  isButtonDisabled(data) {
    console.log(this.localStorageService.vegetableAlreadyExists(data));
    return this.localStorageService.vegetableAlreadyExists(data);
  }


  addToCart(data) {
    console.log({data});
    console.log("add to cart called, need to write rest call to save the data");
    //TODO :  need to write rest call to save the data, disable button and change to "update cart" once any quantity changed.
    if(!this.localStorageService.vegetableAlreadyExists(data)) {
      this.localStorageService.addToLocalStorage(data);
      console.log("item added to cart");
      this.localStorageService.printCartItems();
      this.buttonName = "Update cart";
    }
  }

  receiveMessage(event, data) {
    console.log(event);
    console.log({data});
    this.childMessage = event;
    // data.price = event;

    if (this.localStorageService.vegetableAlreadyExists(data)) {
      this.buttonName = "Update cart";//TODO : based on this button name change the create or update functionlaity.
    }
  }

  getButtonName(data) {
    if (this.localStorageService.vegetableAlreadyExists(data))
      this.buttonName = "Update cart";//TODO : based on this button name change the create or update functionlaity.
      else
      this.buttonName = "Add to cart";
  }

}
