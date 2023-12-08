/**
 * BFS 出现的场景本质就是让你在一幅“图”中找到从起点到终点的最短距离。
 */

/**
 * 框架模板
 * // 定义从起点到终点的最近距离
 * def BFS(start, target):
 *   queue = [] // 队列
 *   visited = new Map() // 避免走回头路
 * 
 *   queue.push(start) // 将起点加入队列
 *   visited.set(start, true) 
 *   step = 0 // 记录扩散的步数
 *   
 *   while(queue.length):
 *     temp = [...queue], queue = []
 *     // 将当前队列中的所有节点向四周扩散
 *     while(temp.length):
 *       cur = temp.shift()
 *       // 判断是否到达终点
 *       if (cur === target)
 *         return step
 *       // 将 cur 相邻的节点加入队列
 *       for (node in cur):
 *         if (visited.has(node))
 *           queue.push(node)
 *           visited.set(node, true)
 *      step++
 *    return xxx
 */

// 向上拨动
function plusOne(str, index) {
  const strArr = str.split('');
  if (strArr[index] === '9') {
    strArr[index] = '0';
  } else {
    strArr[index] = String(Number(strArr[index]) + 1);
  }
  return strArr.join('');
}

// 向下拨动
function minusOne(str, index) {
  const strArr = str.split('');
  if (strArr[index] === '0') {
    strArr[index] = '9';
  } else {
    strArr[index] =  String(Number(strArr[index]) - 1);
  }
  return strArr.join('');
}

/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function(deadends, target) {
  const deadMap = new Map();
  deadends.forEach(item => deadMap.set(item, true));
  const visitedMap = new Map();
  let queue = ['0000'];
  visitedMap.set('0000', true);
  let step = 0;
  while (queue.length) {
    const temp = [...queue];
    queue = [];
    while (temp.length) {
      const cur = temp.shift();

      // 判断是否达到终点
      if (deadMap.has(cur)) {
        continue;
      }
      if (cur === target) {
        return step;
      }

      // 把一个节点的未遍历相邻节点加入队列
      for (let count = 0; count < 4; count++) {
        // 向上拨动
        const up = plusOne(cur, count);
        if (!visitedMap.has(up)) {
          visitedMap.set(up, true);
          queue.push(up);
        }

        // 向下拨动
        const down = minusOne(cur, count);
        if (!visitedMap.has(down)) {
          visitedMap.set(down, true);
          queue.push(down);
        }
      }
    }
    step++;
  }
  return -1;
};

console.log(plusOne('0000', 1));
console.log(minusOne('0000', 1));
console.log(openLock(["0201","0101","0102","1212","2002"], "0202"));
