Function.prototype.augment = function (body) {
    var base = this.prototype;
    var prototype = Object.create(base);
    body.apply(prototype, Array.from(arguments, 1).concat(base));
    if (!Object.ownPropertyOf(prototype, "constructor")) return prototype;
    var constructor = prototype.constructor;
    constructor.prototype = prototype;
    return constructor;
};

(function (functProto) {
    var bind = functProto.bind;
    var bindable = Function.bindable = bind.bind(bind);
    var callable = Function.callable = bindable(functProto.call);
    Object.ownPropertyOf = callable(Object.prototype.hasOwnProperty);
    Array.from = callable(Array.prototype.slice);
}(Function.prototype));
