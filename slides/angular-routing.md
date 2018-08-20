---
title: Angular Router
transition: 'fade'
"verticalSeparator": "^\\*\\*\\*"
---

# Angular

## Router & Navigation

<img src="./images/route66.jpeg" width="600px" /><br>

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

# The basics

> Simple routing

<!-- prettier-ignore -->
***

## Setup

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

// create routes
const appRoutes: Routes = [
  { path: 'foo', component: FooComponent },
  { path: 'bar', component: BarComponent },
  { path: '', redirectTo: '/foo', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  declarations: [
    AppComponent,
    FooComponent,
    BarComponent,
    PageNotFoundComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

<!-- prettier-ignore -->
***

## Components

FooComponent

```js
@Component({
  template: `
        <h1>Foo</h1>
    `,
})
export class FooComponent {}
```

BarComponent

```js
@Component({
  template: `
        <h1>Bar</h1>
    `,
})
export class BarComponent {}
```

PageNotFoundComponent

```js
@Component({
  template: `
    <h1>Page Not found</h1>
  `,
})
export class PageNotFoundComponent {}
```

<!-- prettier-ignore -->
***

## Router-outlet

Angular routing expects you to have a base element in the head section

```html
<head>
    <base href="/">
    <!-- etc... -->
</head>
```

The router-outlet

```js
// app.component.ts
@Component({
    template: `
        <h1>My App</h1>
        <nav>
            <!-- route link -->
            <a routerLink="foo">Foo</a>
        </nav>
        <!-- Routed views go here -->
        <router-outlet></router-outlet>
    `
})
export class AppComponent() {}
```

<!-- prettier-ignore -->
***

## Navigate

```ts
import { Location } from "@angular/common"
import { Router, ActivatedRoute } from "@angular/router"

@Component({
    ...
})
export MyComponent {
    constructor(private router: Router, private location: Location) {}

    action() {
        // relative
        this.router.navigate('about')

        // absolute
        this.router.navigate(['/about'])

        // back
        this.location.back()
    }
}
```

<!-- prettier-ignore -->
***

## Styling

```js
@Component({
    template: `
        <a routerLink="foo" routerLinkActive="active-link">Foo</a>
    `
    styles: [`
        .active-link {
            background-color: lightgray
        }
    `]
})
```

---

# Parameters

> Pass some data

<!-- prettier-ignore -->
***

## Route Parameters

Declaring Route Parameters

```js
const appRoutes: Routes = [
    ...
    { path: 'product/:id', component: ProductComponent },
    ...
]
```

Linking to Routes with parameters

```html
<a *ngFor="let product of products"
   [routerLink]="['product', product.id]">
  {{ product.name }}
</a>
```

<!-- prettier-ignore -->
***

## Use the parameters

Get the current params

```ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
        <h1>Foo</h1>
        Parameter: {{id}}
    `,
})
export class FooComponent implements OnInit {
  id: String;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }
}
```

<!-- prettier-ignore -->
***

## Navigate

```ts
import { Location } from "@angular/common"
import { Router, ActivatedRoute } from "@angular/router"

@Component({
    ...
})
export MyComponent {
    constructor(private router: Router) {}

    action() {
        // relative
        this.router.navigate('about')
        this.router.navigate(['about'])

        // absolute
        this.router.navigate(['/about'])
        this.router.navigate(['/product-details', id])
        this.router.navigateByUrl(`/courses/${course.id}`)
    }
}
```

---

# Navigation Guards

> Protecting your routes

<!-- prettier-ignore -->
***

## Guard Types

There are four different guard types we can use to protect our routes

- **_CanActivate_** - Decides if a route can be activated
- **_CanActivateChild_** - Decides if children routes of a route can be activated
- **_CanDeactivate_** - Decides if a route can be deactivated
- **_CanLoad_** - Decides if a module can be loaded lazily

<!-- prettier-ignore -->
***

## Can-Activate Guard

Create 'CanActivate' guard

```ts
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  // we need this function
  canActivate() {
    return this.authService.isLoggedIn();
  }
}
```

And use it on a route

```ts
{
    path: '',
    component: SomeComponent,
    canActivate: [AuthGuard]
}
```

Don't forget to register the guard in the module.

<!-- prettier-ignore -->
***

## Configure guard

Specify custom properties on route

```ts
{
    path: '',
    component: FooComponent,
    canActivate: [AuthGuard],
    data: { roles: ['super-admin', 'admin'] }
}
```

And use them in the guard

```ts
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRoute): boolean {
    let roles = route.snapshot.data['roles'] as Array<string>;
    if (this.authService.isInRole(roles)) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
```

<!-- prettier-ignore -->
***

## Can-Deactivate Guard

```ts
import { CanDeactivate } from '@angular/router';
import { MyComponent } from './app/my.component';

export class ConfirmDeactivateGuard implements CanDeactivate<MyComponent> {
  // we need this function
  canDeactivate(myComponent: MyComponent) {
    if (myComponent.hasChanges()) {
      return window.confirm('Do you really want to cancel?');
    }
    // return bool, promise or observable
    return true;
  }
}
```

<small>
https://angular.io/docs/ts/latest/api/router/index/CanDeactivate-interface.html
</small>

---

# Route resolvers

> Get data before route change

<!-- prettier-ignore -->
***

## Resolve

Route resolvers allow us to provide the needed data for a route, before the route is activated.

```ts
export const AppRoutes: Routes = [
  ...{
    path: 'contact/:id',
    component: ContactsDetailComponent,
    resolve: {
      contact: ContactResolve,
    },
  },
];
```

Contact Resolver

```ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ContactsService } from './contacts.service';

