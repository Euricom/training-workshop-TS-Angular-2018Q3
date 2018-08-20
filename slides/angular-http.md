---
title: Angular Http
transition: 'fade'
"verticalSeparator": "^\\*\\*\\*"
---

# Angular Http

<img src="./images/http.png" width="600px" /><br>
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

# Basic use

> Keep it simple

<!-- prettier-ignore -->
***

## HttpClient

Setup

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, HttpClientModule],
})
export class MyAppModule {}
```

Use

```js
import { HttpClient } from '@angular/common/http'

export class MyComponent {
    tasks: any = [];
    constructor(private httpClient: HttpClient) {
    }
    ngOnInit() {
        this.httpClient.get('tasks.json')
            .subscribe(tasks => {
                this.tasks = tasks;
            });
    }
}
```

<!-- prettier-ignore -->
***

## HttpClient - Post

Sending data to the server

<!-- prettier-ignore -->
```js
const resource = {
  title: 'foo',
  body: 'bar',
  userId: 1,
};
this.http.post('http://jsonplaceholder.typicode.com/posts', resource)
    .subscribe(
        result => {
        console.log(result);
    },
    err => {
        console.log('Error occured');
    }
);
```

And Others

```js
this.http.get('/api/users')
this.http.post('/api/users', { ... })
this.http.put('/api/users', { ... })
this.http.delete('/api/users/1')
)
```

<!-- prettier-ignore -->
***

## Http (deprecated)

```js
// you need to install @angular/http as a seperate module
import { HttpModule } from '@angular/http'

@NgModule({
    imports: [
        ...
        HttpModule
    ]
})
```

Use

```js
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'         // old style RxJS; pre 5.x

export class MyComponent {
    tasks: any = [];
    constructor(private http: Http) {
    }
    ngOnInit() {
        this.http.get('tasks.json')
            .map(res => res.json())     // body to json
            .subscribe(result => {
                this.tasks = result;
            });
    }
}
```

---

# Keep the code clean

> The right way of using the http service

<!-- prettier-ignore -->
***

## Single Responsibility!

### Split component and service

```js
import { HttpClient } from '@angular/common/http'

export class TaskService {
    constructor(private http: HttpClient) {}
    getTasks() {
        return this.http.get('tasks.json');
    }
}
```

```js
import { TaskService } from './services/taskService'

export class MyComponent {
    tasks = [];
    constructor(private taskService: TaskService) {
    }

    ngOnInit() {
        this.taskService.getTasks()
            .subscribe(tasks => this.tasks = tasks);
    }
}
```

<!-- prettier-ignore -->
***

## Typed response

```js
// ./services/taskService.ts
import { Observable } from 'rxjs';

export interface ITask {
  id: number;
  desc: string;
  completed: boolean;
}

getTasks() : Observable<ITask[]> {
    return this.http.get<ITask>('tasks.json');
}
```

Use

```js
import { TaskService, ITask } from './services/taskService'

export class MyComponent {
    tasks: ITask[] = [];
    constructor(private taskService: TaskService) {
    }

    ngOnInit() {
        this.taskService.getTasks()
            .subscribe(tasks => this.tasks = tasks);
    }
}
```

<!-- prettier-ignore -->
***

## Typed response

with class model

```js
// ./models/task.ts
export class Task {
  id: number;
  desc: string;
  completed: boolean;
  constructor(data: any) {
    Object.assign(this, data);
  }
}
```

```js
// ./services/taskService.ts
import { Observable } from 'rxjs/Observable';
import { Task } from '../models/task.ts';

export interface ITaskDTO {
  id: number;
  desc: string;
  completed: boolean;
}

getTasks() : Observable<Task[]> {
    return this.http.get<ITaskDTO>('tasks.json').pipe(
        map(data => data.map(item => new Task(item)))
    );
}
```

<!-- prettier-ignore -->
***

## Typed response

Use

```js
import { Task } from '../models/task.ts';
import { TaskService } from './services/taskService'

export class MyComponent {
    tasks: Task[] = [];
    constructor(private taskService: TaskService) {
    }

    ngOnInit() {
        this.taskService.getTasks()
            .subscribe(tasks => this.tasks = tasks);
    }
}
```

---

# Error handling

> Don't forget those failures

<!-- prettier-ignore -->
***

## HttpClient

```ts
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { catch, throwError } from 'rxjs/operators'

export class CustomerService {
    constructor(private http: HttpClient) {}
    getCustomer(id: string) Observable<Customer> {
        return this.http.get(`api/customers/${id}`).pipe(
            // catch and transform errors
            catch((res: HttpErrorResponse) => {
                if (res.error instanceof Error) {
                    // A client-side or network error occurred.
                    return throwError(new Error('Communication Error'))
                }
                // The backend returned an unsuccessful response code.
                let errMessage = err.error // error = returned body
                if (!errMessage) {
                    errMessage = error.statusText;
                }
                return throwError(new Error(errMessage));
            }),
            map(data => new Customer(data))
        )
    }
}
```

<!-- prettier-ignore -->
***

## Handle error in compoment

```js
// my.component.ts
this.customerService.getCustomer('123').subscribe(
  // first function is result
  customers => (this.getAll = getAll),
  // second function is error
  error => (this.errorMessage = error)
);
```

<!-- prettier-ignore -->
***

## Improved error handling

Create custom errors

```js
export class RequestError extends Error {
  constructor(public status: number, public statusText: string, response?: HttpErrorResponse) {
    super();
    // fix the prototype chain
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = RequestError.name;
    this.message = `${status} - ${statusText}`;
    this.details = response.error;
  }
}

