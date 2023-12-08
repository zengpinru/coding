import { get } from './loadsh.js';

// 封装一个加载图片的函数
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = function () {
      resolve(image);
    }
    image.onerror = function (e) {
      reject(e);
    }
    image.src = url;
  });
}

const arr = (new Array(10000)).map((cur, i) => i + 1);

/**
 * 对字符串进行编码
 * @param {string} str
 */
function encode(str) {
  const strArr = [];
  for (const s of str) {
    if (strArr.length && strArr[strArr.length - 1][0] === s) {
      strArr[strArr.length - 1][1] = strArr[strArr.length - 1][1] + 1;
    } else {
      strArr.push([s, 1]);
    }
  }
  return strArr.map(item => {
    return `${item[0]}${item[1]}`;
  }).join('');
}


/**
 * 实现一个无限累加的 sum 函数
 * @param  {...number} args
 */
function sum(...args) {
  const f = (...rest) => sum(...args, ...rest);
  f.valueOf = () => args.reduce((x, y) => x + y, 0);
  return f;
}

/**
 * 实现一个 sleep 函数
 * @param {number} time
 */
function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, [time]);
  });
}

/**
 * 给数字添加千分位
 * @param {number} number 
 * @param {string} thousandsSplitter 
 * @returns 
 */
function numberThousands(number, thousandsSplitter = ',') {
  const reverse = str => str.split('').reverse().join('');
  const str = reverse(String(number)).replace(/(\d\d\d)(?=\d)/g, '$1' + thousandsSplitter);
  return reverse(str);
}

/**
 * 生成可重复的 6 位数验证码
 */
function randomCode() {
  const arr = new Array(6).fill(0).map(() => {
    return Math.floor(Math.random() * 9);
  });
  return arr;
}
// console.log(randomCode());

/**
 * 生成不可重复的 6 位数验证码
 */
function randomUniqueCode() {
  // 循环法
}

/**
 * 字符串解码
 * @param {string} str
 */
function countOfLetters(str) {
  function letterMultipleCount(target, multiples) {
    for (const [key, val] of Object.entries(target)) {
      target[key] = val * multiples;
    }
    return target;
  }

  function letterAddCount(target, source) {
    for (const [key, val] of Object.entries(source)) {
      target[key] = (target[key] || 0) + val;
    }
    return target;
  }

  const stack = [{}];
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    let count = 1;

    // 下一个字符是否是数字
    if (/\d/.test(str[i + 1])) {
      count = +str[++i];
    }

    // 如果是 ( 则推一个新的对象进去
    if (ch === '(') {
      stack.push({});
      continue;
    }

    // 如果是 ) 则出栈
    if (ch === ')') {
      const pop = stack.pop();
      const last = stack[stack.length - 1];
      letterAddCount(last, letterMultipleCount(pop, count));
      continue;
    }

    const last = stack[stack.length - 1];
    last[ch] = (last[ch] || 0) + count;
  }

  return stack.pop();
}

// console.log(countOfLetters('C4(A(A3B)2)2'));

/**
 * 实现一个渲染模板函数
 * @param {string} template 
 * @param {object} data 
 */
function render(template, data) {
  return template.replace(/\{\{\s*([^\s]+)\s*\}\}/g, ($0, $1) => {
    return get(data, $1);
  });
}

// console.log(render('{{ user["name"] }}，你今天很厉害！用户 ID: {{user.id}}', { user: { id: 10086, name: 'zpr' } }));

/**
 * 十进制转二进制
 * @param {number} num
 */
function integerToBin(num) {
  if (num === 0) {
    return 0;
  }
  const res = [];
  let current = num;
  while (current / 2) {
    const next = current % 2;
    current = Math.floor(current / 2);
    res.unshift(next);
  }
  return res.join('');
}

/**
 * 二进制转十进制
 * @param {string} str
 */
function binToInteger(str) {
  let res = 0;
  let count = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    res = Math.pow(2, count) * Number(str[i]) + res;
    count++;
  }
  return res;
}
// console.log(binToInteger(integerToBin(0)));

/**
 * 实现一个 orm 类似的 find 链式调用
 * @param {object[]} data 
 */
function find(data) {
  return {
    value: data,
    where (match) {
      this.value = this.value.filter(item => {
        return Object.entries(match).every(([key, value]) => {
          if (getType(value) === 'regexp') {
            return value.test(item[key]);
          }
          return item[key] === value;
        });
      });
      return this;
    },
    orderBy(key, type) {
      this.value.sort((x, y) => {
        return type !== 'desc' ? x[key] - y[key] : y[key] - x[key];
      });
      return this;
    },
  };
}

/**
 * 把回调函数改成 promise 的形式
 * @param {(...args) => any} fn 
 */
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    });
  };
}
