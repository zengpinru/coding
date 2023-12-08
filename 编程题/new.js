function myNew(Fn, ...args) {
  const obj = Object.create(Fn.prototype);
  Fn.call(obj, ...args);
  return obj;
}
