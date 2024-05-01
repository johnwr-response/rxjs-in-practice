import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {fromEvent, interval, timer} from "rxjs";

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const interval$ = interval(1000);
    const subInterval1$ = interval$.subscribe(value => console.log("interval stream 1 => " + value));
    const subInterval2$ = interval$.subscribe(value => console.log("interval stream 2 => " + value));
    setTimeout(() => subInterval1$.unsubscribe(),10000);
    setTimeout(() => subInterval2$.unsubscribe(),15000);

    const timer$ = timer(3000, 1000);
    const subTimer$ = timer$.subscribe(value => console.log("timer stream 1 => " + value));
    setTimeout(() => subTimer$.unsubscribe(),5000);

    const click$ = fromEvent(document, 'click');
    click$.subscribe(
      event => console.log(event),
      error => console.log(error),
      () => console.log("completed"),
    );
  }

}
