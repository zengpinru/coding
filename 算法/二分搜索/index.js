/**
 * 二分搜索的关键点是：
 * 1. 理解“搜索区间”，比如[left, right]
 * 2. mid 这个点的考虑，是否已经在搜索的区域中
 */

/**
 * 代码模板
 * def binary_search(nums, target):
 *   left = 0, right = nums.length - 1
 *   while (left <= right):
 *     mid = left + (right - left) / 2
 *     if (nums[mid] === target):
 *       // return nums[mid] 正常的
 *       // right = mid - 1 搜索左边界
 *       // left = mid + 1 搜索右边界
 *     else if (nums[mid] > target)
 *       right = mid - 1
 *     else if (nums[mid] < target)
 *       left = mid + 1
 *   # 正常的
 *   return -1
 *   # 搜索左边界
 *   if (left >= nums.length) return -1
 *   return nums[left] === target ? nums[left] : -1
 *   # 搜索右边界
 *   if (right < 0) return -1
 *   return nums[right] === target ? nums[right] : -1 
 */
