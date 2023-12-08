// 实现一个自动执行 generator 的函数

function getType(target) {
  return Object.prototype.toString.call(target).replace(/\[object\s(.+)\]/, '$1').toLowerCase();
}

function asyncFn(genFn, ...args) {
  return new Promise((resolve, reject) => {
    const gen = genFn(...args);

    function step(nextFn) {
      let next;
      try {
        next = nextFn();
      } catch (err) {
        return reject(err);
      }

      if (next.done) {
        return resolve(next.value);
      }

      if (getType(next.value) === 'promise') {
        next.value.then(res => {
          step(() => gen.next(res));
        }).catch(err => {
          step(() => gen.throw(err));
        });
      } else {
        step(() => gen.next(next.value));
      }
    }

    step(() => gen.next(undefined));
  });
}
