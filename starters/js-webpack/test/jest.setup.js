import "jasmine-expect"

import IntlPolyfill from "intl"

// Jest and node only support English locale
// Therefore we add the polyfill for unit testing
Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

//
//  mock local & session storage
//
const base = Object.create(null);
base.getItem = function getItem(key) {
  return key in this ? this[key] : null;
};
base.setItem = function setItem(key, value) {
  this[key] = value || '';
};
base.removeItem = function removeItem(key) {
  delete this[key];
};
base.key = function key(index) {
  const keys = Object.keys(this);
  return keys[index] || null;
};
base.clear = function clear() {
  const keys = Object.keys(this);
  keys.forEach(key => {
    this.removeItem(key);
  });
};
Object.defineProperty(base, 'length', {
  get() {
    return Object.keys(this).length;
  },
});

const mock = () => {
  return Object.create(base);
};

Object.defineProperty(window, 'localStorage', {
  value: mock()
});
Object.defineProperty(window, 'sessionStorage', {
  value: mock()
});

// limit stacktrace for simpler error dumps
Error.stackTraceLimit = 2;
