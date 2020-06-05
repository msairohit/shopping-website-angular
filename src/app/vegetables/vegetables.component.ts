import { Component, OnInit } from '@angular/core';
import { Vegetable } from '../vegetable';
import { LocalStorageService } from '../local-storage.service';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-vegetables',
  templateUrl: './vegetables.component.html',
  styleUrls: ['./vegetables.component.css']
})
export class VegetablesComponent implements OnInit {

  allData;

  constructor(private localStorageService: LocalStorageService, private restService : RestService) { }

  ngOnInit() {
    localStorage.clear();
    this.allData = [];

    /* let vegetable1 = new Vegetable();
    vegetable1.id = 2;
    vegetable1.name = "carrot1";
    vegetable1.description = "its red and good for eyes";
    vegetable1.price = 20;

    let vegetable2 = new Vegetable();
    vegetable2.id = 3;
    vegetable2.name = "carrot2";
    vegetable2.description = "its red and good for eyes";
    vegetable2.price = 20;

    // this.localStorageService.addToLocalStorage(vegetable1);
    // this.localStorageService.addToLocalStorage(vegetable2);
    this.allData.push(vegetable1);
    this.allData.push(vegetable2); */
    this.restService.get("http://localhost:8080/vegetables/getAll").subscribe(
      (data) => {
        console.log(data);
        if(data) {
          this.allData = data;
        }
      },
      (error) => {
        alert("error : " + error.statusText);
        console.error(error);
      }
    );
    console.log(this.allData);

    console.log("cart items initiated");
    this.localStorageService.printCartItems();
  }

}
