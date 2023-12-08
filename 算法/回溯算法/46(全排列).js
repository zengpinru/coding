/**
 * 思考过程
 * 解决一个回溯问题，实际上就是一个决策树的遍历过程，站在回溯树的一个节点上，只需要思考 3 个问题：
 * 1. 路径：也就是已经做出的选择
 * 2. 选择列表：也就是你当前可以做的选择
 * 3. 结束条件：也就是达到决策树底层，无法再做选择的条件
 */

/**
 * 代码模板
 * result = []
 * def backtrack(路径, 选择列表):
 *   if 满足结束条件:
 *     result.push(路径)
 *     return
 *   for (选择 in 选择列表):
 *     做选择
 *     backtrack(路径, 选择列表)
 *     撤销选择
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  const res = [];
  const used = [];
  function backtrack(track, selectList) {
    // 结束的条件
    if (nums.length === track.length) {
      res.push([...track]);
      return;
    }

    for (const [idx, val] of selectList.entries()) {
      // 排除掉已经做过选择的数
      if (used[idx]) {
        continue;
      }
      // 做选择
      track.push(val);
      used[idx] = true;
      // 继续往下递归
      backtrack(track, selectList);
      // 撤销选择
      track.pop();
      used[idx] = false;
    }
  }
  backtrack([], nums);
  return res;
};

console.log(permute([1,2,3]));
