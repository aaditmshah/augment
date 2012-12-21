# augment #

The world's smallest and fastest classical JavaScript inheritance pattern (`Function.prototype.augment`) is a [seven line function](http://javascript.github.com/augment/#section-19 "augment.js") which allows you to write [CoffeeScript style classes](http://coffeescript.org/#classes "CoffeeScript") with a flair of [simplicity](http://ejohn.org/blog/simple-javascript-inheritance/ "John Resig -   Simple JavaScript Inheritance"); and it still [beats the bejesus](http://jsperf.com/oop-benchmark/86 "JavaScript Object Oriented Libraries Benchmark · jsPerf") out of other JavaScript inheritance libraries.

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

## CoffeeScript Like Structure ##

If you've ever seen the output of a CoffeeScript program which uses classes then you'll recognize that `augment` has a CoffeeScript like structure. For example consider the `Rectangle` class written in CoffeeScript:

```coffeescript
class Rectangle
    constructor: (@width, @height) ->
    area: -> @width * @height
```

This compiles to the following code in JavaScript:

```javascript
var Rectangle;

Rectangle = (function() {

  function Rectangle(width, height) {
    this.width = width;
    this.height = height;
  }

  Rectangle.prototype.area = function() {
    return this.width * this.height;
  };

  return Rectangle;

})();
```

Do you see the similarity?

1. The [immediately-invoked function expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/ "Ben Alman &raquo; Immediately-Invoked Function Expression (IIFE)") is replaced with a call to `Object.augment` passing the anonymous _class body_ function as an argument.
2. `Rectangle.prototype` is replaced with the `this` pointer. Hence the verbose `Rectangle.prototype.area` becomes `this.area` which is more descriptive.

Beside that everything else remains the same.

