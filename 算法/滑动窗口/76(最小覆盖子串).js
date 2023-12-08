/**
 * 思考过程：
 * 1. 当移动 right 扩大窗口，即加入字符时，应该更新哪些数据？
 * 2. 什么条件下，窗口应该暂停扩大，开始移动 left 缩小窗口？
 * 3. 当移动 left 缩小窗口时，即移出字符时，应该更新哪些数据？
 * 4. 我们要的结果应该在扩大窗口时还是缩小窗口时进行更新？
 */

/**
 * 代码模板总结
 * void slidingWindow(str) {
 *   const windowMap = {};
 * 
 *   let left = 0, right = 0;
 * 
 *   while (left < right && right < str.length) {
 *     // c 是将移入窗口的字符
 *     const c = str[right];
 *     windowMap[c] = (windowMap[c] || 0) + 1
 *     // 增大窗口
 *     right++;
 *     // 进行窗口内数据的一系列更新
 *     ...
 *     
 *     // 判断左侧窗口是否要收缩
 *     while (left < right && windowMap needs shrink) {
 *       // d 是将移出窗口的字符
 *       const d = str[left];
 *       windowMap[d] = (windowMap[d] || 0) - 1;
 *       // 缩小窗口
 *       left++;
 *       // 进行窗口内数据的一系列更新
 *       ...
 *     }
 *   }
 * }
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  // 初始化窗口值
  const needMap = {};
  const windowMap = {};
  for (const v of t) {
    needMap[v] = (needMap[v] || 0) + 1;
    windowMap[v] = 0;
  }

  let left = 0;
  let right = 0;

  // 标识满足条件的字符个数
  let vilid = 0;

  // 控制返回结果字符串的标识
  let start = 0;
  let len = Number.MAX_SAFE_INTEGER;

  while (right < s.length) {
    // 右移
    const c = s[right];
    right++;

    // 加入字符，更新数据
    if (needMap[c]) {
      windowMap[c] += 1;
      if (windowMap[c] === needMap[c]) {
        // 有一个字符满足条件
        vilid++;
      }
    }

    // 左移
    while (vilid === Object.keys(needMap).length) {
      // 更新一下结果
      if (right - left < len) {
        start = left;
        len = right - left;
      }

      const d = s[left];
      left++;

      // 移出字符，更新数据
      if (needMap[d]) {
        if (windowMap[d] === needMap[d]) {
          vilid--;
        }
        windowMap[d] -= 1;
      }
    }
  }

  return len === Number.MAX_SAFE_INTEGER ? '' : s.slice(start, start + len);
};

console.log(minWindow('aab', 'aab'));
