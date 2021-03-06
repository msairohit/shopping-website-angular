import { Component, OnInit, ViewChild } from '@angular/core';
import { Vegetable } from '../vegetable';
import { RestService } from '../rest.service';
import { CardComponent } from '../card/card.component';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-vegetables',
  templateUrl: './vegetables.component.html',
  styleUrls: ['./vegetables.component.css']
})
export class VegetablesComponent implements OnInit {

  allData;
  @ViewChild(CardComponent, {static: false}) child : CardComponent;

  constructor(private restService : RestService) { }

  ngOnInit() {
    this.allData = [];

    this.restService.get(CommonService.BASE_URL+"vegetables/getAll").subscribe(
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

  }

}
