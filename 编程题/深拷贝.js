const baseType = ['undefined', 'boolean', 'string', 'number', 'symbol'];

function deepClone(target) {
  const targetType = typeof target;
  if (target === null || baseType.includes(targetType)) {
    return target;
  }
  
  if (targetType === 'function') {
    return new Function(`return ${target.toString()}`);
  }

  // 还有一些特殊的对象需要处理，如 RegExp、Set、Map 等等

  if (Array.isArray(target)) {
    const newTarget = [];
    for (const [index, value] of target.entries()) {
      newTarget[index] = deepClone(value);
    }
    return newTarget;
  }

  if (targetType === 'object') {
    const newTarget = {};
    for (const [key, value] of Object.entries(target)) {
      if (target.hasOwnProperty(key)) {
        newTarget[key] = deepClone(value);
      }
    }
    return newTarget;
  }

  return target;
}

const obj = {
  a: 1,
  b: 2,
  c: [1, 3, { name: 'xx' }],
  d: function() { console.log('test') },
  e: {
    age: 12,
    test: {
      a: 'xx'
    },
  },
  f: null,
}

console.log(deepClone(obj));
