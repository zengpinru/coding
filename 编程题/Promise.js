class MyPromise {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new Error(`${executor} is not a function`);
    }
    this.value = null;
    this.reason = null;
    this.state = MyPromise.PENDING;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    // 防止 this 指向异常
    this.initBind();

    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  resolve(value) {
    if (this.state === MyPromise.PENDING) {
      this.value = value;
      this.state = MyPromise.FULFILLED;
      this.onFulfilledCallbacks.forEach(fn => fn(value));
    }
  }

  reject(reason) {
    if (this.state === MyPromise.PENDING) {
      this.reason = reason;
      this.state = MyPromise.REJECTED;
      this.onRejectedCallbacks.forEach(fn => fn(reason));
    }
  }

  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }

  then(onFulfilled, onRejected) {
    const newPromise = new MyPromise((resolve, reject) => {
      if (this.state === MyPromise.FULFILLED) {
        try {
          const returnVal = onFulfilled(this.value);
          MyPromise.resolvePromise(newPromise. returnVal, resolve, reject);
        } catch(e) {
          reject(e);
        }
      } else if (this.state === MyPromise.REJECTED) {
        try {
          const returnVal = onRejected(this.reason);
          MyPromise.resolvePromise(newPromise. returnVal, resolve, reject);
        } catch(e) {
          reject(e);
        }
      } else {
        // 处理异步执行的 resolve 或 reject
        this.onFulfilledCallbacks.push(value => {
          try {
            const returnVal = onFulfilled(value);
            MyPromise.resolvePromise(newPromise. returnVal, resolve, reject);
          } catch(e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(reason => {
          try {
            const returnVal = onRejected(reason);
            MyPromise.resolvePromise(newPromise. returnVal, resolve, reject);
          } catch(e) {
            reject(e);
          }
        });
      }
    });
    return newPromise;
  }
}

MyPromise.PENDING = 'padding';
MyPromise.FULFILLED = 'fulfilled';
MyPromise.REJECTED = 'rejected';
MyPromise.resolvePromise = function(newPromise, returnVal, resolve, reject) {
  if (newPromise === returnVal) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  if (returnVal instanceof MyPromise) {
    returnVal.then(
      val => {
        // 继续递归，直到拿到具体的值
        MyPromise.resolvePromise(newPromise, val, resolve, reject);
      },
      err => {
        reject(err);
      }
    );
  } else {
    resolve(returnVal);
  }
}

// all 的实现
function all(arr) {
  const res = [];
  let len = 0;
  return new Promise((resolve, reject) => {
    for (const [idx, val] of arr.entries()) {
      Promise.resolve(val).then(val => {
        res[idx] = val;
        if (++len === arr.length) {
          resolve(res);
        }
      }).catch(err => reject(err));
    }
  });
}

// allsettled 的实现
function allsettled(arr) {
  const result = [];
  let len = 0;
  return new Promise((resolve) => {
    for (const [idx, val] of arr.entries()) {
      Promise.resolve(val).then(res => {
        result[idx] = { status: 'fulfilled', value: res };
        if (++len === arr.length) {
          resolve(result);
        }
      }).catch(err => {
        result[idx] = { status: 'rejected', reason: err };
        if (++len === arr.length) {
          resolve(result);
        }
      });
    }
  });
}

// race 的实现
function race(arr) {
  return new Promise((resolve, reject) => {
    for (const val of arr) {
      Promise.resolve(val).then(val => resolve(val)).then(err => reject(err));
    }
  });
}

// fakeFinally 的实现
Promise.prototype.myFinally = function (callback) {
  return this.then(data => {
    return Promise.resolve(callback()).then(() => data);
  }, err => {
    return Promise.resolve(callback()).then(() => { throw err });
  });
}

// resolve 的实现
Promise.prototype.myResolve = function (val) {
  if (val instanceof Promise) {
    return val;
  }
  return new Promise(resolve => {
    resolve(value);
  });
}

// reject 的实现
Promise.prototype.myReject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
}

// catch 的实现
Promise.prototype.myCatch = function (onRejected) {
  return this.then(null, onRejected);
}

const promise = new MyPromise((resolve, reject) => {
  console.log('test');
  setTimeout(res => {
    resolve('ok');
  }, 1000);
});

promise.then(res => {
  console.log('xx', res);
})

/**
 * 实现 promise.map，限制 promise 的并发数
 * @param {any[]} list 
 * @param {(val: any, index: number) => any} mapper 
 * @param {*} concurrency 
 * @returns 
 */
function pMap(list, mapper, concurrency = Infinity) {
  return new Promise((resolve, reject) => {
    const result = [];
    let currentIndex = 0;
    let resolveCount = 0;
    function next() {
      const index = currentIndex++;
      Promise.resolve(list[index])
        .then(val => mapper(val, index))
        .then(val => {
          result[index] = val;
          if (++resolveCount === list.len) {
            resolve(result);
          }
          if (currentIndex < list.length) {
            next();
          }
        });
    }
    for (let i = 0; i < concurrency && i < len; i++) {
      next();
    }
  });
}
