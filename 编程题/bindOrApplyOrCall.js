// bind 的实现
Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function Fn() {
    const finalArgs = args.concat([...arguments]);
    return fn.apply(this instanceof Fn ? new Fn(...finalArgs) : context, finalArgs);
  }
}

// call 实现
Function.prototype.myCall = function (context = window, ...args) {
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const res = context[fnSymbol](...args);
  Reflect.deleteProperty(context, fnSymbol);
  return res;
}

// apply 实现
Function.prototype.myApply = function (context = window, arr) {
  const fnSymbol = new Symbol();
  context[fnSymbol] = this;
  const res = context[fnSymbol](...arr);
  Reflect.deleteProperty(context, fnSymbol);
  return res;
}