export class CommunicationError extends Error {
  constructor() {
    super();
    // fix the prototype chain
    Object.setPrototypeOf(this, new.target.prototype);
    his.message = 'Communication error';
  }
}
```

<!-- prettier-ignore -->
***

### Improved error handling

```ts
getUser() Observable<User> {
    return httpClient.get<IUsersDTO>('api/users').pipe(
    catchError(error => castError(error)),
    map(data => data.map(item => new User(item)))
    );
}

function castError(error) {
  if (error instanceof Error) {
    if (error.name === 'TimeoutError') {
      return throwError(error);
    }
    return throwError(
      new CommunicationError('Failed to process server response')
    );
  }
  // HttpErrorResponse
  if (error.status == 0) {
    // A network error occurred (DNS, No Internet, ...)
    return throwError(new NoConnectionError());
  }
  // The backend returned an unsuccessful response code.
  return throwError(new RequestError(error.status, error.statusText, error));
}
```

---

# The power of RXJS

> Let RxJS work for you

<!-- prettier-ignore -->
***

## Wait for multiple http calls

```ts
import { forkJoin } from 'rxjs';

const users$ = httpClient.get('api/users');
const customers$ = httpClient.get('api/customers');
forkJoin([users$, customers$]).subscribe(([users, customers]) => {
  console.log(users);
  console.log(customers);
});
```

<!-- prettier-ignore -->
***

## Async Pipe

```js
import { Observable } from 'rxjs/Observable'
import { Task } from './models/task'
import { TaskService } from './services/taskService'

export class MyComponent {
    tasks$: Observable<Task[]>
    constructor(private taskService: TaskService) {
    }

    getData() {
        this.tasks$ = this.taskService.getTasks()

        // unsubscribe is not required
        // the async pipe unsubscribes automatically!
    }
}
```

In the template: async

```html
<ul>
    <li *ngFor="let task of tasks$ | async">
        {{task.name}} - {{task.completed}}
    </li>
</ul>
```

<!-- prettier-ignore -->
***

## Start http call on observable event

```ts
import { fromEvent } from 'rxjs';
import { tab } from 'rxjs/operators';

fromEvent(button, 'click')
  .pipe(
    // log current value of the stream
    tab(val => console.log(val)),
    // switchMap: cancels previous and switch over to http call
    switchMap(http.get('api/users'))
  )
  .subscribe(users => cosole.log('users', users));
```

---

# Advanced HttpClient

> I want more

<!-- prettier-ignore -->
***

## Query parameters

Instead of this

```ts
http
  .get<IData>(`/api/users?sort=+name&page=1`)
  .subscribe(...)
```

Use this

```ts
import { HttpClient, HttpParams } from '@angular/common/http';

const params = new HttpParams();
params.set('sort', '+name');
params.set('page', 1);
http
  .get<IData>('/api/users', { params })
  .subscribe(...)
```

<!-- prettier-ignore -->
***

## Custom headers

```js
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders()
headers.set("Authorization", "12345");
http
  .get<IData>('/api/users', { headers })
  .subscribe(...)
```

<!-- prettier-ignore -->
***

## Reading the full response

```ts
const source$ = http.get<IMyJsonData>('/data.json', {
  observe: 'response',
});
source$.subscribe(resp => {
  // Here, resp is of type HttpResponse<MyJsonData>.
  console.log(resp.headers.get('X-Custom-Header'));
  // And access the body directly, which is typed as IMyJsonData as requested.
  console.log(resp.body.someField);
});
```

<!-- prettier-ignore -->
***

## Intercepting

Interceptor to add authentication header

```ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', '12345'),
    });
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq);
  }
}
```

<!-- prettier-ignore -->
***

## Register interceptor

```js
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/authInterceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // this is required!
    },
  ],
})
export class AppModule {}
```

<!-- prettier-ignore -->
***

## Custom error

Interceptor to handle custom errors

```js
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // get observable request
    const request$ = next.handle(req);

    // apply operators
    return request$.pipe(
      tab(event => console.log('---> status:', event.status)),
      catchError(error => castError(error))
    );
  }
}
```

---

# Debug Setup

> Accessing the API server

<!-- prettier-ignore -->
***

## @angular/cli proxy

proxy.conf.json

```json
{
  "/api/*": {
    "target": "http://localhost:3000"
  }
}
```

angular.json

```json
"architect": {
    "serve": {
        "builder": "@angular-devkit/build-angular:dev-server",
        "options": {
            "browserTarget": "myApp:build",
            "proxyConfig": "proxy.conf.json"
        },
    }
}
```

More details, see [CLI proxy config](https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md)

---

## Resources

- [Angular Http & HttpClient: Same but different](https://blog.hackages.io/angular-http-httpclient-same-but-different-86a50bbcc450)
- [Angular 4.3+ HttpClient](http://codingthesmartway.com/angular-4-3-httpclient-accessing-rest-web-services-with-angular)
- [Insider’s guide into interceptors and HttpClient mechanics in Angular](https://blog.angularindepth.com/insiders-guide-into-interceptors-and-httpclient-mechanics-in-angular-103fbdb397bf)
- [Power of RxJS when using exponential backoff](https://blog.angularindepth.com/power-of-rxjs-when-using-exponential-backoff-a4b8bde276b0)
