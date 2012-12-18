if (typeof Object.create !== "function") {
    Object.create = function (prototype) {
        function constructor() {}
        constructor.prototype = prototype;
        return new constructor;
    };
}

Function.prototype.augment = function (classBodyFunction) {
    var uber = this.prototype;
    var prototype = Object.create(uber);
    var constructor = classBodyFunction.call(prototype, this, uber);
    if (typeof constructor !== "function") constructor = function () {};
    prototype.constructor = constructor;
    constructor.prototype = prototype;
    return constructor;
};
