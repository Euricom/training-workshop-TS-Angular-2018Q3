---
title: Modern JavaScript
transition: 'fade'
---
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

# Modern JavaScript

<img src="./images/js-big.png" width="400px" /><br>
<small>
by Peter Cosemans<br>
Copyright (c) 2017-2018 Euricom nv.
</small>


---

# ES5, ES6, ES2016, ES2017, ES.Next

> What's going on with JavaScript versioning

----

## Terms of terminology

* ECMAScript
* ECMAScript 5 (ES5) - 2009
* ECMAScript 6 (ES6/ES2015) - 2015
* ECMAScript 2016 (ES7) - 2016
* ECMAScript 2017 (ES8) - 2017
* ECMAScript 2018 (ES9) - 2018
* ES.Next
* TC39

Note:

* ECMAScript: A language standardized by ECMA International.
* JavaScript: The commonly used name for implementations of the ECMAScript standard
* ECMAScript 5 (ES5): The 5th edition of ECMAScript, standardized in 2009
* ECMAScript 6 (ES6/ES2015): The 6th edition of ECMAScript, standardized in 2015.
* ECMAScript 2016: The 7th edition of ECMAScript (ES7)
* ECMAScript 2017: The 8th edition of ECMAScript (ES8)

----

## ES6+ Today

<img src="./images/compatibility-table.png" width="500px" /><br>

* Edge, Chrome, Firefox and Safari: +96%
* Node 8.x: +98%

> [http://kangax.github.io/compat-table/es6/](http://kangax.github.io/compat-table/es6/)

----

## What about TypeScript

> It's just ECMAScript 6+ and typings

https://github.com/Microsoft/TypeScript/wiki/Roadmap

---

# ECMAScript 6+

---

# ES6+
## Basic Features

> What you probably already know.

----

## The var keyword

```js
    // ES5 - function scoping
    var message = 'hi';
    function greet() {
        var message = 'bye';
    }
    greet();
    console.log(message)      // --> Output ?
```

```js
    // ES5 - block scoping
    var message = 'hi';
    if (true)
    {
        var message = 'bye';
    }
    console.log(message)      // --> output: ?
```

<!-- .element: class="fragment" data-fragment-index="1" -->

----

### The var keyword

```js
    // ES5 - function scoping
    var message = 'hi';
    function greet() {
        var message = 'bye';
    }
    greet();
    console.log(message)      // --> Output: hi
```

```js
    // ES5 - block scoping
    var message = 'hi';
    if (true)
    {
        var message = 'bye';
    }
    console.log(message)      // --> output: bye
```

----

## The let keyword

```js
    // ES6 - block scoping with let
    let message = 'hi';
    if (true)
    {
        let message = 'bye';
    }
    console.log(message)      --> output: ?
```

```js
    // output: hi
```
<!-- .element: class="fragment" data-fragment-index="1" -->

A block defines another scope!

<!-- .element: class="fragment" data-fragment-index="1" -->

----

## The const keyword

```js
// ES5
var message = 'hi';
return message;

// ES6
const message = 'hi';
message = 'hello' < --ERROR;
```

In ES6+ always prefer ```const``` over ```let``` over ```var```.

----

### The const keyword

> const is not immutable!

```js
const names = [];
names.push( "Jordan" );     // <-- No Error
console.log( names );
```

'const' defines a constant Reference, NOT a constant value
<!-- .element: class="fragment" data-fragment-index="3" -->

----

## Property value shorthand

```js
// ES5
function getCar(make, model, value) {
  return {
    make: make,
    model: model,
    value: value,
  };
}
```

vs

```js
// ES6
// With property value shorthand syntax, you can omit the property
// value if key matches variable name.
function getCar(make, model, value) {
  return {
    make,
    model,
    value,
  };
}
```

----

## Method definition shorthand

```js
// ES5
function getCar(make, model, value) {
  return {
    depreciate: function() {
      this.value -= 2500;
    },
  };
}
```

vs

```js
// ES6
// Method definition shorthand syntax omits `function` keyword & colon
function getCar(make, model, value) {
  return {
    depreciate() {
      this.value -= 2500;
    },
  };
}
```

----

## Arrow function

Simplified syntax

```js
var createGreeting = function(message, name) {
  return message + name;
};

// version 1
const arrowGreeting = (message, name) => {
  return message + name;
};

// version 2
const arrowGreeting = (message, name) => message + name;
```

----

### Arrow function

```js
const service = {
  foo: 'peter',
  delayLog(timeout) {
    setTimeout(
      function() {
        console.log(this.foo);
      }.bind(this),
      timeout
    );
  },
};
service.delayAction(500);
```

```js
// The this is applied to the outer scope
const service = {
  foo: 'peter',
  delayAction(timeout) {
    delayLog(() => {
      console.log(this.foo);
    }, timeout);
  },
};
```

<!-- .element: class="fragment" data-fragment-index="2" -->

----

### Arrow function

```js
class player {
  constructor(name) {
    this.name = name;
    this.elm = document.createElement('div');
    this.elm.addEventListener('click', this.sayHello);
  }
  sayHello() {
    console.log(this.name + ' say: "hello!"'); // Ouput: 'undefined say 'hello!"';
  }
}
```

```js
class player {
  constructor(name) {
    this.name = name;
    this.elm = document.createElement('div');
    // solution
    this.elm.addEventListener('click', () => this.sayHello());
  }
  sayHello() {
    console.log(this.name + ' say: "hello!"'); // Ouput: 'Peter say 'hello!"';
  }
}
```

----

### Arrow Function - When not to use!

Object Methods

```js
const person = {
    points: 23,
    // BAD
    score: () => {
        this.points++;   // no error but doesn't work
    },
};
```

Prototype methods

```js
function Car(make, colour) {
    this.make = make;
    this.colour = colour;
}

// BAD
Car.prototype.summarize = () => {
    // this will be undefined
    return `This car is a ${this.make} in the colour ${this.colour}`;
};
```

----

## Import / Export

ES Modules

```js
// service.js
export const MAX_LENGTH = 1000;
export class Car() {
    ...
}
const config = {
    ...
}
export default config;
```

```js
import config from './service';
import { MAX_LENGTH, Car } from './service';

import * as lib from './service';
console.log(lib.MAX_LENGTH);
const car = new lib.Car();

import config, { MAX_LENGTH, Car } from './service';
```

> Strict mode is default enabled  :)

