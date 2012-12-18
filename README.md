# augment #

The world's smallest and fastest classical JavaScript inheritance pattern (`Function.prototype.augment`) is a [seven line function](http://javascript.github.com/augment) which allows you to write [CoffeeScript style classes](http://coffeescript.org/#classes "CoffeeScript") with a flair of [simplicity](http://ejohn.org/blog/simple-javascript-inheritance/); and it still [beats the bejesus](http://jsperf.com/oop-benchmark/85 "JavaScript Object Oriented Libraries Benchmark · jsPerf") out of other JavaScript inheritance libraries.

Inspired by giants like [Jeremy Ashkenas](http://ashkenas.com/ "Jeremy/Ashkenas — Portfolio") and [John Resig](http://ejohn.org/ "John Resig - JavaScript Programmer"), `augment` is an augmentation of ideas. Classes created using `augment` have a CoffeeScript like structure, and a syntax like John Resig's; but they are more readable, intuitive and orders of magnitude faster. Plus they work on every JavaScript platform.

## Installation and Usage ##

You can install `augment` on [node.js](http://nodejs.org/ "node.js") using the following [npm](https://npmjs.org/ "npm") command:

```
npm install augment
```

You can also install `augment` on [RingoJS](http://ringojs.org/ "Home - RingoJS") using the following `ringo-admin` command:

```
ringo-admin install javascript/augment
```

Similarly you can install `augment` for web apps using the following [component](https://github.com/component/component) command:

```
component install javascript/augment
```

You can easily include it in [fiddles](http://jsfiddle.net/ "Create a new Fiddle - jsFiddle") and [benchmarks](http://jsperf.com/ "jsPerf: JavaScript performance playground") using the following HTML code:

```html
<script src="https://raw.github.com/javascript/augment/master/augment.js"></script>
```

Otherwise you may simply browse the [source code](https://github.com/javascript/augment/blob/master/augment.js "javascript/augment") and stick it into your program.

## Creating your First Class ##

I am a huge follower of keeping things simple and learning by example. So let's begin:

```javascript
var Rectangle = Object.augment(function () {
    this.area = function () {
        return this.width * this.height;
    };

    return Rectangle;

    function Rectangle(width, height) {
        this.height = height;
        this.width = width;
    }
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
var Square = Rectangle.augment(function (Rectangle) {
    return Square;

    function Square(side) {
        Rectangle.call(this, side, side);
    }
});
```

Notice that the first argument passed to the anonymous _class body_ function is the base class `Rectangle`. This allows us to `call` the base class constructor from the derived class constructor as a mixin. It also allows us to access the static members defined on the base class.

So let's create an object:

```javascript
var square = new Square(5);
console.log(square.area());
```

So simple.

## Creating your Third Class ##

What about accessing base class `prototype` methods from the derived class? Let's see:

```javascript
var Cube = Square.augment(function (Square, uber) {
    this.area = function () {
        return 6 * uber.area();
    };

    this.volume = function () {
        return this.side * uber.area();
    };

    return Cube;

    function Cube(side) {
        this.side = side;
        Square.call(this, side);
    }
});
```

As you can see the second argument passed to the anonymous _class body_ function is the `prototype` of the base class `Square`, which we named `uber` because `super` is a reserved word. It can be used to access the methods on the `prototype` of the base class.

Creating the final object:

```javascript
var cube = new Cube(5);
alert(cube.volume());
alert(cube.area());
```

That's all folks!
