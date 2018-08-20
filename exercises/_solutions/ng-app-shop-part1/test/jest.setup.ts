import 'jest-preset-angular';
import 'expect-more-jest';

import * as IntlPolyfill from 'intl'; // tslint:disable-line

// Jest and node only support English locale
// Therefore we add the polyfill for unit testing
Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

//
//  mock local & session storage
//
const base = Object.create(null);
base.getItem = function getItem(key: any) {
  return key in this ? this[key] : null;
};
base.setItem = function setItem(key: any, value: any) {
  this[key] = value || '';
};
base.removeItem = function removeItem(key: any) {
  delete this[key];
};
base.key = function key(index: any) {
  const keys = Object.keys(this);
  return keys[index] || null;
};
base.clear = function clear() {
  const keys = Object.keys(this);
  keys.forEach((key) => {
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
  value: mock(),
});
Object.defineProperty(window, 'sessionStorage', {
  value: mock(),
});

// limit stacktrace for simpler error dumps
Error['stackTraceLimit'] = 2;
