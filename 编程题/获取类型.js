export function getType(target) {
  return Object.prototype.toString.call(target).replace(/\[object\s(.+)\]/, '$1').toLowerCase();
}
// const test_1 = 1;
// const test_2 = '1';
// const test_3 = undefined;
// const test_4 = null;
// const test_5 = true;
// const test_6 = Symbol();
// const test_7 = /\./;
// const test_8 = new Date();
// const test_9 = new Set();
// const test_10 = new Map();
// const test_11 = [];
// const test_12 = {};
// const test_13 = function () {}

// console.log(getType(test_1));
// console.log(getType(test_2));
// console.log(getType(test_3));
// console.log(getType(test_4));
// console.log(getType(test_5));
// console.log(getType(test_6));
// console.log(getType(test_7));
// console.log(getType(test_8));
// console.log(getType(test_9));
// console.log(getType(test_10));
// console.log(getType(test_11));
// console.log(getType(test_12));
// console.log(getType(test_13));

