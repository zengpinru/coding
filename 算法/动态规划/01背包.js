/**
 * @param {number} w 背包的容量
 * @param {number} n 多少个物品
 * @param {number[]} wt 物品的重量
 * @param {number[]} val 物品的价值
 */
function fn(w, n, wt, val) {
  // dp[i][j]：对于前 i 个物品，当前背包的容量为 w，这种情况下能装最大价值是 dp[i][j]
  const dp = new Array(n + 1).fill(0).map(() => new Array(w + 1).fill(0));

  for (let i = 1; i <= n; i++) { // 选择物品
    for (let j = 1; j <= w; j++) { // 选择重量
      if (j - wt[i - 1] < 0) {
        // 容量不够，不装
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i - 1][j - wt[j - 1]] + val[i - 1],
        );
      }
    }
  }

  return dp[n][w];
}
