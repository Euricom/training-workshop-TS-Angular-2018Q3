---
title: Angular - Pipes
transition: 'fade'
verticalSeparator: "^\\*\\*\\*"
---

# Angular - Pipes

<img src="./images/angular_pipes.png" width="600px" /><br>
<small>
by Peter Cosemans<br>
Copyright (c) 2017-2018 Euricom nv.
</small>

<!-- markdownlint-disable -->

<style type="text/css">
.reveal h1 {
    font-size: 3.0em;
}
.reveal h2 {
    font-size: 2.00em;
}
.reveal h3 {
    font-size: 1.00em;
}
.reveal p {
    font-size: 100%;
}

.reveal ul > li > ul {
    font-size: 70%;
}

.reveal blockquote {
    font-size: 80%;
}
.reveal pre code {
    display: block;
    padding: 5px;
    overflow: auto;
    max-height: 800px;
    word-wrap: normal;
    font-size: 90%;
}
</style>

---

## Angular Pipes

A pipe takes in data as input and transforms it to a desired output.

    {{ 'Hello world' | uppercase }}
    {{ myDate | date }}

Parameterizing a Pipe

    <p>My birthday is {{ birthday | date:"MM/dd/yy" }}</p>

Chaining pipes

    <p>{{ data | date:"MM/dd/yy" | uppercase}}</p>

Available pipes:

`DatePipe`, `UpperCasePipe`, `LowerCasePipe`, `NumberPipe`, `CurrencyPipe`, `PercentPipe`, `JsonPipe`

See More: [Pipes docs](https://angular.io/api?status=stable&type=pipe)

> You can build your own pipes

---

## Custom pipes

> Build your own

<!-- prettier-ignore -->
***

## Simple Pipe

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstuppercase',
})
export class FirstUppercasePipe implements PipeTransform {
  transform(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
```

register it

```js
// app.module.ts
@NgModule({
    declarations: [
        FirstUppercasePipe
    ],
    ...
})
```

and use it

```js
// my.component.ts
import { FirstUppercasePipe } from '../pipes/firstUppercasePipe';

@Component({
    selector: 'my-component',
    template: `
        <h2>MyComponent</h2>
        {{ name | firstuppercase }}
    `,
})
```

<!-- prettier-ignore -->
***

## Parameters

Date format with argument

```ts
import * as moment from 'moment';

@Pipe({
  name: 'myDate',
})
export class MyDatePipe implements PipeTransform {
  transform(value, format = 'DD/MM/YYYY') {
    return moment(value).format(format);
  }
}
```

Use

```html
{{ date | myDate}}
{{ date | myDate:'MM-YYYY'}}
```

---

## Exercise

Create a filter pipe

```js
export class myComponent {
  items: any = [
    { id: 1, name: 'Aartselaar' },
    { id: 2, name: 'Antwerpen' },
    { id: 3, name: 'Aarschot' },
    { id: 4, name: 'Deurne' },
  ];
}
```

```html
<input type="text" [(ngModel)]="filterExpression">
<ul>
    <li *ngFor="let item in items | filter:'name':filterExpression">
        {{id}} - {{name}}
    </li>
</ul>
```

---

## Advanced pipe concepts

> It can be more

<!-- prettier-ignore -->
***

## Pipe purity

A pipe will only run again when the arguments are changed, not when the data changes. By default all pipes are pure.

```ts
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value) {
    return value.filter(item => item.id > 10);
  }
}
```

```ts
users = [
    { id: 1, name: 'peter'},
    { id: 12, name: 'luc'},
];

onAdduser() {
    // adding an element on the array won't update the pure pipe
    this.users.push({ id: 14, name: 'peter'})
}
```

```html
<ul>
  <li *ngFor="let user of users | filter">
    {{user.name}}
  </li>
</ul>
```

<!-- prettier-ignore -->
***

## Pipe purity

You can disable it by

```js
@Pipe({
    name: 'filter',
    // An unpure pipe will run always
    // Be aware of performance issues because you pipe will
    // run many times more
    pure: false,
})
```

Another solution is to immutable mutate the array (faster)

```ts
onAdduser() {
    this.users = [
       ...this.users,
       { id: 14, name: 'peter'}
    ]
}
```
