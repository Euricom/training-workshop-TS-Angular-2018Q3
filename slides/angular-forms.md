---
title: Angular Forms
transition: 'fade'
verticalSeparator: "^\\*\\*\\*"
---

# Angular

## Forms

<img src="./images/angular-forms.png" width="400px" /><br>
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
    font-size: 100%;
}

.reveal ul > li > ul {
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

# Forms types

Angular offers two form-building technologies:

- **_Template-driven forms_** <br>

  - Using the ngModel directive with two-way data binding
  - Good for simple forms

- **_Model-driven forms_** <br>
  - Define your validation in code
  - One way binding
  - Possible to unit test validation

---

# Template Driven Forms

> Forms driven by the templates

<!-- prettier-ignore -->
***

## Install

Install forms module

```bash
yarn add @angular/forms
```

Add to module

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

<!-- prettier-ignore -->
***

## Template

Bootstrap styled form

```html
<form (ngSubmit)="onSubmit()">
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" name="name"
               [(ngModel)]="model.name">
    </div>
    <div class="form-group">
        <label for="power">Type</label>
        <select class="form-control" name="type" [(ngModel)]="model.type">
            <option *ngFor="let type of types" [value]="type">{{type}}</option>
        </select>
    </div>
    <button type="submit" class="btn btn-success">Submit</button>
</form>
```

The component

```js
export class MyComponent {
  model: any = {};
  types: any = ['standard', 'advanced'];
  onSubmit() {
    console.log('submit', this.model);
  }
}
```

<!-- prettier-ignore -->
***

## Handle form input changes

```html
<form>
    <div class="form-group">
        <label for="name">Search</label>
        <input type="text" class="form-control" name="name"
               (ngModelChange)="onNameChange($event)">
    </div>
</form>
```

```js
export FormComponent {
    ...
    onNameChange(value) {
        console.log(value);
    }
}
```

<!-- prettier-ignore -->
***

## Validations

```html
<form (ngSubmit)="onSubmit()" #theForm="ngForm">
    <label for="name">Name</label>
    <input type="text" class="form-control" name="name"
           required minlength="4" maxlength="24"
           [(ngModel)]="model.name">
    <button type="submit" class="btn btn-success"
            [disabled]="!theForm.form.valid">Submit</button>
</form>
```

Applied class names

- ng-touched or ng-untouched
- ng-valid or ng-invalid
- ng-pristine or ng-dirty

<!-- prettier-ignore -->
```js
styles: [`
    .ng-valid[required]  {
      border-left: 5px solid #42A948; /* green */
    }
    .ng-invalid:not(form)  {
      border-left: 5px solid #a94442; /* red */
    }
`];
```

<!-- prettier-ignore -->
***

## Validation Error Messages

```html
<label for="name">Name</label>

<input type="text" id="name" class="form-control"
       required minlength="4" maxlength="24"
       name="name" [(ngModel)]="model.name"
       #name="ngModel" >

<div *ngIf="name.errors && (name.dirty || name.touched)"
     class="alert alert-danger">
    <div [hidden]="!name.errors.required">
      Name is required
    </div>
    <div [hidden]="!name.errors.minlength">
      Name must be at least 4 characters long.
    </div>
    <div [hidden]="!name.errors.maxlength">
      Name cannot be more than 24 characters long.
    </div>
</div>
```

---

# Reactive Forms

> Forms driven by the javascript code

<!-- prettier-ignore -->
***

## Install

Install forms module

```bash
yarn add @angular/forms
```

Add to module

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule, // <-  this is different from template based forms
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

> Use the ReactiveFormModule

<!-- prettier-ignore -->
***

## Template

```html
<form [formGroup]="userForm" (ngSubmit)="onSubmit()" novalidate>
  <div class="form-group">
    <label for="name">Name</label>
    <input class="form-control" type="text" id="name"
           formControlName="name" >
  </div>
  <div class="form-group">
    <label for="type">Type</label>
    <select class="form-control" name="type" formControlName="type">
        <option *ngFor="let type of types" [value]="type">{{type}}</option>
    </select>
  </div>
  <!-- for debug only -->
  {{userForm | json}}
  <!-- for debug only -->
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

<!-- prettier-ignore -->
***

## Component

```js
import { FormGroup, FormControl, Validators } from '@angular/forms';

export class MyComponent extends OnInit {
  model: any = { type: 'two' };
  userForm: FormGroup;
  types: any = ['one', 'two'];

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(this.model.name),
      type: new FormControl(this.model.type),
    });
  }
  onSubmit() {
    this.model = this.userForm.value;
    console.log('submit', this.model);
  }
}
```

Short version (Form Builder)

```js
import { FormBuilder } from '@angular/forms'

export class MyComponent extends OnInit {
    constructor(private formBuilder: FormBuilder) { }
    ngOnInit() {
        this.userForm = this.formBuilder.group({
            name: [this.model.name],
            type: [this.model.type],
        })
    }
}
```

<!-- prettier-ignore -->
***

## Fill form after async action

```js
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

export class MyComponent extends OnInit {
    userForm: FormGroup;

