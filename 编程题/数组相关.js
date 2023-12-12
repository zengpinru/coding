// 实现 flatMap
Array.prototype.myFlatMap = function (callback) {
  const array = this;
  const newArray = [];
  array.forEach((val, idx) => {
    newArray[idx] = callback(val, idx, array);
  });
  newArray.flat();
  return newArray;
}

// 实现 map
Array.prototype.myMap = function (callback) {
  const res = [];
  for (const [idx, val] of this.entries()) {
    res[idx] = callback(val, idx, this);
  }
  return res;
}

// 实现 flat 函数
Array.prototype.myFlat = function (depth = 1) {
  function process(arr, flag) {
    if (flag === 0) {
      return arr;
    }
    flag--;
    const res = [];
    for (const val of arr.values()) {
      if (Array.isArray(val)) {
        res.push(...process(val, flag));
      } else {
        res.push(val);
      }
    }
    return res;
  }
  return process(this, depth);
}

// 实现 Array.of
Array.myOf = function () {
  return [].slice.call(arguments);
}

// 实现 reduce 函数
Array.prototype.myReduce = function (callback, init) {
  let next = init !== undefined ? init : this[0];
  for (let i = init !== undefined ? 0 : 1; i < this.length; i++) {
    next = callback(next, this[i], i);
  }
  return next;
}

/**
 * 从数组中随机取出一个元素
 * @param {any[]} arr 
 */
function sample(arr) {
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

/**
 * 实现一个数组洗牌函数
 * @param {number[]} arr 
 */
function shuffle(arr) {
  const res = [...arr];
  for (let i = arr.length - 1; i > 0; i--) {
    const swapIndex = Math.floor(Math.random() * (i + 1));
    [res[i], res[swapIndex]] = [res[swapIndex], res[i]];
  }
  return res;
}

/**
 * 取数组交集
 * @param  {...number[]} list 
 */
function intersection(...list) {
  const res = list.reduce((x, y) => {
    return x.filter(item => y.includes(item));
  });
  return [...new Set(res)];
}


/**
 * 根据每个对象的某一个具体属性来进行去重
 * @param {object[]} arr
 * @param {string} property 
 */
function handleArrObj(arr, property) {
  const res = [];
  const map = {};
  for (const [idx, val] of arr.entries()) {
    if (!map[val[property]]) {
      res.push(val);
      map[val[property]] = true;
    }
  }
  return res;
}
