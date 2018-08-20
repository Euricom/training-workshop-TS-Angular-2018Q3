---
title: Javascript Promises
transition: 'fade'
---

# Javascript Promises

<img src="./images/promises.jpg" width="500px">

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

## Callback usage

```js
function getCustomer(id, callback) {
    try {
        const result = doSomeAction();
        callback(null, result);
    }
    catch(err) {
        callback(err);
    }
}

// use the function with callback
getCustomer(123, function(err, result) {
    if (err) {
        console.log('ERROR', err);
    }
    console.log(result);
})
```

----

## Promise Usage

```js
const promise = new Promise(function(resolve, reject) {

    // Do an async task async task and then...

    if(/* good condition */) {
        resolve('Success!');
    }
    else {
        reject('Failure!');
    }
});
```
```js
// use the promise
promise
    .then((result) => {
        console.log(result);  // output: 'Success!'
    })
    .catch((error) => {
        /* error == 'Failure!' */
    })
```

----

## Promise vs Callback

```js
// callback
getCustomer(123, function(err, result) {
    if (err) {
        console.log('ERROR', err);
    }
    console.log(result);
})

// promise
getCustomer(123)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log('ERROR', err);
    })
})
```

----

## Example: promise based timer

```js
function setTimeoutP(timeout) {
    return new Promise(resolve => {
        setTimeout(() => {
            if (timeout < 0) {
                return reject(new Error('bad timeout value'))
            }
            resolve('done');
        }, timeout);
    });
}

// use
setTimeoutP(1000).then(() => {
    console.log('it is done');
})

setTimeoutP(-1).catch((err) => {
    console.log('Error', err);
})
```

---

# Chaining promises

```js
setTimeoutP(1000)
    .then(() => {
        console.log('first');
        return setTimeoutP(2000);
    })
    .then(() => {
        console.log('second');
        return 'happy';       // by returning a value
                              // its wrapped in a new promise
    })
    .then((result) => {
        console.log(result);  // output: happy
    })
```

----

### Passing promises over functions

```js
function action(timeout) {
    // return the promise for continues handling
    return setTimeoutP(timeout)
        .then(() => {
            console.log('first');
            return setTimeoutP(timeout * 2);
        })
        .then(() => {
            console.log('second');
            return 'happy';
        })
}

// usage
action
    .then(result => console.log(result)); // output: happy
```

----

## Resolved or Rejected Promise

```js
// resolved promise
const promise = Promise.resolve('hello');

// rejected promise
const promise = Promise.reject(new Error('bad bad'));
```

```js
function asyncAction(arg) {
    if (!arg) {
        return Promise.reject('bad bad');
    }
    return getCustomer();  // get customer returns an promise
}
```

---

# Combine promises
> One by one, all or just the first one

----

## Promise.all

```js
Promise.all([promise1, promise2]).then(function(results) {
    // Both promises resolved
    // Promise.all waits until both are finished
    const resultPromise1 = results[0];
    const resultPromise2 = results[0];
})
.catch(function(error) {
    // One or more promises was rejected
});
```

----

## Promise.race

```js
Promise.race([promise1, promise2]).then(function(resultFirstPromise) {
    // Only the first promise resolves,
    // the result of the second promise is lost
})
.catch(function(error) {
    // One or more promises was rejected
});
```

