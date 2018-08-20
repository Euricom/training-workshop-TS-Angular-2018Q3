# Exercise ES6

---

## Array/Object

Find an item in the array

```js
const ar = [ { name: 'jane' }, { name: 'john'}, { name: 'ike'} ]

// Find item with name 'john'
```

Transform the array

```js
const users = [
    { name: 'jane', age: 12 },
    { name: 'john', age: 22 },
    { name: 'ike', age: 1}
]

// Create a list of user names
```

Reduce the array to a single value

```js
const users = [
    { name: 'jane', age: 12 },
    { name: 'john', age: 22 },
    { name: 'ike', age: 1}
]

// Calculate total age of all users
```

---

## Immutability

Mutate the following object

```js
import deepfreeze from 'deep-freeze';

let obj = { name: 'peter', age: 25 };
deepfreeze(obj);

// Set the age to 52
```

Add an element to the array

```js
const ar = [ 12, 33, 999 ]
deepfreeze(ar);

// Add the number 1000 to the array
```

Remove an element from the array

```js
let ar = [ { name: 'jane' }, { name: 'john'}, { name: 'ike'} ]
deepfreeze(ar);

// Remove john from the array
```

Update an element in the array

```js
let ar = [
    { name: 'jane', age: 12 },
    { name: 'john', age: 22 },
    { name: 'ike', age: 1}
]
deepfreeze(ar);

// Set the age of ike to 20
```

Take a part of an array

```js
const ar = [ 1, 5, 6, 1000 ]
deepfreeze(ar)

// Take the second & third element
```

---

## ES6 Katas

See [http://es6katas.org/](http://es6katas.org/)
Do the following exercises:

- Promise
    + Basics
    + Creation
- Array
    + [].find()
    + [].entries()
    + [].keys()
- Destructuring
    + Array
    + Object
- Object literal
- Rest operator
- Spread operator


