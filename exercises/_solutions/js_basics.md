# Solutions - JavaScript exercises

----

# This

```js
global.fullname = 'John Doe'
const obj = {
   fullname: 'Colin Ihrig',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname
      }
   }
}
const test = obj.prop.getFullname
console.log(test())
```

Make the console.log() prints 'Aurelio De Rosa'.<br>
Don't change the obj!

```js
global.fullname = 'John Doe'
const obj = {
   fullname: 'Colin Ihrig',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname
      }
   }
}
const test = obj.prop.getFullname
console.log(obj.prop.getFullname())  // output 'Aurelio De Rosa'
console.log(test.call(obj.prop))     // output 'Aurelio De Rosa'
```

---

## Prototypal inheritance

```js
// -------- With Object.create -------------

// create an animal object that implements eat() function.
const animal = Object.create(null, {
    eat() {
        console.log('njam njam')
    }
})
animal.eat();

// create a rabbit object that prototypal inherits from animal and add a jump() function.
const rabbit = Object.create(animal, {
    jump() {
        console.log('jumping...')
    }
})
rabbit.jump();
rabbit.eat();

// -------- With constructor function ----------

function Animal() {
}
Animal.prototype.eat = function() {
    console.log('eat');
}

const rabbit = new Animal();
rabbit.jump = function() {
    console.log('jump');
}

rabbit.jump();
rabbit.eat();

// v2

function Rabbit() {
}
Rabbit.prototype = Object.create( Animal.prototype );

Rabbit.prototype.jump = function() {
    console.log('jump');
}

// -------- With classes -------------

class Animal {
    eat() {
        console.log('eat');
    }
}

const rabbit = new Animal();
rabbit.jump = function() {
    console.log('jump');
}

// v2

class Animal {
    eat() {
        console.log('eat');
    }
}

class Rabbit extends Animal {
    jump() {
        console.log('jump');
    }
}

const rabbit = new Rabbit();
```

## Prototype - How can we implement looping with a callback?

```js
myForEach([0, 1, 2], function(value, index) {
    console.log(value, this[index] === value /* should be true */)
})

// make it work with
[0, 1, 2].myForEach(function(value) {
    console.log(value)
})
```

```js
function myForEach(array, fn){
    for ( var i = 0; i < array.length; i++ ) {
        fn.call(array, array[i], i)
    }
}

Array.prototype.myForEach = function(fn) {
    myForEach(this, fn)
}
```
