import { from, fromEvent, of, interval, timer, merge } from 'rxjs';
import {
  take,
  count,
  mapTo,
  scan,
  map,
  filter,
  debounceTime,
  takeUntil,
  switchMap,
} from 'rxjs/operators';

const observer = {
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

const btn = document.querySelector('#btn');

// Create a stream of a single element with type string
of('This is a mesage').subscribe(observer);

// Create a subscription that fires once, if you hover over a text element
const stream$ = fromEvent(btn!, 'mousemove');
stream$.pipe(take(1)).subscribe(observer);

// Count the number of elements in a array (with an observable stream)
const array$ = from([1, 2, 3, 4])
  .pipe(count())
  .subscribe(observer);

// Count the number of click events on a button
const clicks$ = fromEvent(btn!, 'click')
  .pipe(
    mapTo(1),
    scan<number>((acc, val) => acc + 1),
  )
  .subscribe(observer);

// Create a count down timer in seconds (10 - 0)
interval(500)
  .pipe(
    map((x) => 10 - x),
    take(10),
  )
  .subscribe(observer);

// Create a observable stream of an input box value change
const input = document.querySelector('#input');
fromEvent<KeyboardEvent>(input!, 'keyup')
  .pipe(
    map((event) => (event.target as HTMLInputElement).value),
    filter((val) => val.length > 2),
    debounceTime(500),
    map((val) => val.toUpperCase()),
  )
  .subscribe(observer);

// Create a subscription on a button click that auto unsubscribe after 5 seconds
const timeout$ = timer(1000);
fromEvent(btn!, 'click')
  .pipe(takeUntil(timeout$))
  .subscribe(observer);
/*
    ---c--c---c------c----c-----
    ----------------0|
    ---c--c---c-----|
*/

// One subscribe with two buttons
const btnStart = document.querySelector('#btnStart');
const btnStop = document.querySelector('#btnStop');
const btnStart$ = fromEvent(btnStart!, 'click');
const btnStop$ = fromEvent(btnStop!, 'click');
merge(btnStart$, btnStop$).subscribe(observer);

// Start & stop timer (log to console) with a start and stop button
btnStart$
  .pipe(switchMap((event) => interval(500).pipe(takeUntil(btnStop$))))
  .subscribe(observer);