    constructor(private userService: UserService) { }
    ngOnInit() {
        this.userForm = new FormGroup({
            name: new FormControl('' /* initial value */),
            type: new FormControl(),
        })

        this.userService.getUser()
            .subscribe(user => {
                this.userForm.patchValue(user);
            })
    }
    onSubmit() {
        this.model = this.userForm.value
        console.log('submit', this.model)
    }
}
```

<!-- prettier-ignore -->
***

## Validations

In Component

```js
ngOnInit() {
    this.theForm = new FormGroup({
        name: new FormControl(this.model.name, [Validators.required]),
        type: new FormControl(this.model.type)
    })
}
```

In Component (short version)

```js
ngOnInit() {
    this.theForm = this.formBuilder.group({
        name: [this.model.name, Validators.required],
        type: [this.model.type],
    })
}
```

In template

```html
<form [formGroup]="userForm" novalidate>
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" formControlName="name">
        <div *ngIf="userForm.controls['name'].hasError('required')">
            This field is required!
        </div>
    </div>
    {{ userForm.controls.name.errors | json }}
    ...
</form>
```

<!-- prettier-ignore -->
***

## Multiple Validations

```js
ngOnInit() {
    this.theForm = this.fb.group({
        'name': [this.model.name, [
            Validators.required,
            Validators.maxLength(5),
            Validators.maxLength(20),
            Validators.pattern(/^[A-Z].*/)   /* first letter capital */
        ]],
        'type': [this.model.type],
    })
}
```

template

```html
<form [formGroup]="userForm">
    <div class="form-group">
        <label>Name</label>
        <input type="text" id="name" formControlName="name">
        <p *ngIf="userForm.controls.name.hasError('required') &&
                  userForm.controls.name.touched &&
                  userForm.controls.name.dirty" class="error" >
          This field is required!
        </p>
        <p *ngIf="(
            userForm.controls.name.hasError('minlength') ||
            userForm.controls.name.hasError('maxlength')) && userForm.conrols.name.touched &&
            userForm.controls.name.dirty" class="error" >
          5 characters minimum, 20 characters maximum
        </p>
        <p *ngIf="userForm.controls.name.hasError('pattern') &&
                  userForm.controls.name.touched &&
                  userForm.controls.name.dirty" class="error" >
          This field should start with a capital letter
        </p>
    </div>
    ...
</form>
```

<small>
See also: https://toddmotto.com/angular-2-forms-reactive
</small>

<!-- prettier-ignore -->
***

## Custom Validation Function

```js
// myValidators.ts
export const MyValidators = {
  validEmail(control) {
    if (control.value) {
      if (control.value.includes('@euri.com')) {
        return null; // valid
      }
      // invalid
      return {
        validEmail: 'Email is invalid ',
      };
    }
    return null; // valid
  },
};
```

```js
import { MyValidators } from './myValidators'

ngOnInit() {
    this.theForm = this.fb.group({
        ...
        'email': [this.model.name, [
            Validators.required,
            MyValidators.validEmail,
        ]],
        ...
    })
}
```

<!-- prettier-ignore -->
***

### Custom Validation Function

Typesafe version

```js
// myValidators.ts
import { ValidatorFn, AbstractControl } from '@angular/forms'
export const MyValidators = {
    validEmail(control: AbstractControl) : { [key: string]: boolean; } | null {
        ...
    }
}
```

<!-- prettier-ignore -->
***

## Form Control valueChanges

Handle control changes (valueChanges, statusChanges)

```html
<!-- single control form -->
<input type="text" [formControl]="searchControl">
```

```js
export class AppComponent {
  loading: Boolean;
  searchControl = new FormControl();
  ngOnInit() {
    // call search when input changes (different value)
    // and not more the every 400ms
    this.sub = this.searchControl.valueChanges.pipe(
      debounceTime(400), // wait for 400ms
      distinctUntilChanged(), // value must change
      tab(() => (this.loading = true)),
      switchMap(term => this.wikipediaService.search(term))
      tab(() => (this.loading = false)),
    )
    .subscribe(items => (this.items = items));
  }
  ngOnDestroy() {
    // don't forget to unsubscribe
    this.sub.unsubscribe();
  }
}
```

<!-- prettier-ignore -->
***

## Form valueChanges

Handle form changes

```js
ngOnInit() {
    this.sub = this.userForm.valueChanges
        .subscribe(form => {
            sessionStorage.setItem('form', JSON.stringify(form));
        });
}
ngOnDestroy() {
    // don't forget to unsubscribe
    this.sub.unsubscribe();
}
```

<small>
See also: http://kfarst.github.io/angular/2016/12/12/subscribing-to-form-value-changes-in-angular-2/
</small>

---

# Resources

- [ngxerrors](https://github.com/UltimateAngular/ngxerrors)
- [ng-validators](https://www.npmjs.com/package/ng-validators)
- [Angular 2 Form Validation](https://scotch.io/tutorials/angular-2-form-validation)
- [How to Implement Conditional Validation in Angular 2 Model-driven Forms](https://scotch.io/tutorials/how-to-implement-conditional-validation-in-angular-2-model-driven-forms)
- [Angular 2 form fundamentals: reactive forms](https://toddmotto.com/angular-2-forms-reactive)
- [Angular2: Custom validation using multiple form fields](https://bertrandg.github.io/angular2-forms-form-group-validation/)
- [Angular Forms Guide - Template Driven and Reactive Forms](https://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/)
