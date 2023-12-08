// 实现原生的 instanceOf

function fakeInstanceOf(obj, parent) {
  let current = Reflect.getPrototypeOf(obj);
  while (current) {
    if (current === parent.prototype) {
      return true;
    }
    current = Reflect.getPrototypeOf(current);
  }
  return false;
}
