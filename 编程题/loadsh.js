import { getType } from './获取类型.js';

// get 的实现
export function get(source, path, defaultValue) {
  let paths = path.replace(/\[(\w+)\]/g, '.$1').replace(/\['(\w+)'\]/g, '.$1').replace(/\["(\w+)"\]/g, '.$1').split('.');
  let result = source;
  for (const p of paths) {
    result = result?.[p];
  }
  return result === undefined ? defaultValue : result;
}

// set 的实现
export function set(source, path, value) {
  let paths = path.replace(/\[(\w+)\]/g, '.$1').replace(/\['(\w+)'\]/g, '.$1').replace(/\["(\w+)"\]/g, '.$1').split('.');
  paths.reduce((o, k, i, _) => {
    if (i === _.length - 1) {
      o[k] = value;
      return source;
    } else if (k in o) {
      return o[k];
    } else {
      o[k] = /^[0-9]+$/.test(_[i + 1]) ? [] : {};
      return o[k];
    }
  }, source);
  return source;
}

// cloneDeep 的实现
export function cloneDeep(target, map = new WeakMap()) {
  const type = getType(target);

  if (type === 'object') {
    const res = {};
    if (map.has(target)) {
      return map.get(target);
    }
    map.set(target, res);
    for (const [key, val] of Object.entries(target)) {
      res[key] = cloneDeep(val, map);
    }
    return res;
  }

  if (type === 'array') {
    const res = [];
    for (const [index, val] of target.entries()) {
      res[index] = cloneDeep(val, map);
    }
    return res;
  }

  return target;
}

// merge 的实现
export function merge(object, ...sources) {
  for (const source of sources) {
    for (const key in source) {
      if (source[key] === undefined && key in object) {
        continue;
      }
      const sourceType = getType(source[key]);
      const objectType = getType(object[key]);
      if (sourceType === 'array' || sourceType === 'object') {
        if (sourceType === objectType) {
          merge(object[key], source[key]);
        } else {
          object[key] = source[key];
        }
      } else {
        object[key] = source[key];
      }
    }
  }
  return object;
}

// deepEqual 的实现
export function deepEqual(x, y) {
  // 要区分 +0 和 -0
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  }

  // 处理 NaN 的情况
  if (x !== x) {
    return y !== y;
  }

  const xType = getType(x);
  const yType = getType(y);

  // 处理 null 的情况
  if (xType === 'null' || yType === 'null') {
    return false;
  }

  // 处理数组情况
  if (xType === 'array' && yType === 'array') {
    if (x.length !== y.length) {
      return false;
    }
    for (let i = 0; i < x.length; i++) {
      if (!deepEqual(x[i], y[i])) {
        return false;
      }
    }
    return true;
  }

  // 处理对象情况
  if (xType === 'object' && yType === 'object') {
    if (Object.keys(x).length !== Object.keys(y).length) {
      return false;
    }
    for (const key of Object.keys(x)) {
      if (!deepEqual(x[key], y[key])) {
        return false;
      }
    }
    return true;
  }

  return false;
}

// once 的实现
export function once(fn) {
  let result;
  let revoked = false;

  return (...args) => {
    if (revoked) {
      return result;
    }
    result = fn(...args);
    revoked = true;
    return result;
  }
}

/**
 * 判断一个数是否为整数
 * @param {number} numb
 */
export function isInteger(num) {
  return typeof num === 'number' && num % 1 === 0;
}

/**
 * 短横线转驼峰
 * @param {string} str
 */
export function toCamelCase(str) {
  return str.replace(/-([a-zA-Z])/g, ($0, $1) => {
    return $1.toUpperCase();
  });
}

/**
 * 驼峰转短横线
 * @param {string} str
 */
export function toKebabCase(str) {
  return str.replace(/([A-Z])/g, ($0, $1) => {
    return '-' + $1.toLowerCase();
  });
}

/**
 * 数组分组
 * @param {any[]} arr 
 * @param {number} size 
 */
export function chunk(arr, size) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    const idx = Math.floor(i / size);
    res[idx] ??= [];
    res[idx].push(arr[i]);
  }
  return res;
}

/**
 * 实现一个类似 loadsh 中的 omit 函数
 * @param {object} source 
 * @param {string[]} keys 
 */
export function omit(source, keys) {
  const res = {};
  for (const [key, val] of Object.entries(source)) {
    if (keys.includes(key)) {
      continue;
    }
    res[key] = val;
  }
  return res;
}

/**
 * 实现一个类似 loadsh 中的 omitBy 函数
 * @param {object} source 
 * @param {(val: any) => boolean} cb 
 */
export function omitBy(source, cb) {
  const res = {};
  for (const [key, val] of Object.entries(source)) {
    if (cb(val)) {
      continue;
    }
    res[key] = val;
  }
  return res;
}

const test = {
  a: {
    b: {
      c: 1
    }
  },
  arr: [1],
};

console.log(deepEqual([1], [1, 2]));
