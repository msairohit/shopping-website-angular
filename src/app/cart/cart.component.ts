import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Cart } from '../cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  allData;
  totalCartValue : number = 0;
  numberOfItemsInCart : number = 0;

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.allData = [];
    this.restService.get("http://localhost:8080/cart/sai")
      .subscribe(
        (data : any) => {
          console.log(data);
          this.allData = data;
          this.numberOfItemsInCart = data.length;
          data.forEach(element => {
            this.totalCartValue += element.totalCost;
          });
        },
        (error) => {
          console.error(error);
        });
  }

  getDataFromChild(data) {
    this.totalCartValue = data;
  }

}
