# augment #

The world's smallest and fastest classical JavaScript inheritance pattern, `augment`, is a [seven line function](https://github.com/javascript/augment/blob/master/augment.js#L12-L18 "augment.js") which allows you to write [CoffeeScript style classes](http://coffeescript.org/#classes "CoffeeScript") with a flair of [simplicity](http://ejohn.org/blog/simple-javascript-inheritance/ "John Resig -   Simple JavaScript Inheritance"); and it still [beats the bejesus](http://jsperf.com/oop-benchmark/158 "JavaScript Object Oriented Libraries Benchmark · jsPerf") out of other JavaScript inheritance libraries.

Inspired by giants like [Jeremy Ashkenas](http://ashkenas.com/ "Jeremy/Ashkenas — Portfolio") and [John Resig](http://ejohn.org/ "John Resig - JavaScript Programmer"), `augment` is an augmentation of ideas. Classes created using `augment` have a CoffeeScript-like class structure, and a syntax like John Resig's classes; but they are more readable, intuitive and orders of magnitude faster. In addition they work on virtually every JavaScript platform.

## Installation ##

1. You can install `augment` on [node.js](http://nodejs.org/ "node.js") using the [npm](https://npmjs.org/ "npm") command `npm install augment`.
2. You can install `augment` on [RingoJS](http://ringojs.org/ "Home - RingoJS") using the [rp](https://github.com/grob/rp "grob/rp") command `rp install augment`.
3. You can install `augment` for web apps using the [component](https://github.com/component/component "component/component") command `component install javascript/augment`.
4. You can install `augment` for web apps using the [bower](http://bower.io/ "Bower - A package manager for the web") command `bower install augment`.

## Usage ##

1. You can use `augment` as a [CommonJS module](http://wiki.commonjs.org/wiki/Modules "Modules - CommonJS Spec Wiki"):

    ```javascript
    var augment = require("augment"); // module.exports must be supported
    ```

2. You can use `augment` with the [AMD API](https://github.com/amdjs/amdjs-api "Asynchronous Module Definition (AMD) API"):

    ```javascript
    define(["augment"], function (augment) {
        // ....
    });
    ```

3. You can include the latest copy in your web pages, [fiddles](http://jsfiddle.net/ "Create a new Fiddle - jsFiddle") and [benchmarks](http://jsperf.com/ "jsPerf: JavaScript performance playground"):

    ```html
    <script src="https://rawgithub.com/javascript/augment/master/augment.js"></script>
    ```

4. You can browse the [source code](https://github.com/javascript/augment/blob/master/augment.js "javascript/augment") and stick it into your program.

## Man Pages ##

1. [Getting Started](https://github.com/javascript/augment/wiki/Getting-Started "Getting Started · javascript/augment Wiki")
2. [Classical Inheritance](https://github.com/javascript/augment/wiki/Classical-Inheritance "Classical Inheritance · javascript/augment Wiki")
3. [Prototypal Inheritance](https://github.com/javascript/augment/wiki/Prototypal-Inheritance "Prototypal Inheritance · javascript/augment Wiki")

## License ##

The `augment` library is released under the MIT license. So feel free to modify and distribute it as you wish.