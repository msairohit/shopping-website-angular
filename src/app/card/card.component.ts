import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { Vegetable } from '../vegetable';
import { LocalStorageService } from '../local-storage.service';
import { element } from 'protractor';
import { CounterComponent } from '../counter/counter.component';
import { RestService } from '../rest.service';
import { Cart } from '../cart';
import { CommonService } from '../common.service';

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

  cartData;

  
  @Input('parentData') parentData: any[];

  @Output() totalCostFromChild = new EventEmitter<number>();

  @ViewChild(CounterComponent, {static: false}) counterComponent;
  @ViewChildren(CounterComponent) counterComponentList : QueryList<CounterComponent>;

  constructor(private localStorageService : LocalStorageService, private restService : RestService
    , private commonService : CommonService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.commonService.showSpinner();
    var cartData: Cart[];
    this.restService.get("http://localhost:8080/cart/sai")
      .subscribe(
        (data: Cart[]) => {
          cartData = data;
          console.log(cartData);
          this.parentData.forEach(parent => {
            var cart = [];
            cart = cartData.filter(cart => cart.name == parent.name);
            if (cart.length > 0) {
              console.log("already exists", cart);
              parent.quantity = cart[0].quantity;
              parent.buttonStatus = true;
              parent.buttonText = this.addToCartString;
            } else {
              parent.quantity = 0;
              parent.buttonStatus = false;
              parent.buttonText = this.addToCartString;
            }
          })
          this.cartData = data;
        },
        (error) => {
          console.error(error);
          this.commonService.hideSpinner();
        });
        this.commonService.hideSpinner();
  }

  updateCartDataInLocalVariable () {
    this.restService.get("http://localhost:8080/cart/sai").subscribe(
      (data : any) => {
        console.log(data);
        if(this.parentData[0].totalCost) {
          this.parentData = data;
        }
        this.cartData = data;
      },
      (error) => {
        console.error("something wrong");
      }
    );
  }


  removeItemFromCart(data) {//TODO: implement method
    //delete from db.
    console.log(data);
    var url = "http://localhost:8080/cart/";
    var uri = data.name;
    this.restService.delete(url + uri).subscribe(
      (data) => {
        console.log("successfully deleted ", data);
        this.updateCartDataInLocalVariable();
      },
      (error) => {
        console.error("something fishy, not deleted!! ", error);
      }
      );
      
      //change quantity to 0.
      var counter =  this.counterComponentList.filter(item => item.id == data.id);
      if(counter.length > 0) {
        counter[0].count = 0;
      }
      
      //enable button.
      //change text to add to cart.
      if (!data.customerName) {
        this.enableButton(data);
        document.getElementById("btn-" + data.name).innerHTML = this.addToCartString;
      }

  }


  addOrUpdateCart(data) {
    //TODO : update store functionality to keep track of current situation.
    console.log({ data });
    console.log("add to cart called, need to write rest call to save the data");
    var quantity = this.getQuantity(data);
    data.quantity = quantity;
    if (quantity == 0) {
      alert("Select a quantity, cant deliver empty basket!!");
      console.log("quantity not correct");
    } else {
      let cart: Cart = new Cart();
      if(data.customerName) {
        cart = data;
      } else {
        cart.quantity = quantity;
        cart.customerName = this.localStorageService.getUserName();
        cart.name = data.name;
        cart.costOfEachItem = data.price;
      }

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
          (data : any) => {
            console.log(data);
            if(this.parentData[0].totalCost) {

              document.getElementById('totalCostLabel-' + data.name).innerHTML = data.totalCost;
              var totalCartValue : number = 0;
              for (let index = 0; index < this.parentData.length; index++) {
                var val = document.getElementById('totalCostLabel-' + data.name).innerHTML;
                totalCartValue += parseFloat(val);
              }
  
              this.totalCostFromChild.emit(totalCartValue);
            }
          }, (error) => {
            console.error(error);
          });
      if (!data.customerName) {
        this.disableButton(data);
        data.buttonStatus = this.getButtonStatus(data);
        data.buttonText = this.getButtonText(data);
      }
        this.localStorageService.addToLocalStorage(data);
        this.updateCartDataInLocalVariable();
      // }
    }
  }

  toggleButtonName(data) {
    document.getElementById("btn-" + data.name).innerHTML =
      document.getElementById("btn-" + data.name).innerHTML == this.addToCartString ? this.updateCartString : this.addToCartString;
  }

  disableButton(data) {
    (document.getElementById("btn-"+data.name) as any).disabled = true;
  }

  enableButton(data) {
    (document.getElementById("btn-"+data.name) as any).disabled = false;
  }

  getButtonStatus(data) {
    return (document.getElementById("btn-"+data.name) as any).disabled;
  }

  getButtonText(data) {
    return (document.getElementById("btn-"+data.name) as any).innerHTML;
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

  itemExistsInCart(data) {
    var alreadyExists = false;
    for(let index = 0; index < this.cartData.length; index++) {
      const element = this.cartData[index];
      if (element.name == data.name) {
        alreadyExists = true;
        break;
      }
    }
    return alreadyExists;
  }

  receiveMessage(event, data) {
    console.log(event);
    console.log({ data });
    // this.childMessage = event;
    // data.price = event;
    if (this.parentData[0].customerName) {
      this.addOrUpdateCart(data);
    } else {
      // if (this.localStorageService.vegetableAlreadyExists(data) && document.getElementById("btn-" + data.id).innerHTML == this.addToCartString) {
      if ( this.itemExistsInCart(data) && document.getElementById("btn-" + data.name).innerHTML == this.addToCartString) {
        // this.buttonName = this.updateCartString;//TODO : based on this button name change the create or update functionlaity.
        this.toggleButtonName(data);
        this.enableButton(data);
      }

      // if (this.localStorageService.vegetableAlreadyExists(data) && document.getElementById("btn-" + data.id).innerHTML == this.updateCartString) {
      if (this.itemExistsInCart(data) && document.getElementById("btn-" + data.name).innerHTML == this.updateCartString) {
        // this.buttonName = this.updateCartString;//TODO : based on this button name change the create or update functionlaity.
        this.enableButton(data);
      }
    }
  }

}