@Injectable()
export class ContactResolve implements Resolve<Contact> {
  constructor(private contactsService: ContactsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Contact> {
    const id = route.params['id'];
    return this.contactsService.getContact(id);
  }
}
```

<!-- prettier-ignore -->
***

## Resolve Data

```ts
@Component({
    ...
})
export class ContactsDetailComponent implements OnInit {
    contact: Contact
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        this.contact = this.route.snapshot.data['contact'] as Contact
    }
}
```

<small>
    More see: [https://blog.thoughtram.io/angular/2016/10/10/resolving-route-data-in-angular-2.html](https://blog.thoughtram.io/angular/2016/10/10/resolving-route-data-in-angular-2.html)
</small>

---

# Route Events

> Follow all route changes

<!-- prettier-ignore -->
***

## Router Events

```js
export class AppComponent {
    private sub: any;
    constructor(private router: Router) {}
    ngOnInit() {
        this.sub = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe((event) => {
                console.log('NavigationEnd:', event);
            });
    }
    ngOnDestroy() {
        // you must manually release your subscription
        this.sub.unsubscribe();
    }
}
```

<small>
See also: https://toddmotto.com/dynamic-page-titles-angular-2-router-events
</small>

<!-- prettier-ignore -->
***

## Route params changed

Trigger a http call after the route parameter is changed.

```js
export class MyComponent {
    private sub: any;
    constructor(private route: ActivatedRoute) {}
    ngOnInit() {
        // call getContact when route params changes
        this.sub = this.route.params            // params is an observable
            .pipe(
                map(params => params['id']),
                switchMap(id => this.contactsService.getContact(id))
            )
            .subscribe(contact => this.contact = contact);
    }
    ngOnDestroy() {
        // you must manually release your subscription
        this.sub.unsubscribe();
    }
}
```

<!-- prettier-ignore -->
***

## Other Route changes

```ts
constructor(private route: ActivatedRoute) {}
ngOnInit() {
    // parameter change stream
    const params$ = this.route.params;

    // query parameters change stream
    const queryParams$ = this.route.queryParams;

    // fragment change stream
    const fragment$ = this.route.fragment;

    // route data change stream
    const data$ = this.route.data;

    // url changed stream
    const url$ = this.route.url;
}
```

---

# Advanced topics

> There is more

<!-- prettier-ignore -->
***

## Wildcards

```js
export const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  { path: 'product-list', component: ProductList },
  // ...
  { path: '**', component: 'NotFoundComponent' },
];
```

The wildcard comes after all other paths

<!-- prettier-ignore -->
***

## Child routes

```js
export const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  { path: 'product-list', component: ProductListComponent },
  {
    path: 'product-details/:id',
    component: ProductDetails,
    children: [
      { path: '', component: OverviewComponent} },
      { path: 'overview', component: OverviewComponent },
      { path: 'specs', component: SpecsComponent },
    ],
  },
];
```

```js
// goto root/product-list
this.router.navigate(['/product-list']);

// from root route goto overview
this.router.navigate(['/product-details', prodId, 'overview]);

// from specs route goto overview
this.router.navigate(['overview']);

// from specs, overview goto parent/product-list
this.router.navigate('../product-list', { relativeTo: this.overviewRoute });
```

<!-- prettier-ignore -->
***

## Routing Strategy

> PathLocationStrategy

```js
// URL: http://domain/product-list
RouterModule.forRoot(routes); // PathLocationStragery is default
```

- we need to tell the browser: <br>`<base href='/my/app'/>`
- the server need to return index.html for any requested URL

> HashLocationStrategy

```js
// URL: http://domain/#/product-list
RouterModule.forRoot(routes, { useHash: true });
```

---

## Resources

- [Book: Angular Router](https://leanpub.com/router)
- [Book: Angular5 - Routing](https://codecraft.tv/courses/angular/routing/overview/)
