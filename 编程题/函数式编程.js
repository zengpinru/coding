// 函数柯里化实现

function curry(fn) {
  function curriedFn(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return function() {
      return curriedFn(...args.concat([...arguments]));
    }
  }
  return curriedFn;
}

function fn(a, b, z) {
  return a + b + z;
}

const testCurry = curry(fn);
console.log('柯里化', testCurry(1)(3)(4));

// 实现一个组合函数，函数从右往左执行
function compose(...fns) {
  return val => {
    return fns.reduceRight((pre, cur) => cur(pre), val);
  };
}

function fn1(a) {
  return a + 1;
}
 
function fn2(b) {
  return b * 2;
}

const testCompose = compose(fn1);
console.log('组合函数', testCompose(2));

// 实现一个管道函数，函数从左往右执行
function pipe(...fns) {
  return val => {
    return fns.reduce((pre, cur) => cur(pre), val);
  };
}
const testPipe = pipe(fn1, fn2);
console.log('管道函数', testPipe(2));
