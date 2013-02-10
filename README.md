# augment #

The world's smallest and fastest classical JavaScript inheritance pattern (`Function.prototype.augment`) is an [eight line function](https://github.com/javascript/augment/blob/master/lib/augment.js#L18 "augment.js") which allows you to write [CoffeeScript style classes](http://coffeescript.org/#classes "CoffeeScript") with a flair of [simplicity](http://ejohn.org/blog/simple-javascript-inheritance/ "John Resig -   Simple JavaScript Inheritance"); and it still [beats the bejesus](http://jsperf.com/oop-benchmark/118 "JavaScript Object Oriented Libraries Benchmark · jsPerf") out of other JavaScript inheritance libraries.

Inspired by giants like [Jeremy Ashkenas](http://ashkenas.com/ "Jeremy/Ashkenas — Portfolio") and [John Resig](http://ejohn.org/ "John Resig - JavaScript Programmer"), `augment` is an augmentation of ideas. Classes created using `augment` have a CoffeeScript like structure, and a syntax like John Resig's; but they are more readable, intuitive and orders of magnitude faster. Plus they work on every JavaScript platform.

## Installation and Usage ##

You can install `augment` on [node.js](http://nodejs.org/ "node.js") using the following [npm](https://npmjs.org/ "npm") command:

```bash
npm install augment
```

You can also install `augment` on [RingoJS](http://ringojs.org/ "Home - RingoJS") using the following `ringo-admin` command:

```bash
ringo-admin install javascript/augment
```

Similarly you can install `augment` for web apps using the following [component](https://github.com/component/component) command:

```bash
component install javascript/augment
```

You can easily include it in [fiddles](http://jsfiddle.net/ "Create a new Fiddle - jsFiddle") and [benchmarks](http://jsperf.com/ "jsPerf: JavaScript performance playground") using the following HTML code:

```html
<script src="https://raw.github.com/javascript/augment/master/lib/augment.js"></script>
```

Otherwise you may simply browse the [source code](https://github.com/javascript/augment/blob/master/lib/augment.js "javascript/augment") and stick it into your program.

## Creating your First Class ##

I am a huge follower of keeping things simple and learning by example. So let's begin:

```javascript
var Rectangle = Object.augment(function () {
    this.constructor = function (width, height) {
        this.height = height;
        this.width = width;
    };

    this.area = function () {
        return this.width * this.height;
    };
});
```

Looks like normal JavaScript right? No mysterious dollar signs or dangling underscores. It's so simple that I don't even need to explain it using comments.

Now let's create our first object:

```javascript
var rectangle = new Rectangle(3, 7);
console.log(rectangle.area());
```

That's it.

## Creating your Second Class ##

Now let's create another class which augments our first class. It's as simple as:

```javascript
var Square = Rectangle.augment(function () {
    this.constructor = function (side) {
        Rectangle.call(this, side, side);
    };
});
```

Now let's create an object:

```javascript
var square = new Square(5);
console.log(square.area());
```

So simple.

## Creating your Third Class ##

What about accessing base class `prototype` methods from the derived class? Let's see:

```javascript
var Cube = Square.augment(function (base) {
    this.constructor = function (side) {
        base.constructor.call(this, side);
        this.side = side;
    };

    this.area = function () {
        return 6 * base.area.call(this);
    };

    this.volume = function () {
        return this.side * base.area.call(this);
    };
});
```

As you can see the second argument passed to the anonymous _class body_ function is the `prototype` of the base class `Square`, which we named `base`. It can be used to access the methods on the `prototype` of the base class.

Also notice that instead of invoking the super class constructor as `Square.call` we are using `base.constructor.call` instead. Yes there's an additional property lookup but it's essentially the same.

Creating the final object:

```javascript
var cube = new Cube(5);
console.log(cube.volume());
console.log(cube.area());
```

## Redefining the Module Pattern ##

The [module pattern](http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth "Adequately Good - JavaScript Module Pattern: In-Depth - by Ben Cherry") in JavaScript is used to provide privacy and state via an anonymous closure. It may also optionally return an object. You may use `augment` as achieve the same result. As long as you don't define `this.constructor`, `augment` will return a module instead of a class:

```javascript
var MODULE = Object.augment(function () {
    var private = true;
    this.public = true;
});
```

You may also import values as follows:

```javascript
var MODULE = Object.augment(function ($, YAHOO) {
    // now have access to globals jQuery (as $) and YAHOO in this code
}, jQuery, YAHOO);
```

By default the `prototype` of the function you are augmenting (in this case `Object`) is always imported. It's passed at the end of the argument list.

That's all folks!