----

## The class

```js
// ES6
class Car {
  constructor(model, value) {
    this.model = model;
    this.value = value;
  }

  depreciate(value) {
    this.value -= value;
  }
}
```

```js
// Idem as constructor function
function Car(model, value) {
  this.model = model;
  this.value = value;
}

Car.prototype.depreciate = function(value) {
  this.value -= value;
};
```

----

## Classes don't hoist

```js
// OK
var foo = new Foo(1, 2);
function Foo(x, y) {
  this.x = x;
  this.y = y;
}

// Bad: ReferenceError
var foo = new Foo(1, 2);
class Foo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
```

----

## The TypeScript class

```js
// TypeScript
class Car {
    model: String

    constructor(private make: String, private value: Number, model: String) {
        this.model = model;
    }

    depreciate() {
        this.value -= 2500;
    }
}
```

> Class fields support for ES is in stage-3

----

## String interpollation

Multiline with interpollation

```js
const message = 'world';
const template = `
        <div>
            <span>Hello ${message}</span>
        </div>
    `;
```

```js
const message = `1 and 1 make ${1 + 1}`;
console.log(message);
```

All inside ${ and } is treated as a JavaScript expression

> No more string concatenation!

----

## Default Argument Values

```js
var myFunction = function(a, b, c) {
  a = a || 10;
  b = b || 5;
  c = c || 8;
  return a * b * c;
};
```

```js
var myFunction = function(a = 10, b = 5, c = 8) {
  return a * b * c;
};
```

```js
const INITIAL_STATE = { ... }
var myFunction = function(state = INITIAL_STATE, action){
    ...
};
```

----

## Computed property keys

```js
const propName = 'name';

// creating a dynamic property
const obj = {};
obj[propName] = 'peter'

// computed property name
const user = {
    [propName]: 'peter'
};

console.log(user.name);         // output: peter
console.log(user[propName]]);   // output: peter

```

