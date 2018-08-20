import { Observable, fromEvent, of } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';

console.log('Hello from TS');

const btn = document.querySelector('#btn');

// prettier-ignore
fromEvent(btn, 'click')
  .subscribe((x) => {
    console.log(x)
  });
