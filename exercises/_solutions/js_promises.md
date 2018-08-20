# Exercise Javascript - Promises/Callbacks

## Callbacks

### log 'done' after 1 sec

```js
// log 'done' after 1 sec
console.log('start');
setTimeout(() => {
  console.log('done');
}, 1000);
```

### log 'done' after 1 second and start new timer for another second

```js
// log 'done' after 1 second and start new timer for another second
console.log('start');
setTimeout(() => {
  console.log('done');
  setTimeout(() => {
    console.log('end');
  }, 2000);
}, 1000);
```

## from SWAPI api get person name with id 1

Use 'superagent' module

```js
// from SWAPI api get person with id 1
import request from 'superagent';
console.time('total');
request.get('https://swapi.co/api/people/1').end((err, res) => {
  console.log(res.body.name);
  console.timeEnd('total');
});
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

Solution

```js
function getHomePlanetById(peopleId, callback) {
  request.get('https://swapi.co/api/people/1').end((err, res) => {
    if (err) {
      console.log('err:', err);
      callback(err);
      return;
    }
    request.get(res.body.homeworld).end((err2, res2) => {
      if (err2) {
        console.log('err:', err2);
        callback(err);
        return;
      }
      console.log(res2.body.name);
      callback(null, res2.body.name);
    });
  });
}
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

Solution

```js
function getNameById(peopleId, timeout, callback) {
  const timerId = setTimeout(() => {
    callback(new Error('timeout'))
  }, timeout);

  request.get(`https://swapi.co/api/people/${peopleId}`).end((err, res) => {
    clearTimeout(timerId);
    if (err) {
        callback(err);
        return;
    }
    callback(res.body.name)
  });
}
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
setTimeoutP(1000)
  .then(() => {
    console.log('done5');
    return setTimeoutP(1000);
  })
  .then(() => {
    console.log('finished');
  });
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

Solution

```js
function httpGet(url) {
    return new Promise((resolve, reject) => {
        request.get(url).end((err, res) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(res.body);
        });
    });
}

// use
httpGet('https://swapi.co/api/people/1')
    .then(data => console.log(data.name))
```

## make an promised based function that returns the person with home planet (SWAPI) based on the personId

```js
function getPersonAndHomeWorldById(peopleId) {
    let person;
    return httpGet(`https://swapi.co/api/people/${peopleId}`)
        .then(data => {
            person = data;
            return httpGet(data.homeworld);
        })
        .then(data => {
            person.homeworld = data;
            return person;
        })
}

getPersonAndHomeWorldById(1)
    .then(person => {
        console.log(person.name)
        console.log(person.homeWorld.name)
    })
```

## make an promised based function that returns the name of the person (SWAPI - people) based on the id, but throws an error when the call take to long.

```js
function getNameByIdP(peopleId, timeout) {
    //
    // implement me
    //
}
```

solution

```js
function getNameByIdP(peopleId, timeout) {
  return Promise.race([
    setTimeoutP(timeout),
    httpGet('https://swapi.co/api/people/1'),
  ]).then(person => {
    if (!person) {
      throw new Error('timeout');
    }
    return person;
  });
}

// use
getNameByIdP(1, 2000)
  .then(person => {
    console.log('person:', person.name);
  })
  .catch(err => {
    console.error('ERROR', err.message);
  });
```

## Refactor getPersonAndHomeWorldById and use async/await

```js
const person = await getPersonAndHomeWorldById(1);
console.log(person.name)
console.log(person.homeWorld.name)
```

Solution

```js
async function getPersonAndHomeWorldById(peopleId) {
    let person = await httpGet(`https://swapi.co/api/people/${peopleId}`)
    person.homeworld = await httpGet(person.homeworld);
    return person;
}

const person = await getPersonAndHomeWorldById(1);
console.log(person.name)
console.log(person.homeWorld.name)
```

