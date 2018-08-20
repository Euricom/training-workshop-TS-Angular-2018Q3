---
title: Javascript Unit Testing
transition: 'fade'
---
## Javascript Unit Testing
<img src="./images/testing.jpeg" width="500px" /><br>
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
    margin: 0;
}
.reveal a {
    font-size: 100%;
}
.reveal li {
    font-size: 80%;
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

# What do I need?

> There are so many frameworks & libraries

----

## Test Frameworks

|Framework  | Remark                               |
|-----------|--------------------------------------|
|[Karma](https://karma-runner.github.io/1.0/index.html) | Browser test runner from Google using [Jasmine](https://jasmine.github.io/) test framework. Default used by Angular|
|[Mocha](https://mochajs.org/]) | Flexible test runner & framework, typical used with [Chai](http://chaijs.com/) assertion library & [Sinon.JS](http://sinonjs.org/) mock library. |
|[Jest]([https://facebook.github.io/jest/]) | Modern, universal & fast test runner & test framework. Using [JSDom](https://github.com/tmpvar/jsdom) for browser testing.|

---

# Jest

> Delightful JavaScript Testing

----

## Why Jest

* Build by facebook
* Easy to get started and powerfull to extend
* Instant, fast and user friendly
* Out of the box support for (no config):
    - Babel (ES6+)
    - JSDom (no browser)
    - Code coverage
    - Promises and async testing
    - Standard Assertion matchers & mock support
    - Advanced watch support

----

## Getting started
### My Unit Test

calc.js (my module to test)

```js
export function sum(a, b) {
  return a + b;
}
```

cals.spec.js (my unit test)

```js
import { sum } from './sum';
test('adds 1 + 2 to equal 3', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
});
```

----

## Getting started
### JavaScript

install dependecies

```bash
$ yarn add jest --dev
```

config (package.json)

```json
{
    "scripts": {
        "test": "jest"
    }
}

```

> Optional you can add Babel & .babelrc to use ES2019+ features.

----

## Getting started
### TypeScript

install dependecies

```bash
$ yarn add jest ts-jest jest-preset-typescript @types/jest --dev
```

config (package.json)

```json
{
    "scripts": {
        "test": "jest"
    },
    "jest": {
        "preset": "jest-preset-typescript",
    },
}
```

----

## Getting started
### Run

```bash
$ yarn test
 PASS  ./sum.spec.js
  ✓ adds 1 + 2 to equal 3 (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.129s
Ran all test suites.
✨  Done in 1.79s.
```

----

## Auto Watch

Runs test automatically.
Config.

```json
// package.json
{
    ...
    "scripts": {
        "test": "jest --watch"
    }
}
```

Use --watchAll when not running inside git repo.

----

## Auto Watch

Run (yarn test)

```bash
PASS  src/sum.spec.ts

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.747s, estimated 1s
Ran all test suites.

Watch Usage
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```


---

# Basic use

> Start writing those unit tests

----

## Understand AAA in Unit Testing

```js
test('description', () => {
    // ARRANGE
    // Here we will arrange the test, in other words we
    // will do the necessary setup of the test.
    const sut = new Stack();

    // ACT
    // In this step we will execute the test
    sut.push('abc')

    // ASSERT
    // In this step we will check and verify the returned
    // result with expected results
    expect(sut.length).toBe(1);
})
```

AAA is just a guideline to make your unit tests more readable. It is perfectly OK to deviate if you have a good reason to do so.


----

## Using Matchers

toBe (===)

```js
test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});
```

toEqual (checks every property)

```js
test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
});
```

----

### Using Matchers

Truthiness

```js
test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
});

test('zero', () => {
    const z = 1;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).toBeTruthy();
    expect(z).not.toBeFalsy();
});
```

----

### Using Matchers

Numbers

```js
test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);

    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
});

test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    expect(value).not.toBe(0.3);    // It isn't! Because rounding error
    expect(value).toBeCloseTo(0.3); // This works.
});
```

----

### Using Matchers

Strings

```js
test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
});
```

Arrays

```js
const shoppingList = [
  'kleenex',
  'trash bags',
  'beer',
];

test('the shopping list has beer on it', () => {
    expect(shoppingList).toContain('beer');
});
```

----

### Using Matchers


Exceptions

```js
function fn() {
    throw new Error('bad bad bad');
}

test('compiling android goes as expected', () => {
    expect(fn).toThrow();
    expect(fn).toThrow(ConfigError);

    // You can also use the exact error message or a regexp
    expect(fn).toThrow('you are using the wrong JDK');
    expect(fn).toThrow(/JDK/);

    // warp a function with arguments
    expect(() => testMe(1, 2, 3)).toThrow();
});
```

And More

[https://facebook.github.io/jest/docs/expect.html](https://facebook.github.io/jest/docs/expect.html)

----

## Grouping

```js
describe('myCalculator', () => {
    test('add ...', () => {
        ...
    })
    test('substract ...', () => {
        ...
    })
})
```

Nested grouping

```js
describe('myCalculator', () => {
    describe('add', () => {
        test('2 numbers', () => {
            ...
        })
    })
    ...
})
```

----

## Setup and teardown

```js
beforeAll(() => {
    // setup at beginning of file
})

beforeEach(() => {
    // setup before each test
})

afterEach(() => {
    // cleanup after each
})

afterAll(() => {
    // file cleanup
});

test('this has ...', () => { ... })
```

----

### Setup and teardown

Scoped setup/teardown

```js
describe('Calculator', () => {

    beforeEach(() => {
    })

    describe('Sum', () => {

        beforeEach(() => {
        })

        test('add ...', () => {
        })
    })

    test('substract ...', () => {
    })
})
```

----

## Config & Helper

Install additional matchers

```bash
yarn add jasmine-expect --dev
```

Add config in your package.json

```json
// package.json
{
    ...
    "jest": {
        "verbose": true,
        "testEnvironment": "node",      // default: 'jsdom'
        "setupTestFrameworkScriptFile": "<rootDir>/jestSetup.js"
        ...
    }
}
```

----

### Config & Helper

Helper file: ```jestSetup.js```

```js
import 'jasmine-expect';        // add extra jasmine matchers

// mock localStorage & sessionStorage
const mock = () => {
  let storage = {};
  return {
    getItem: key => key in storage ? storage[key] : null,
    setItem: (key, value) => storage[key] = value || '',
    removeItem: key => delete storage[key],
    clear: () => storage = {},
  };
};

Object.defineProperty(window, 'localStorage', {value: mock()});
Object.defineProperty(window, 'sessionStorage', {value: mock()});
```

More [https://facebook.github.io/jest/docs/en/configuration.html#content](https://facebook.github.io/jest/docs/en/configuration.html#content)

----

## Special tests cases

Pending tests

    test('the value of .....');

Exclusive tests

    describe.only   only this block
    test.only       only run this test

Inclusive tests

    describe.skip   exclude/ignore this block
    test.skip       exclude/ignore this test

---

# Async Testing Patterns

> All my Javascript is asynchronous

----

### The service to test

```js
// myService.js
export function find(query) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (!query) {
            return reject('bad value')
        }
        resolve('abc')
    }, 100)
  });
}

// usage
const query = 'select * from table'
find(query)
    .then(result => {
        console.log(result);  // output: abc
    })
    .catch(error => {
        // error when query is falsy
        console.log(error);   // output: bad value
    })
```

----

## Resolved promise

```js
// myService.spec.js
import { find } from './myService'

describe('myService', () => {
    test ('find', () => {
        // DON'T forget to return the promise here!
        return find('query')
            .then(data => {
                expect(data).toEqual('abc')
            })
        })
    });
});
```

> Returning the promise let the test wait until the end.

----

## Rejected promise

And it works with errors too :)

```js
test('the find fails with an error', () => {
    // Make sure to add expect.assertions to verify that a
    // certain number of assertions were called.
    expect.assertions(1);
    return find(null).catch(e =>
        expect(e).toMatch('bad')
    );
});
```

----

## Resolves / rejects matchers

```js
// myService.spec.js
import { find } from './myService'

describe('myService', () => {
    test ('success find', () => {
        // Be sure to return the assertion
        return expect(find('query')).resolves.toEqual('abc');
    });
});
```

```js
// myService.spec.js
import { find } from './myService'

describe('myService', () => {
    test ('failed find', () => {
        // Be sure to return the assertion
        return expect(find(null)).rejects.toMatch('bad');
    });
});
```

---

# Mocks

> Test the untestable :)

----

## A Use Case

> We want to test a service to get a Starwars movie.

```ts
// the entity type
export class Movie {
  title: string;
  episodeId: number;
  openingCrawl: string;

  constructor(attr: any) {
    Object.assign(this, attr);
  }
}
```

----

### A Use Case

```js
import axios from 'axios';

export async function getAllMovies() {
  const res = await axios.get('https://swapi.co/api/films/');
  return res.data.map((item) => {
    return new Movie(mapMovie(item));
  });
}

function mapMovie(resource) {
  return {
    title: resource.title,
    episodeId: resource.episode_id,
    openingCrawl: resource.opening_crawl,
  };
}

```

----

### A Use Case

We need to:

- ***TEST:***
    - That the property mapping is performed successfull
    - That a 'Movie' entity is created and returned
    - That a call is made to retrieve the movies on url: https://swapi.co/api/films/

- ***AVOID:***
    - Make the fysical call to the API server

----

### A Use Case - The Test

```ts
import axios from 'axios';
import { getMovie, Movie } from './movieService';

test('getMovie', async () => {
    // arrange
    const testResponse = {
        data: {
        title: 'myMovie',
        episode_id: 1,
        opening_crawl: 'abc',
        },
    };
    const mock = jest.spyOn(axios, 'get')
        .mockReturnValue(Promise.resolve(testResponse));

    // act
    const movie = await getMovie(1);

    // assert
    expect(mock).toBeCalledWith('https://swapi.co/api/films/1');
    expect(movie).toBeInstanceOf(Movie);
    expect(movie.episodeId).toBe(1);
    expect(movie.openingCrawl).toBe('abc');
});

```

----

## Mock Functions

Create a mock function

```js
// create the mock (replace existing function)
const myMock = jest.spyOn(object, 'get')

// you can call the function
object.get('1');

// and verify it was called correctly
expect(myMock).toBeCalled();
expect(myMock).toBeCalledWith('1');
expect(myMock.mock.calls.length).toBeGreaterThan(0);
expect(myMock.mock.calls[0][0]).toBe('1');   // first call, first argument
```

----

### Mock Functions

```js
// create the mock function that returns 100
const getMock = jest.spyOn(object, 'get').mockReturnValue(100)

// you can call the function
const getResult1 = getMock();     // or object.get();
const getResult2 = getMock();

// and verify it was called correctly
expect(getMock).toHaveBeenCalledTimes(2)
expect(getResult1).toBe(100);
expect(getResult2).toBe(100);
```

----

### Mock Functions - More

```js
// you can create a mock function directly
const sayHelloMock = jest.fn()
                         .mockReturnValueOnce('hello')
                         .mockReturnValueOnce('world')

const say1 = sayHelloMock();
const say2 = sayHelloMock();

expect(result2).toBe('hello');
expect(result3).toBe('world');
```

----

#### Mock Functions - More

With custom implementation

```js
// throw an error
jest.fn().mockImplementation(() => { throw new Error('bad') })
jest.fn(() => { throw new Error('bad') })

// return a resolved promise
jest.fn().mockImplementation(() => Promise.resolve(100)))
jest.fn().mockReturnValue(Promise.resolve(100));
jest.fn(() => Promise.resolve(100)))

// return a rejected promise
jest.fn(() => Promise.reject('bad bad')))

// call a callback
jest.fn(cb => cb(null, true));
```

----

### Verify mock expectations

```js
// string matching
myMock('The quick brown fox...');
expect(myMock).toHaveBeenCalled();
expect(myMock).toHaveBeenCalledWith('1');
expect(myMock).toHaveBeenCalledWith(expect.anything());
expect(myMock).toHaveBeenCalledWith(expect.stringContaining('brown'));
```

```js
// array containing
const a = [1, 2, 3];
myMock(a);
expect(myMock).toHaveBeenCalledWith(expect.arrayContaining([1, 2]));
expect(a).toEqual(expect.arrayContaining([1, 2]))
```

```js
// object containing
const obj = { name: 'john', id: 123 };
myMock(obj);
expect(myMock).toHaveBeenCalledWith(expect.objectContaining({
    name: 'john',
    id: expect.any(Number)
}));
expect(obj).toEqual(expect.objectContaining({ name: 'john' }))
```

----

## Mock Dependency - import

A sample user repository

```js
// userRepo.js
import { db } from './db'
import { eventBus } from './eventBus'

export class UserRepo {
    save(user) {
        eventBus.publish('save', user)
        return db.save(user); // this call to the DB
    }
}
```

----

### Mock Dependency - import

You can mock an import completely

```js
import { UserRepo } from './userRepo'
import { db } from './db'
import { eventBus } from './eventBus'
jest.mock('./userModel');
jest.mock('./eventBus');

test('userRepo', () => {

    // arrange
    const user = { id: 12, name: 'John' };
    db.save.mockReturnValue(Promise.resolve(user))
    const sut = new UserRepo();

    // act
    return sut.save(testUser)
        .then(user => {
            // assert
            expect(db.save).toHaveBeenCalledWith(user)
            expect(eventBus.publish).toHaveBeenCalledWith('save', user)
        })
})
```

---

## SnapShop Testing

How to we this this?

```js
// mailFormatter.js
export function getBody(model) {
  return `
    <html>
        <body>
            <h1>Welcome ${model.name}</h1>
            <p>
                Bla bla bla
            </p>
            <p>Regards ${model.sender}</p>
        </body>
    </html>
  `
}
```

----

### SnapShop Testing

```js
import { getBody } from './mailFormatter'

test('getBody with default model', () => {
    // arrange
    const model = {
        name: 'Mr Janssens',
        sender: ' Joo Bar'
    }

    // act
    const formattedList = getBody(model);

    // assert
    expect(formattedList).toMatchSnapshot()
})
```

To update the snapshot

```bash
jest --updateSnapshot
```

> You need to commit all snapshots and keep them in version control

---

## Fake timers

Fake timers is a synchronous implementation of 'setTimeout'.

```js
// replace the global setTimeout, setInterval, nextTick and stop time.
const clock = jest.useFakeTimers();

// The code won't do anything as the timer is not running now.
setTimeout( function() { console.log('One second has elapsed.'); }, 1000 );

// Fast-forward until all timers have been executed
jest.runAllTimers();
jest.runTimersToTime(1000);     // fast-forward specific time

// now the timer function is executed
```

