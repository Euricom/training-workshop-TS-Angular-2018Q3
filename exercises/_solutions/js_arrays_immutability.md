# Solutions - ES6 exercises

---

## Array/Object

Find an item in the array

```js
const ar = [ { name: 'jane' }, { name: 'john'}, { name: 'ike'} ]

// Find item with name 'john'
const item = ar.find(item => item.name === 'john');
```

Transform the array

```js
const users = [
    { name: 'jane', age: 12 },
    { name: 'john', age: 22 },
    { name: 'ike', age: 1}
]

// Create a list of user names
const names = users.map(item => item.name)
```

Reduce the array to a single value

```js
const users = [
    { name: 'jane', age: 12 },
    { name: 'john', age: 22 },
    { name: 'ike', age: 1}
]

// Calculate total age of all users
const totalAge = users.reduce((sum, item) => {
    return sum + item.age;
}, 0)
```

---

## Immutability

Mutate an object

```js
let obj = { name: 'peter', age: 25 };
deepfreeze(obj);

// set the age to 52

// ES6
obj = Object.assign({}, obj, {
    age: 52,
})

// ES8
obj = {
    ...obj,
    age: 52,
}
```

Add an element to the array

```js
let ar = [ 12, 33, 999 ]
deepfreeze(ar);

// Add the number 1000 to the array
ar = [
    ...ar,
    1000
]
```

Remove an element from the array

```js
let ar = [ { name: 'jane' }, { name: 'john'}, { name: 'ike'} ]
deepfreeze(ar);

// remove john from the array
ar = ar.filter(item => item.name !== 'john')
```

Update an element in the array

```js
let ar = [
    { name: 'jane', age: 12 },
    { name: 'john', age: 22 },
    { name: 'ike', age: 1}
]
deepfreeze(ar);  // only freeze the array, not the objects in the array

// set the age of ike to 20
ar = ar.map(item => (item.name == 'ike') ? { ...item, age: 20 } : item)
```

Take a part of an array

```js
const ar = [ 1, 5, 6, 1000 ]
deepfreeze(ar);

// Take the second & third element
const subArray = ar.slice(1, 2)
```
