(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([/* 'jquery' */], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(/* require('jquery') */);
    } else {
        root.calc = factory(/* $ */);
    }
}(this, function (/* $ */) {
    return {
      sum: function(val1, val2) {
        return val1 + val2;
      },
      substract: function(val1, val2) {
        return val1 - val2;
      }
    };
}));
