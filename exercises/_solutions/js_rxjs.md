Prepare

```js
const subscriber = {
  next(val: any) {
    console.log(val);
  },
  error(err: any) {
    console.log('ERROR', err);
  },
  completed() {
    console.log('|');
  },
};
```

Subscribe on a button click

```js
import { fromEvent } from 'rxjs';
const btn = document.querySelector('#btn')
fromEvent(btn!, 'click')
  .subscribe(subscriber)
```

Create a stream of a single element with type string

```js
import { of } from 'rxjs';
const string$ = of('This is a mesage')
```

Create a subscription that fires once, if you hover over a text element

```js
import { take } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
const stream$ = fromEvent(btn, 'mousemove')
stream$.pipe(take(1)).subscribe(subscriber)
```

Count the number of elements in a array (with an observable stream)

```js
import { fromEvent } from 'rxjs';
import { count } from 'rxjs/operators';
const array$ = Rx.Observable.from([1,2,3,4])
array$.pipe(count()).subscribe(subscriber)
```

Count the number of click events on a button

```js
import { fromEvent } from 'rxjs';
import { scan } from 'rxjs/operators';
const clicks$ = fromEvent(btn, 'click').pipe(
    scan((acc, event) => {
        return acc + 1;
    },0 /* start with 0 */)
).subscribe(subscriber)
```

Create a count down timer in seconds (10 - 0)

```js
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';
interval(500).pipe(
    map(x => 10 - x),
    take(10),
).subscribe(subscriber)
```

Create a observable stream of an input box value change

```js
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime } from 'rxjs/operators';
const input = document.querySelector('#input')
const inputStream$ = fromEvent(input, 'keyup')
inputStream$.pipe(
    map(x => x.target.value),
    filter(x => x.length > 2),
    debounceTime(500),
    map(x => x.toUpperCase()),
).subscribe(subscriber)
```

Create a subscription on a button click that auto unsubscribe after 5 seconds

```js
import { timeout, fromEvent } from 'rxjs';
import { map, filter, debounceTime } from 'rxjs/operators';
const 5sec$ = timeout(1000);
const btn = document.querySelector('#btn')
fromEvent(btn, 'click').pipe(
  takeUntil(5sec$)
).subscribe(subscriber)
```

    ---c--c---c------c----c-----
    ----------------0|
    ---c--c---c-----|

## Create your own observable

```js
import { Observable } from 'rxjs';
function createFromButtonClick(btnSelector) {
    const btn = document.getElementById(btnSelector);
    return new Observable(observer => {
        function onClick(event) {
            observer.next(event)
        }
        btn.addEventListener("click", onClick);
        return () => {
            btn.removeEventListener("click", onClick);
        }
    })
}

// use
const stream$ = createFromButtonClick('#btn');
const sub = stream$.subscribe(subscriber);
```

## Combine observables

One subscribe with two buttons

```html
<button id="btnStart">Start</button>
<button id="btnStop">Stop</button>
```

```js
import { fromEvent, merge } from 'rxjs';
const btnStart$ = fromEvent(btnStart, 'click')
const btnStop$ = fromEvent(btnStop, 'click')

merge(btnStart$, btnStop$)
    .subscribe(subscriber);
```

Start & stop timer (log to console) with a start and stop button

```js
import { interval } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
const btnStart$ = fromEvent(btnStart, 'click')
const btnStop$ = fromEvent(btnStop, 'click')

// this works only once, after stop it doens't starts anymore
btnStart$.pipe(
    switchMap(event => interval(500))
    takeUntil(btnStop$)
).subscribe(subscriber);

// correct timer start/stop
btnStart$.pipe(
    switchMap(event => interval(500).pipe(takeUntil(btnStop$)))
).subscribe(subscriber);
```
