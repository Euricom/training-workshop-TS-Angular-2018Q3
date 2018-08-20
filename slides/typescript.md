---
title: TypeScript a superset of JavaScript
transition: 'fade'
---
# TypeScript
## a superset of JavaScript

<img src="./images/typescript.png" width="400px" /><br>
<small>by Peter Cosemans</small>

<small>
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

## Roadmap / features

**_ https://github.com/Microsoft/TypeScript/wiki/Roadmap _**

---

## tsconfig

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "commonjs",
    "lib": ["es2018", "dom"],
    "strict": true,
    "noImplicitAny": true,
    "esModuleInterop": true,
   },
}
```

[See compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

----

## tsconfig

| Option         | Remark              |
|----------------|---------------------|
| target         | Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'|
| module         | Specify module code generation: 'commonjs', 'amd', 'system', 'umd' or 'es2015'|
| lib            | Specify library files to be included in the compilation: ES5, DOM, ES2015, ... |

----

## tsconfig

| Option         | Remark              |
|----------------|---------------------|
| strict         | Enable all strict type-checking options: true/false|
| noImplicitAny  | Raise error on expressions and declarations with an implied 'any' type: true/false|
| esModuleInterop| Allow default imports from modules with no default export: true/false|

---

## Classes

ES6

```js
class Person {
    constructor(name) {
        this.name = name;
    }
}
```

Typescript

```ts
class Person {
  public name: string;      // property members
  private created: Date;
  constructor(name: string) {
    this.name = name;
    this.created = Date.now();
  }
}
```

----

## Classes

Member initialization via constructor

```ts
class Person {
  public firstName: string;
  public lastName: string;
  constructor(name: string, last: string) {
    this.firstName = name;
    this.lastName = last;
  }
}

// idem as
class Person {
    constructor(public firstName: string, public lastName: string) {
    }
}
```

---

## Type System

> Add typing to your JavaScript

----

### Type Inference

```ts
let foo = 123;      // foo is a `number`
let bar = "Hello";  // bar is a `string`
foo = bar;          // Error: cannot assign `string` to a `number`

// other amples
const result = 1 + 2;
const name = 'Peter';
const zoo = ['Rhino', 'Snake', 'Elephant'];

// structering
cont foo = {
    a: 1234,
    b: 'abc',
}
foo.a = 'hello';    // Error

const bar = [1,2,3];
bar[0] = "hello";   // Error

// destructering
const bar = [1, 2]
let [a, b] = bar;
a = "hello";        // Error
```

----

### Type Inference

Type inference is not always possible

```js
// foo has 'any' type
const foo = (a,b) => { return a + b };
```

***--noImplicitAny***

> The flag --noImplicitAny instructs the compiler to raise an error if it cannot infer the type of a variable

----

### Explicit type

```ts
let foo: number = 123;      // foo is a `number`
let bar: string = "Hello";  // bar is a `string`

function identity(num: number): number {
    return num;
}

function setOptions(options: { size: number, type: string}) {
    // ...
}

function findData(query: string,
                  callback: (err: any, data: any) => void): void {
    // ...
}
```

----

### Compile time vs Run Time

> TypeScript provide compile time type checking, NOT at runtime!

```ts
function add(x: number, y: number): number {
    return x + y;
}

const value: any = '12'
const c = add(a, 10);      // c === 1210
```

----

### Primitive Types

```ts
let num: number;
let str: string;
let bool: boolean;
let boolArray: boolean[];

num = 123;
num = 123.456;
num = '123'; // Error

str = '123';
str = 123; // Error

bool = true;
bool = false;
bool = 'false'; // Error

boolArray = [true, false];
boolArray[0] = 'false'; // Error!
boolArray = 'false'; // Error!
```

----

### Interfaces

To compose multiple type annotations into a single named annotation

```ts
interface IName {
    first: string;
    last: string;
}