----

## Property accessors

```js
function getCar(make, model, value) {
  return {
    _value: value,
    get value() {
      return this._value;
    },
    set value(value) {
      if (value < 0) throw new Error('invalid value');
      this._value = value;
    },
  };
}

let car = getCar('Volvo', 'V70', 30000);
console.log(car.value); // OUTPUT: 30000
car.value = -1; // <- ERROR
```

<small>A less known ECMAScript 5 feature</small>

----

## Property accessors in class

```js
class Car {
  constructor(make, value) {
    this.make = make;
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (value < 0) throw new Error('invalid value');
    this._value = value;
  }
}
```

---

# ES6+
## More advanced ES6

> What you should know.

----

## Spread operator

```js
function volume(width, length, height) {
  return width * length * height;
}

console.log(volume(...[2, 8, 5]));
```

Modify an immutable array

```js
// mutable change
function addElement(array, element) {
  array.push(element);
  return array;
}

// immutable change, pure function (redux!)
function addElement(array, element) {
  return [...array, element];
}
```

----

### Spread operator

Clone an array

```js
// old way
const newArray = oldArray.splice(0);
```

```js
//es6 way
const newArray = [...oldArray];
```

Combine two arrays

```js
var x = [1, 2];
var y = [3, 4];
x.push(...y); // x is [1, 2, 3, 4]
```

----

### Spread operator

Works also on objects

```js
const myObject = { id: 12345, name: 'abc' }

// my immutable object change
const newObject = {
    ...myObject
    id: 54321
}
```

> Great for immutable objects!

----

## Promises

Handling async calls

```js
import axios from 'axios'
axios.get(`api/customers`)
     .then((res) => {
        console.log(res.data)
     })
     .catch(err => {
        console.log(err.message)
     });
```

----

### Promises

Nesting multiple calls

```js
import axios from 'axios'
axios.get(`api/customers?email=${email}`)
     .then((res) => {
        return axios.get(`api/orders?customerId=${res.data.id}`)
     })
     .then((res) => {
        if (!res.data.isActive) {
            throw new Error('hmm');
        }
     })
     .catch(err => {
        console.log(err.message)
     });
```

----

### Promises helper methods

Waiting for all promises to resolve

```js
import axios from 'axios'
const p1 = axios.get(`api/customers`)
const p2 = axios.get(`api/orders`)
Promise.all([p1, p2]).then(values => {
  console.log(values); // [resCustomers, resOrders]
});
```

Waiting for one of the promises

```js
Promise.race([requestPromise, timeoutPromise]).then(value => {
  console.log(value); // the result of the first promise
});
```

----

### Promises

Create a promise from a callback

```js
function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            resolve(position)
        },
        (error) => {
            reject(error)
        }
    ))
  });
}

//use
getCurrentPosition()
  .then(position => {
      console.log('position', position)
  })
```

> Don't mix callbacks and promises, go promises all the way

----

## Async / Await

Simplify async calls

```js
// with promises
export function getOrder(email) {
    return axios.get(`api/customers?email=${email}`)
        .then((res) => {
            return axios.get(`api/orders?customerId=${res.data.id}`)
        })
        .then((res) => {
            return res.data
        })
}

// with async/await
export async function getOrder(email) {
    const response = await axios.get(`api/customers?email=${email}`);
    const orderResponse = await axios.get(`api/orders?customerId=${response.data.id}`);
    return orderResponse.data;
}
```

----

### Async / Await

The result of an async function is a promise.

```js
// with async/await
export async function getOrder(email) {
    const response = await axios.get(`api/customers?email=${email}`);
    const orderResponse = await axios.get(`api/orders?customerId=${response.data.id}`);
    return orderResponse.data;
}

// You can access it as a promise or again async await.
getOrder(email)
    .then(order => {
        console.log(order)
    })
```

----

### Async / Await

Error handling with try/catch

```js
// with async/await
export async function getOrder(email) {
    try {
        const response = await axios.get(`api/customers?email=${email}`);
        const orderResponse = await axios.get(`api/orders?customerId=${response.data.id}`);
        return orderResponse.data;
    }
    catch(error) {
        console.log(error)
        return null;
    }
}

```

