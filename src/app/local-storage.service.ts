import { Injectable } from '@angular/core';
import { Vegetable } from './vegetable';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addToLocalStorage(vegetable: Vegetable) {
    var cartItems = this.getFromLocalStorage() || [];
    cartItems.push(vegetable);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  }

  printCartItems() {
    if (this.getFromLocalStorage())
      this.getFromLocalStorage().forEach(element => {
        console.log(element.name);
      });
  }

  vegetableAlreadyExists(data) {
    var alreadyExists = false;
    this.getFromLocalStorage().forEach(element => {
      if (element.name == data.name)
        alreadyExists = true;
    });
    return alreadyExists;
  }
}