CoffeeScript is actually a [little faster](http://jsperf.com/coffeescript-vs-augment "CoffeeScript vs augment · jsPerf") than `augment` when it comes to classes without inheritance (except on Chrome), which is understandable because `augment` has an extra function call to `Object.augment`, but `augment` [beats it hands down](http://jsperf.com/coffeescript-inheritance-vs-augment "CoffeeScript Inheritance vs augment · jsPerf") when it comes to inheritance. Let's look at some CoffeeScript code to understand why:

```coffeescript
class Square extends Rectangle
    constructor: (side) -> super side
```

This compiles down to the following code in JavaScript:

```javascript
var Square,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Square = (function(_super) {

  __extends(Square, _super);

  function Square(side) {
    Square.__super__.constructor.call(this, side);
  }

  return Square;

})(Rectangle);
```

What's that mess? That's the `__extends` function used by CoffeeScript for inheritance. It's Jeremy Ashkenas' equivalent of `augment`. This is what it does in a more readable format:

```javascript
var __hasProp = {}.hasOwnProperty;

var __extends = function (child, parent) {
    for (var key in parent)
        if (__hasProp.call(parent, key))
            child[key] = parent[key];      // copy static members

    function ctor() {
        this.constructor = child;
    }

    ctor.prototype = parent.prototype;     // copy prototype members
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
};
```

No wonder it is so slow. It has to loop through all the static members of the base class. Another reason it is so slow is because the call to the base class constructor is nice and long - `Square.__super__.constructor.call`. The equivalent line in `augment` is `Rectangle.call` which is shorter, faster, more descriptive and intuitive.

Jeremy Ashkenas, please fix the code you generate. The JavaScript community will thank you sincerely. I would be honoured if you were to use my `augment` function.

## Syntax Like John Resig's ##

The `Object.augment` pattern used by `augment` is similar to the `Class.extend` pattern John Resig uses in his simple JavaScript inheritance technique. In fact if you were to compare the source code for the two functions you would see a striking similarity. Here's the generously well commented source code of `Class.extend`:

```javascript
/* Simple JavaScript Inheritance
  * By John Resig http://ejohn.org/
  * MIT Licensed.
  */
// Inspired by base2 and Prototype
(function(){
   var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;


  // The base Class implementation (does nothing)
   this.Class = function(){};
   
   // Create a new Class that inherits from this class
   Class.extend = function(prop) {
     var _super = this.prototype;
     
     // Instantiate a base class (but only create the instance,
     // don't run the init constructor)
     initializing = true;
     var prototype = new this();
     initializing = false;
     
     // Copy the properties over onto the new prototype
     for (var name in prop) {
       // Check if we're overwriting an existing function
       prototype[name] = typeof prop[name] == "function" && 
         typeof _super[name] == "function" && fnTest.test(prop[name]) ?
         (function(name, fn){
           return function() {
             var tmp = this._super;
             
             // Add a new ._super() method that is the same method
             // but on the super-class
             this._super = _super[name];
             
             // The method only need to be bound temporarily, so we
             // remove it when we're done executing
             var ret = fn.apply(this, arguments);        
             this._super = tmp;
             
             return ret;
           };
         })(name, prop[name]) :
         prop[name];
     }
     
     // The dummy class constructor
     function Class() {
       // All construction is actually done in the init method
       if ( !initializing && this.init )
         this.init.apply(this, arguments);
     }
     
     // Populate our constructed prototype object
     Class.prototype = prototype;
     
     // Enforce the constructor to be what we expect
     Class.prototype.constructor = Class;

    // And make this class extendable
     Class.extend = arguments.callee;
     
     return Class;
   };
})();
```

[Understood](http://blog.buymeasoda.com/understanding-john-resigs-simple-javascript-i/ "Understanding John Resig's 'Simple JavaScript Inheritance' - Ian Hill ~ Design & development blog") anything? Well, after reading that exceptionally nice article I think it's time we looked at the similarities between John Resig's code and `augment`.

The first line of `Class.extend` is:

```javascript
var _super = this.prototype;
```

Hey what do you know - the first line of `Function.prototype.augment` is the same:

```javascript
var uber = this.prototype;
```

The next three lines of `Class.extend` are grouped together:

```javascript
initializing = true;
var prototype = new this();
initializing = false;
```

These three lines are replaced by a single line in `Function.prototype.augment`:

```javascript
var prototype = Object.create(uber);
```

It does the same thing. Check for yourself.

The next part of `Class.extend` is really daunting. It's so daunting that I'm simply going to explain the gist of it in a comment:

```javascript
for (var name in prop) {
    // Copy the properties over onto the new prototype
}
```

Because `Class.extend` takes an object enumerating the public members of the class it needs to iterate through all of them and individually add them to the new `prototype`. This is a pain. It also does some additional jugglery to make `this._super` work. It's overkill.

In contrast the entire loop is replaced by a single line in `Function.prototype.augment`:

```javascript
var constructor = classBodyFunction.call(prototype, this, uber);
```

The `classBodyFunction` is the anonymous function which wraps the body of the class (John Resig's `Class.extend` uses an object). It's called with two arguments - the base class `constructor` (which's called `this`) and it's `prototype` (which's called `uber`), and it's `this` pointer is set to the newly created `prototype` which allows us to add public methods to `this` directly. No need for a loop.

`Class.extend` then creates the actual constructor function to return:

```javascript
function Class() {
    if ( !initializing && this.init )
        this.init.apply(this, arguments);
}
```

In `Function.prototype.augment` this can be replaced with the following line:

```javascript
if (typeof constructor !== "function") constructor = function () {};
```

The next two lines in both functions are essentially the same. In `Class.extend` we have:

```javascript
Class.prototype = prototype;
Class.prototype.constructor = Class;
```

The equivalent in `Function.prototype.augment` is:

```javascript
prototype.constructor = constructor;
constructor.prototype = prototype;
```

Then in `Class.extend` we have:

```javascript
Class.extend = arguments.callee;
```

This line is omitted in `Function.prototype.augment` because `augment` already exists in the `prototype` chain on all functions. In essence you can `augment` any function you wish to - not just those created by `augment` itself.

Finally we simply return `Class` in `Class.extend` and `constructor` in `Function.prototype.augment`. That's all that there is to it. Which one do you prefer?
