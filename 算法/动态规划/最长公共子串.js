/**
 * 
 * @param {string} s1 
 * @param {string} s2 
 */
function fn(s1, s2) {
  const dp = new Array(s1.length + 1).fill(0).map(() => new Array(s2.length + 1).fill(0));

  let end = 0;
  let max = 0;
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      }
      if (dp[i][j] > max) {
        max = dp[i][j];
        end = i;
      }
    }
  }

  return s1.slice(end - max, end);
}

console.log(fn('babcfef', 'dbcf'));