----

## Destructuring

Using an object to pass arguments

```js
var myConfig = {
  url: 'www.google.com/api',
  data: 'some value',
  methodType: 'POST',
};

// ES5
function makeAjaxRequest(config) {
  var url = config.url;
  var method = config.methodType;
  var data = config.data;
  console.log(url, method, data);
}
```

----

### Destructuring

Object Destructuring

```js
var myConfig = {
  url: 'www.google.com/api',
  data: 'some value',
  methodType: 'POST',
};

// ES6
function makeAjaxRequest(config) {
  var { url, methodType, data } = config;
  console.log(url, methodType, data);
}

// // Destructering at the function arguments
function makeAjaxRequest({ url, methodType, data }) {
  console.log(url, methodType, data);
}
```

----

### Destructuring

Array Destructuring

```js
// ES5 - Result of multiple promises
Promise.all([promiseGetUsers, promiseGetCustomers]).then(result => {
    const users = result[0];
    const customers = result[1];
    console.log(users, customers);
});

// ES6: Array destructuring result
Promise.all([promiseGetUsers, promiseGetCustomers]).then(result => {
    const [users, customers] = result;
    console.log(users, customers);
});

// Destructering at the function arguments
Promise.all([p1, p2]).then(([users, customers]) => {
    console.log(users, customers);
});
```

Less lines to write, less confusion

----

## Decorators

```js
// A simple decorator
@Annotation
class MyClass {}

function Annotation(target) {
  target.annotated = true; // Add a property on target
}
```

A decorator is just a function

```js
// A decorator with argument
@displayName('Auto')
class Car {}

function displayName(name) {
  return function(target) {
    target.displayName = name;
  };
}
```

----

### Decorators

TypeScript: To enable decorators you must specify the 'experimentalDecorators' flag

```
{
    "compilerOptions": {
        "experimentalDecorators": true
    }
}
```

ECMAScript

