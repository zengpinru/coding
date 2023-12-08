/**
 * 给对象实现一个迭代器模式
 */

const obj = {
  a: {
    b: 'b',
    d: 'd',
    f: {
      e: 'e',
    },
  },
  c: 'c'
};

// function each(target, callback) {
//   if (typeof target === 'object' && target !== null) {
//     for (const [key, val] of Object.entries(target)) {
//       callback(key, val);
//       each(val, callback);
//     }
//   }
// }

// each(obj, (key, val) => {
//   console.log(key, val);
// });

function iteratorAdapter(target) {
  Object.defineProperty(target, Symbol.iterator, {
    value: () => {
      const queue = [];
      for (const val of Object.values(target)) {
        queue.push(val);
      }
      return {
        next: () => {
          if (!queue.length) {
            return {
              value: undefined,
              done: true,
            };
          }
          const curVal = queue.shift();
          if (typeof curVal === 'object' && curVal !== null && !Array.isArray(curVal)) {
            const arr = [];
            for (const val of Object.values(curVal)) {
              arr.push(val);
            }
            queue.unshift(...arr);
          }
          return {
            value: curVal,
            done: false,
          };
        },
      };
    },
  });
  return target;
}

const objIterator = iteratorAdapter.bind(obj)(obj);
for (const val of objIterator) {
  console.log(val);
}