/**
 * 零钱兑换
 */

// 暴力解法
const resArr = [];
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChangeOfViolence = function(coins, amount, count) {
  if (amount <= 0) {
    amount === 0 && resArr.push(count);
    return;
  }
  for (const val of coins) {
    coinChangeOfViolence(coins, amount - val, count + 1);
  }
};

coinChangeOfViolence([1, 2, 5], 11, 0);
console.log('暴力解法: ', Math.min(...resArr));


/**
 * dp 解法思考过程
 * 1. 确定状态，也就是原问题和子问题中会变化的变量。例如这个凑零钱的过程，假设目标金额是 11 元，选择一枚面额为 5 元的硬币，那么你
 * 现在的目标金额就变成了 6 元。因为硬币数量是无限的，硬币的面额也是题目给的，只有目标金额会不断向 base case 靠近，所以唯一的状态
 * 就是目标金额 amount
 * 2. 确定选择，也就是导致状态产生变化的行为。目标金额为什么会变化呢，因为你在选择硬币，每选择一枚硬币，就相当于减少了目标金额。
 * 3. 明确 dp 函数/数组的定义。这里是自顶向下的解法，所以会有一个递归的 dp 函数，一般来说函数的参数就是状态转移中会变化的量，也就是
 * 上面说的状态；函数的返回值就是题目要求我们计算的量。如本题，状态只有一个，即“目标金额”，题目要求我们计算凑出目标金额所需的最少硬币数量。
 * 4. 明确 base case：dp[0] = 0;
 * 5. 最后再通过备忘录的方式优化重叠的子问题。
 */

/**
 * 自顶向下递归的动态规划
 * def dp (状态1, 状态2, ...):
 *   for (选择 in 所有可能的选择):
 *     # 此时的状态已经因为做了选择而改变
 *     result = 求最值(result, dp(状态1, 状态2, ...))
 *   return result
 */

/**
 * 自底向上迭代的动态规划
 * # 初始化 base case
 * dp[0][0][...] = base case
 * # 进行状态转移
 * for (状态 1 in 状态 1 的所有取值):
 *   for (状态 2 in 状态 2 的所有取值):
 *     for ...
 *       dp[状态 1][状态 2][...] = 求最值(选择 1， 选择 2, ...)  
 */

function dpOfRecursion(coins, amount, memo) {
  // base case
  if (amount === 0) {
    return 0;
  }
  if (amount < 0) {
    return -1;
  }

  // 查备忘录，防止重复计算
  if (memo[amount] !== -666) {
    return memo[amount];
  }

  let res = Number.MAX_SAFE_INTEGER;
  for (const val of coins) {
    const subRes = dpOfRecursion(coins, amount - val, memo);
    if (subRes === -1) {
      continue;
    }
    res = Math.min(res, subRes + 1);
  }
  // 把计算结果存到备忘录中
  memo[amount] = res === Number.MAX_SAFE_INTEGER ? - 1 : res;
  return memo[amount];
}

/**
 * 递归解法
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChangeOfRecursion = function(coins, amount) {
  // 通过备忘录的方式消除重复计算子问题
  const memo = (new Array(amount + 1)).fill(-666);
  return dpOfRecursion(coins, amount, memo);
};

console.log('dpOfRecursion 解法: ', coinChangeOfRecursion([1, 2, 5], 11));

// 迭代解法
var coinChangeOfIteration = function (coins, amount) {
  const dp = (new Array(amount + 1)).fill(amount + 1);
  // base case
  dp[0] = 0;
  // 外层 for 循环在遍历所有状态的所有取值
  for (const i = 0; i <= amount; i++) {
    // 内层 for 循环求出所有选择的最小值
    for (const coin of coins) {
      if (i - coin < 0) {
        continue;
      }
      dp[i] = Math.min(dp[i - coin] + 1, dp[i]);
    }
  }
  return dp[amount] === amount + 1 ? -1 : dp[amount];
}
