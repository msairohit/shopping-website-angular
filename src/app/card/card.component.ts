import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Vegetable } from '../vegetable';
import { LocalStorageService } from '../local-storage.service';
import { element } from 'protractor';
import { CounterComponent } from '../counter/counter.component';
import { RestService } from '../rest.service';
import { Cart } from '../cart';

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

  @ViewChild(CounterComponent, {static: false}) counterComponent;
  @ViewChildren(CounterComponent) counterComponentList : QueryList<CounterComponent>;

  constructor(private localStorageService : LocalStorageService, private restService : RestService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    /* var div=document.getElementById("div");
var a=div.querySelectorAll('button');
console.log(Object.values(a)) */
    this.localStorageService.getFromLocalStorage().forEach(element => {
      console.log(element);
      this.initializeButton(element);
      /* var counter = this.counterComponentList.filter(item => item.id == element.id);
      if (counter.length > 0) {
        counter[0].count = element.quantity;
      } */
    });

  }

  initialize() {
    this.localStorageService.getFromLocalStorage().forEach(element => {
      console.log(element);
      this.initializeButton(element);
      /* var counter = this.counterComponentList.filter(item => item.id == element.id);
      if (counter.length > 0) {
        counter[0].count = element.quantity;
      } */
    });
  }
  
  initializeButton(data : Vegetable) {
    this.changeButtonStatus(data);
    this.changeButtonText(data);
  }

  changeButtonStatus(data : Vegetable) {
    (document.getElementById("btn-"+data.id) as any).disabled = data.buttonStatus;
  }

  changeButtonText(data : Vegetable) {
    document.getElementById("btn-" + data.id).innerHTML = data.buttonText;
  }

  isButtonDisabled(data) {
    console.log(this.localStorageService.vegetableAlreadyExists(data));
    return this.localStorageService.vegetableAlreadyExists(data);
  }


  addOrUpdateCart(data) {
    //TODO : update store functionality to keep track of current situation.
    console.log({ data });
    console.log("add to cart called, need to write rest call to save the data");
    var quantity = this.getQuantity(data);
    data.quantity = quantity;
    if (quantity == 0) {
      console.log("quantity not correct");
    } else {
      let cart: Cart = new Cart();
      cart.quantity = quantity;
      cart.customerName = this.localStorageService.getUserName();
      cart.productName = data.vegetableName;
      cart.costOfEachItem = data.price;

      /* if (!this.localStorageService.vegetableAlreadyExists(data)) {//Add to cart functionality
        this.localStorageService.addToLocalStorage(data);
        console.log("item added to cart");
        this.restService.post("http://localhost:8080/cart", cart).subscribe(
          (data) => {
            console.log(data);
          }, (error) => {
            console.error(error);
          });
        this.disableButton(data);
      } else {//Update cart functionality */
        this.restService.put("http://localhost:8080/cart", cart).subscribe(
          (data) => {
            console.log(data);
          }, (error) => {
            console.error(error);
          });
        this.disableButton(data);
        data.buttonStatus = this.getButtonStatus(data);
        data.buttonText = this.getButtonText(data);
        this.localStorageService.addToLocalStorage(data);

      // }
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

  getButtonStatus(data) {
    return (document.getElementById("btn-"+data.id) as any).disabled;
  }

  getButtonText(data) {
    return (document.getElementById("btn-"+data.id) as any).innerHTML;
  }

  getQuantity(data) {
    console.log(this.counterComponent.count);
    console.log(this.counterComponentList.toArray());
    var counter =  this.counterComponentList.filter(item => item.id == data.id);
    if(counter.length > 0) {
      return counter[0].count;
    }
    return 0;
  }

  receiveMessage(event, data) {
    // console.log(event);
    // console.log({data});
    // this.childMessage = event;
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
