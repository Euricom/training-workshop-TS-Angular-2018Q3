# Angular - Feature Modules
## InDepth
<img src="./images/modules.jpg" width="400px" /><br>
<small>by Peter Cosemans</small>

<small>
Copyright (c) 2017 Euricom nv.
</small>

<style type="text/css">
.reveal p {
    text-align: center;
    margin: 20px 0;
    line-height: 1.0;
}
.reveal pre code {
    display: block;
    padding: 5px;
    overflow: auto;
    max-height: 800px;
    word-wrap: normal;
}
</style>


---

# Feature Modules

> Decompose your app into separated modules

----

## Decompose your app

- AppModule
- MainModule
- AdminModule
- SharedModule

> A feature module can be lazy loaded

----

## Shared Module

```ts
// app/shared/shared.module.ts
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { ButtonComponent } from './components/button.component'
import { DateComponent } from './components/date.component'
import { ApiService } from './services/api.service'

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ButtonComponent,
        DateComponent
    ],
    providers: [
        ApiService
    ],
    exports: [
        ButtonComponent,
        DateComponent
    ],
})
export class SharedModule { }
```

----

## Admin Module

```ts
// app/admin/admin.module.ts
import { NgModule } from '@angular/core'
import { SharedModule } from './app/shared/shared.module'
import { Routes, RouterModule } from '@angular/router'
import { UserComponent } from './app/admin/users/users.component'

export const routes: Routes = [
    ...
    // child routes on 'admin'
    { path: '', component: UserComponent },
]

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        AdminComponent,
    ]
})
export class AdminModule { }
```

> forChild: We need the router directives, not the router service

----

## App Module

Static loaded admin module

```ts
// app/app.module.ts
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { Routes, RouterModule } from '@angular/router'

import { SharedModule } from './app/shared/shared.module'
import { AdminModule } from './app/admin/admin.module'

export const routes: Routes = [
    ...
]

@NgModule({
    imports: [
        BrowserModule,
        AdminModule,
        SharedModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        AppComponent,
        ...
    ]
})
export class AppModule { }
```

----

Lazy loaded admin module

```ts
// app/app.module.ts
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { Routes, RouterModule } from '@angular/router'

import { SharedModule } from './app/shared/shared.module'

export const routes: Routes = [
    ...
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
]


@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        AppComponent,
        ...
    ]
})
export class AppModule { }
```


---

## Resources

- [Creating a Feature Module](https://angular-2-training-book.rangle.io/handout/modules/feature-modules.html)
- [Angular 2 lazy loading with webpack](https://medium.com/@daviddentoom/angular-2-lazy-loading-with-webpack-d25fe71c29c1#.w7a78a6h3)
- [Angular Lazy loading with webpack 2](https://damienbod.com/2017/01/14/angular-2-lazy-loading-with-webpack-2/)



