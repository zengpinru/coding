/**
 * 一句话总结：快速排序是将一个元素排好序，然后再将剩下的元素排好序。
 */

/**
 * 交换数组的两个元素
 * @param {any[]} nums
 * @param {number} i
 * @param {number} j
 */
function swap(nums, i, j) {
  [nums[i], nums[j]] = [nums[j], nums[i]];
}

/**
 * @param {any[]} nums 
 * @param {number} lIdx 
 * @param {number} rIdx 
 * @returns {[number, number]}
 */
function partition(nums, lIdx, rIdx) {
  let less = lIdx - 1;
  let more = rIdx + 1;
  let curIdx = lIdx;
  const markNum = nums[rIdx];
  while (curIdx < more) {
    // 有 3 中情况
    if (nums[curIdx] < markNum) {
      // 当前值小于基准
      swap(nums, ++less, curIdx);
      curIdx++;
    } else if (nums[curIdx] > markNum) {
      // 当前值大于基准
      swap(nums, --more, curIdx);
    } else {
      // 当前值等于基准
      curIdx++;
    }
  }
  return [less, more];
}

/**
 * @param {any[]} nums
 * @param {number} lIdx
 * @param {number} rIdx
 */
function quick_sort(nums, lIdx, rIdx) {
  if (lIdx >= rIdx) {
    return;
  }
  const [less, more] = partition(nums, lIdx, rIdx);
  quick_sort(nums, lIdx, less);
  quick_sort(nums, more, rIdx);
}

/**
 * @param {any[]} nums
 */
function sort(nums) {
  quick_sort(nums, 0, nums.length - 1);
  return nums;
}

const arr = [2, 0, 10, 4, -1, 0, 23, 88];
sort(arr);
console.log('快排: ', arr);
