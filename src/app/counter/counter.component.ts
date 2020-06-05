import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Vegetable } from '../vegetable';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  count: number = 1;
  @Input('parentData') parentData;
  id : number = 0;

  @Output() messageEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.id = this.parentData;
  }

  increment(data) {
    console.log({data});
    this.count+=0.25;
    console.log('increment called');
    this.messageEvent.emit(this.count);
  }

  decrement() {
    if (this.count > 0.26){
      this.count-=0.25;
      this.messageEvent.emit(this.count);
    }
  }

  keyPressed(event) {
    let val = (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    if (val)
      this.messageEvent.emit(this.count);
    return val;
  }

}
