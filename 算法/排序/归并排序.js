/**
 * 一句话总结归并排序：就是把左边的数组排序好，在把右边数组排序好，然后把两边的数组合并。最后整体有序。
 */

/**
 * 从上面的总结可以看出，左边排序是一个子问题的结果，右边排序也是一个子问题结果。最后从这个两个子问题的结果推导出原问题的结果。
 * 这不是二叉树里面的分解问题框架吗？
 */

/**
 * 合并逻辑
 * @param {any[]} nums 
 * @param {number} lIdx 
 * @param {number} mid 
 * @param {number} rIdx 
 * @param {any[]} temp 辅助数组
 */
function merge(nums, lIdx, mid, rIdx, temp) {
  for (let i = lIdx; i <= rIdx; i++) {
    temp[i] = nums[i];
  }

  let l = lIdx;
  let r = mid + 1;
  for (let i = lIdx; i <= rIdx; i++) {
    if (l === mid + 1) {
      // 左边数组已全被合并
      nums[i] = temp[r++];
    } else if (r === rIdx + 1) {
      // 右边数组已全部被合并
      nums[i] = temp[l++];
    } else if (temp[l] > temp[r]) {
      nums[i] = temp[r++];
    } else {
      nums[i] = temp[l++];
    }
  }
}

/**
 * 归并排序
 * @param {any[]} nums
 * @param {number} lIdx
 * @param {number} rIdx
 * @param {any[]} temp 辅助数组
 */
function merge_sort(nums, lIdx, rIdx, temp) {
  // 一个元素不需要排序
  if (lIdx >= rIdx) {
    return;
  }

  const mid = Math.floor(lIdx + (rIdx - lIdx) / 2);
  // 左边已排好序
  merge_sort(nums, lIdx, mid, temp);
  // 右边已排好序
  merge_sort(nums, mid + 1, rIdx, temp);

  // 最终合并，整体有序
  merge(nums, lIdx, mid, rIdx, temp);
}

/**
 * @param {array} nums
 * @returns
 */
function sort(nums) {
  const temp = [...nums];
  merge_sort(nums, 0, nums.length - 1, temp);
  return nums;
}

const arr = [2, 0, 10, 4, -1, 0, 23, 88];
sort(arr);
console.log(arr);