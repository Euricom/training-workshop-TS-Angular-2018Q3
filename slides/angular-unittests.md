---
title: Angular Unit Testing
transition: 'fade'
"verticalSeparator": "^\\*\\*\\*"
---

# Angular Unit Testing

<img src="./images/testing.jpeg" width="350px" /><br>
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

# Karma

> The default test runner of @Angular/cli

<!-- prettier-ignore -->
***

## Karma & Jasmine

@Angular/cli

Standard provided by @Angular/cli and ready to use.

- Runs test via karma/jasmine in Chrome
- Runs coverage via istanbul
- Transpiles and bundles via webpack
- Auto watch on file changes
- Configuration: karma.config.js

```js
// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
module.exports = function (config) {
  config.set({
     ...
  })
}
```

<!-- prettier-ignore -->
***

## Sample test

```js
describe('my first test', () => {
  it('should work', () => {
    expect(true).toEqual(true);
  });
});
```

<!-- prettier-ignore -->
***

## Run

```bash
$ ng test
WARN [karma]: No captured browser, open http://localhost:9876/
INFO [karma]: Karma v1.4.1 server started at http://0.0.0.0:9876/
INFO [launcher]: Launching browser Chrome with unlimited concurrency
INFO [launcher]: Starting browser Chrome
INFO [Chrome 57.0.2987 (Mac OS X 10.11.6)]: Connected on socket LdLTZc_QYLowy4ubAAAA with id 44585936
Chrome 57.0.2987 (Mac OS X 10.11.6): Executed 4 of 4 SUCCESS (0.176 secs / 0.16 secs)
```

> Any file change will trigger test run

---

# Jest

> Delightful JavaScript Testing

<!-- prettier-ignore -->
***

## Why Jest

- Fully support for Angular
- 95% compatible with Jasmine
- It's fast!
  - JSDom (no browser)
  - Advanced change detection
- Snapshot testing

<!-- prettier-ignore -->
***

## Setup for Angular

Add jest and dependencies

```bash
yarn add jest jest-preset-angular @types/jest --dev
```

Add jest config to package.json

```json
"jest": {
  "preset": "jest-preset-angular",
  "setupTestFrameworkScriptFile": "<rootDir>/src/setupJest.ts"
}
```

Create `setupJest.ts`

```js
import 'jest-preset-angular';

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance'],
});
```

<!-- prettier-ignore -->
***

## Jest vs Karma/Jasmine

```js
// mocked function
jest.fn();
jasmine.createSpy('name');

// mocked function with return
jest.fn().mockReturnValue(2);
jasmine.createSpy('name').and.returnValue(2);

jest.spyOn(foo, 'setBar').mockImplementation(() => {
  throw new Error('bad');
});
spyOn(foo, 'setBar').and.callFake(() => {
  throw new Error('bad');
});
```