let name: IName;
name = {           // Error : `second` is missing
    first: 'John'
};
name = {           // Error : `second` is the wrong type
    first: 'John',
    last: 1337
};
```

----

### Interfaces

```ts
// declaration & assignment
let name: IName = {
    first: 'John',
    last: 'Bar',
}

// function members
interface IName {
    first: string;
    last: string;
    getFullName(): string;     // can contain function
}

let name: IName = {
    first: 'John',
    last: 'Bar',
    getFullName() { return `${first} ${last}'; }
}

```

----

### Interfaces

Classes can implement interfaces

```ts
class Person implements IName {
    first: string;
    last: string;
    constructor(first: string, last: string) {
        this.first = first;
        this.last = last;
    }
    getFullName() {
        return `${this.first} ${this.last}`;
    }
}
const personName: IName = new Person();

// simplified version
class Person implements IName {
    constructor(public first: string, public last: string) {}
    getFullName() {
        return `${this.first} ${this.last}`;
    }
}

```

----

### Optional members

```ts
interface IName {
    first: string;
    last?: string;
}

function identity(num: number, type?: string) {
    // ...
}

```

----

### Enums

```ts
// number enum
enum Direction {
    Up = 1,   // default is 0
    Down,
    Left,
    Right,
}

let direction = Direction.Up;
direction = 2;   // idem as Direction.Down
direction = "not a member of direction"; // Error

// string enum
enum MediaTypes {
    JSON = "application/json",
    XML = "application/xml"
}

let type = MediaTypes.JSON;      // type === application/json
type = MediaTypes["XML"];        // type === application/xml
MediaTypes["application/json"];  // undefined -> No Reverse Mapping
```

----

### Special Types

```ts
// any type (implicit with --noImplicitAny=false)
let power = '123';
power = 123;

// void type
function log(message): void {
    console.log(message);
}

// union type
const command: string[] | string
command = 'filter'
command = ['filter', 'map']

// alias
type universalNumber = string | number;
const num: universalNumber = '123';
num = 123;
```

----

### Generics

Like in C# or Java

```ts
// typed promise return
import axios from 'axios'
function getCustomers(): Promise<ICustomer> {
    return axios.get('api/customers')
        .then(res => {
            return res.data;
        })
}

// generic function (get)
function set(key: string, value: any): void {
    return localStorage.set(key, JSON.stringify(value))
}
function get<T>(key: string): T {
    return JSON.parse(localStorage.get(key))
}
const value = get<number>('MY_NUMBER_KEY');   // value is number
const value = get<string>('MY_STRING_KEY');   // value is string

```

---

# Declaration file

You can tell TypeScript that you are trying to describe code that exists elsewhere

```ts
// assume foo is declared in a JS file
foo = 123; // Error: `foo` is not defined

// declare if it already exist
declare var foo: number;
foo = 123; // allowed
```

You can put these declaration in a ```.d.ts``` file.

```bash
declarations.d.ts
```

----

### Declaration file

Examples

```ts
// variable
declare var process: any;

// global function
declare function greet(greeting: string): void;

// interface
interface Point {
    x: number; y: number;
}
declare var myPoint: Point;

// class
declare class Greeter {
    constructor(greeting: string);

    greeting: string;
    showGreeting(): void;
}
```

----

### Declaration file - 3th party

Bundled with library

```bash
yarn add date-fns
<root>/node_modules/date-fns/typings.d.ts
```

Separate package

```bash
yarn add clone
yarn add @types/clone --dev   // be aware of outdated type files!
```

Not available

```ts
// specify in declaration.d.ts
declare module 'my-exotic-lib'
```

---

# Resources

* [Rangle.IO Typescript](https://angular-2-training-book.rangle.io/handout/features/typescript.html)
* [TypeScript Weekly](https://www.typescript-weekly.com/)
* [Why use TypeScript, good and bad reasons](https://itnext.io/why-use-typescript-good-and-bad-reasons-ccd807b292fb)
* [The Shocking Secret About Static Types](https://medium.com/javascript-scene/the-shocking-secret-about-static-types-514d39bf30a3)
