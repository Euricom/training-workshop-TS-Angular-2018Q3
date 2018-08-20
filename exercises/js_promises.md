# Exercise Javascript - Promises/Callbacks

## Callbacks

### log 'done' after 1 sec

```js
// log 'done' after 1 sec
console.log('start');
//
// add your code here
//
```

### log 'done' after 1 second and start new timer for another second

```js
// log 'done' after 1 second and start new timer for another second
console.log('start');
//
// add your code here
//
```

## from SWAPI api get person name with id 1

Use 'superagent' module

```js
// from SWAPI api get person with id 1
import request from 'superagent';
//
// add your code here
//
```

## make an async function that returns the name of home planet (through SWAPI)based on the personId. Handle the error when an error occures.

You need to make two api calls

    https://swapi.co/api/people/{peopleId}
    https://swapi.co/api/planets/{homeWorldId}

```js
function getHomePlanetById(peopleId, callback) {
    //
    // implement me
    //
}

// use the function
getHomePlanetById(1, (err, planet) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(planet.name);
});
```

## make an async function that returns the name of the person (SWAPI - people) based on the id, but return an error when the call take to long.

```js
// make a async function that returns the name of the people
// based on the id, but returns an error when the call take to long.
function getNameById(peopleId, timeout, callback) {
  //
  // implement me.
  //
}

// use the function
getNameById(1, 1000, (err, name) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(name);
});
```

## Promises

### log 'done' after 1 second and start new timer for another second, but now promised based.

You can use the promised based timer

```js
function setTimeoutP(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
```

Solution

```js
// log 'done' after 1 sec
console.log('start');
//
// add your code here
//
```

## create a promised based wrapper around superagent-get and use it

```js
function httpGet(url) {
    //
    // implement me
    // return a Promise!
    //
}
```

## make an promised based function that returns the person with home planet (SWAPI) based on the personId

```js
function getPersonAndHomeWorldById(peopleId) {
    //
    // implement me
    //
}

getPersonAndHomeWorldById(1)
    .then(person => {
        console.log(person.name)
        console.log(person.homeWorld.name)
    })
```

## make an promised based function that returns the name of the person (SWAPI - people) based on the personId, but throws an error when the call take to long.

```js
function getNameByIdP(peopleId, timeout) {
    //
    // implement me
    //
}
```

## Refactor getPersonAndHomeWorldById and use async/await

```js
const person = await getPersonAndHomeWorldById(1);
console.log(person.name)
console.log(person.homeWorld.name)
```