Jasmine: [http://ricostacruz.com/cheatsheets/jasmine.html](http://ricostacruz.com/cheatsheets/jasmine.html)

---

# Angular Unit testing

> More then just unit testing

<!-- prettier-ignore -->
***

## Start with

Start testing with

1.  Plain old JS code: functions, classes, ...
2.  Pipes
3.  Services
4.  RouteGuards
5.  RouteResolvers
6.  Services with http
    .
    .
7.  Components (but first extract most logic into service or POJ)

<!-- prettier-ignore -->
***

## Test Pipes

```js
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'capitalise',
})
export class CapitalisePipe implements PipeTransform {
  transform(value) {
    return value.toUpperCase();
  }
}
```

<!-- prettier-ignore -->
***

### Test Pipes

The test

```js
import { CapitalisePipe } from './capitalisePipe'

describe('Pipe: CapitalisePipe', () => {
    let pipe
    beforeEach(() => {
        pipe = new CapitalisePipe()
    }))

    test('it should throw if not used with a string', () => {
        expect(pipe.transform('hello')).toEqual('HELLO')
        //must use arrow function for expect to capture exception
        expect(() => pipe.transform(undefined)).toThrow()
    })
})
```

> It is just a JS class

<!-- prettier-ignore -->
***

## Test Services

```js
test('getProducts', () => {
    const resource = [
        { id: 123, title: 'abc' },
        { id: 333, title: 'abc' }
    ];
    // mock the dependecies
    const httpClient = {
        get: jest.fn().mockImplementation(() => {
                return Observable.of(resource);
        })
    };
    const service = new BlogService(httpClient as any);
    const promise = service.getBlogs().toPromise();
    return promise.then(products => {
        expect(blogs).toBeDefined();
        expect(blogs[0].constructor.name).toEqual('Blog');
        expect(blogs[0].id).toEqual(123);
    });
});
```

<!-- prettier-ignore -->
***

## Async

```js
import { async } from '@angular/core/testing'

...

test('myTest', async(() => {
    service.doSomething()
        .subscribe((result) => {
            expect(result).toEqual(....);
        })
}));
```

The test will wait until all asynchronous calls within this zone are done. This works with promises and observables.

<!-- prettier-ignore -->
***

## Dependencies

```ts
import { TestBed, inject } from '@angular/core/testing';
import { Engine } from './engine';
import { Car } from './car';

describe('Car', () => {
  let subject: Car;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Engine, Car],
    });
  });

  beforeEach(inject([Car], (car: Car) => {
    subject = ca;
  }));

  test('should display name with engine', () => {
    expect(subject.getName()).toEqual('Car with Basic engine(150 HP)');
  });
});
```

<!-- prettier-ignore -->
***

## HttpClient testing

Setup

```js
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [BlogService],
    imports: [HttpClientTestingModule],
  });
});
```

Tests will hit the testing backend instead of the normal backend.

<!-- prettier-ignore -->
***

### HttpClient testing

```ts
import { HttpTestingController } from '@angular/common/http/testing';

test('expects a GET request', inject(
  [BlogService, HttpTestingController],
  (service: BlogService, httpMock: HttpTestingController) => {
    // 1. call the blog service
    service.getBlog(3).subscribe(blogEntry => {
      expect(blogEntry.id).toEqual(3);
      expect(blogEntry.content).toEqual('just some text');
    });

    // 2. specify what should happen
    const req = httpMock.expectOne('/server/api/3');
    expect(req.request.method).toEqual('GET');
```

<!-- prettier-ignore -->
***

### HttpClient testing

```js
    // 3. Next, fulfill the request by transmitting a response.
    req.flush({
      id: 3,
      content: 'just some text',
    });

    // Finally, assert that there are no outstanding requests.
    mockHttp.verify();
  }
));  // end of test
```

<!-- prettier-ignore -->
***

## Component testing

```js
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    });
  });
```

<!-- prettier-ignore -->
***

## Component testing

```ts
  test('should display 0 as initial value', () => {
    // on the testBed we can create the component
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    // and query element with 'By-class'
    const h2 = fixture.debugElement.query(By.css('h2'));
    // assert
    expect(h2.nativeElement.textContent).toEqual('Value: 0');
  });

}); // end of describe
```

This is the hard way to test a component

<!-- prettier-ignore -->
***

## Component testing

Easy component testing with jest snapshot :)

```js
test('should compile successfully', () => {
  const fixture = TestBed.createComponent(AppComponent);
  fixture.detectChanges();
  expect(fixture).toMatchSnapshot();
});
```

<!-- prettier-ignore -->
***

## Component testing

Interact with the component

```js
// create component
const fixture = TestBed.createComponent(AppComponent);

// spy on a method
const onClick = sinon.spy(fixture.componentInstance, 'onIncrementClick');

// call method on the component
fixture.componentInstance.onIncrementClick();
fixture.detectChanges();

// trigger event on dom element
const button = fixture.debugElement.query(By.css('.increment'));
button.triggerEventHandler('click', {});
expect(onIncrementClick.called).toEqual(true);
```

---

# Resources

- [Testing Angular Faster Jest](https://www.xfive.co/blog/testing-angular-faster-jest/)
- [PluralSight - Introduction to Angular test-driven development](https://www.pluralsight.com/guides/introduction-to-angular-test-driven-development?gclid=Cj0KCQjw3v3YBRCOARIsAPkLbK53fnGPGta6a5Rw1HmWeMYLlw69cAqafsyiZHqoD2_gGvikmQUcebUaAjMrEALw_wcB&aid=7010a000002BWqGAAW&promo=&oid=&utm_source=non_branded&utm_medium=digital_paid_search_google&utm_campaign=EMEA_Dynamic&utm_content=&s_kwcid=AL!5668!3!247610706940!b!!g!!&ef_id=WrJ7DwAAAKl9334Z:20180612121707:s)
