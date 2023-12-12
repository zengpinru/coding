// 实现一个单例模式的构造器
function proxy(func) {
  let instance = null;
  return new Proxy(func, {
    construct(target, ...args) {
      if (!instance) {
        instance = Reflect.construct(target, ...args);
      }
      return instance;
    }
  });
}

class Logger {
  // constructor() {
  //   if (!Logger.instance) {
  //     Logger.instance = this;
  //   }
  //   return Logger.instance;
  // }
  info() {
    console.log('info');
  }
}

const SingleLogger = proxy(Logger);

const log1 = new SingleLogger();
const log2 = new SingleLogger();

console.log(log1 === log2);

log1.test = 'xx';
console.log(log2.test);
