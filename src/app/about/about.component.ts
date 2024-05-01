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
    interval$.subscribe(value => console.log("interval stream 1 => " + value));
    interval$.subscribe(value => console.log("interval stream 2 => " + value));

    const timer$ = timer(3000, 1000);
    timer$.subscribe(value => console.log("timer stream 1 => " + value));

    const click$ = fromEvent(document, 'click');
    click$.subscribe(event => console.log(event));
  }

}
