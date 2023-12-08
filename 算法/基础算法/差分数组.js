export class Difference {
  /**
   * 输入一个初始化数组，区间操作将在这个数组上进行
   * @param {number[]} nums 
   */
  constructor(nums) {
    this.diff = [];
    this.diff[0] = nums[0];
    for (let i = 1; i < nums.length; i++) {
      this.diff[i] = nums[i] - nums[i - 1];
    }
  }

  /**
   * 给闭区间 [i, j] 增加 val（可以是负数）
   * @param {number} i
   * @param {number} j
   * @param {number} val
   */
  increment(i, j, val) {
    this.diff[i] += val;
    if (j + 1 < this.diff.length) {
      this.diff[j + 1] -= val;
    }
  }

  /**
   * 返回结果数组
   */
  getRes() {
    const res = [];
    res[0] = this.diff[0];
    for (let i = 1; i < this.diff.length; i++) {
      res[i] = this.diff[i] + res[i - 1];
    }
    return res;
  }
}

const diff = new Difference([1, 2, 3]);
console.log(diff);
diff.increment(0, 2, 5);
console.log(diff.getRes());