[babel-plugin-transform-decorators-legacy](https://www.npmjs.com/package/babel-plugin-transform-decorators-legacy)

---

# ES6+
## Less know features

> Now you know

----

## Rest operator

```js
const result = join('//', 'one', 'two', 'three'));
```

```js
// ES5, huum
function join() {
  var arg = Array.prototype.slice.call(arguments);
  var separator = arg[0];
  arg.shift();
  return arg.join(separator);
}
```

```js
// ES6: easy
function join(separator, ...values) {
  return values.join(separator);
}
```

----

## String interpollation

Tagged templates

```js
const id = 1;
const query = graphql`
        query {
            user(id: ${id})
        }
    `;

function grahql(literals, ...placeholders) {
  console.log('literals', literals);
  console.log('placeholder', placeholders);
  console.log('raw', literals.raw[0]);
}
```

You get the opportunity to pre process the template string literals plus the values.


----

## Generators

The basics

```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
}
```

```js
// get an iterator
var it = foo();

// get the result
it.foo();     // 1
it.foo();     // 2
it.foo();     // 3
...

// loop over
for(const i of it) {
    console.log(i)
}
```

----

### Generators

More practical example

```js
const activeUsers = filter(users, function(user) {
  return user.isActive;
});
const ages = map(activeUsers, function(user) {
  return user.age;
});
```

```js
function* map(items, transform) {
  for (item of items) yield transform(item);
}
function* filter(items, predicate) {
  for (item of items) if (predicate(item)) yield item;
}
```

```js
for (const user of activeUsers) {
  console.log(user);
}
```

----

## Symbols

Properties of an object can be either a string (as in ES5)
or symbol (new in ES6)

```js
var key = Symbol('key');
const myObject = {
  [key]: 'abc',
};
```

Can be used as private variable

```js
    var key = Symbol("key");

    class MyClass {
        constructor(privateData) {
            this[key] = privateData;
        }
    }

    var x = new MyClass('hello')
    console.log(JSON.stringify(x))    > Output: {}
```

---

# ES6+
## Array functions
> makes your live easier

----

## Array functions

Our array

```js
const companies = [
  { id: 1, name: 'Acme', category: 'finance', employees: 5},
  { id: 4, name: 'Globex', category: 'tech', employees: 1010},
  { id: 2, name: 'Soylent', category: 'food', employees: 120}
]
```

Usefull Array functions

- forEach
- map
- reduce
- filter
- sort
- find

----

### Array - for loops

Good old for loop

```js
for (let i=0; i < companies.length; i++) {
  console.log(item)
}
```

Prefere

```js
// forEach (loop over all items)
companies.forEach(item => {
  console.log(item)
})
```

or

```js
// ES6 version
for (let item of companies)
  console.log(item)
})
```

----

### Array - Mapping/Transformation

Good old for loop

```js
const companyNames = [];
for (let i=0; i < companies.length; i++) {
  names.push(companies[i].name)
}
```

Prefered

```js
const companyNames = companies.map(item => {
  return item.name;
}

// or even shorter
const companyNames = companies.map(item => item.name)
```

Other example

```js
const transformed = companies.map(item => {
  return {
    id: item.id.toString(),
    name: item.name;
  }
})
```

----

### Array - Calculation (sum, group, ...)

Old style

```js
const totEmployees = 0;
for (let i=0; i < companies.length; i++) {
  totEmployees += companies.employees
}
```

Prefere

```js
// reduce
const totEmployees = companies.reduce((acc, item) => {
  return acc + item.employees;
}, 0)
```

----

### Array - Filter, Find and Sort

```js
// filter
const bigCompanies = companies.filter(item => {
  return item.employees > 1000;
})
// filter: short version
const bigCompanies = companies.filter(item => item.employees > 1000)

// find
const acme = companies.find(item => item.name === 'Acme')

// sort
const sortedCompanies = companies.sort((a, b) => a.name > b.name)
```

<small>[JavaScript Higher Order Functions & Arrays Youtube](https://www.youtube.com/watch?time_continue=495&v=rRgD1yVwIvE)</small>

----

### Array - use cases

Chain functions

```js
const sortedNames = companies
  .map(item => item.name)
  .sort((a, b) => a > b)
```

Add item to array

```js
const name = 'Wolfoods';
const newId = companies.reduce((acc, item) => Math.max(acc, item.id), 0) + 1;
companies.push({
  id: newId,
  name
  category: 'science'
})
```

----

### Array - use cases

Remove an item from an array (don't use splice)

```js
const idToRemove = 999;
companies = companies.filter(item => item.id === idToRemove)
```

Update an item

```js
const company = companies.find(item => item.id === 1)
company.name = 'Other name'
```

---

# ES6+
## Objects & String

> Common functions

----

## Object functions

Common used object functions

```js
// Object.assign
const a = { name: 'peter' };
const b = Object.assign({}, a, { age: 12 }); // { name: 'peter', age: 12 }

const b = { ...a, age: 99 }; // { name: 'peter', age: 99 }
```

```js
// Object.keys
Object.keys({ name: 'peter', age: 12 }); // [ 'name', 'age' ]
```

```js
// Object.is
NaN == NaN; // false
isNan(NaN); // ES5: true
Object.is(NaN, NaN); // ES6+: true
```

----

## String functions

```js
// includes / startWidth / endWidth
'hello world'.indexOf('world'); // ES5

'hello world'.includes('world'); // true
'hello world'.startWith('hello'); // true
'hello world'.endsWith('world'); // true
```

```js
// other
'abc '.trim(); // 'abr'
'doo '.repeat(3) // 'doo doo doo'
```

```js
// string is iterable
for (const ch of 'abc') {
    console.log(ch);
}
```

```js
// spread operator on string
const chars = [...'abc'];   // ['a', 'b', 'c']

```

---

## Resources

* [You-Dont-Know-JS Book series](https://github.com/getify/You-Dont-Know-JS)
* [Frontendmasters - Kyle Simpson](https://frontendmasters.com/courses/)
* [JavaScript Weekly](http://javascriptweekly.com/)
* [TOP 10 JAVASCRIPT TRAPS FOR A C# DEVELOPER](http://prasadhonrao.com/top-10-javascript-traps-for-a-csharp-developer/)

---

# May JavaScript be with you
