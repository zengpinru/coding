/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const res = [];
  // 初始化棋盘(路径)
  const board = (new Array(n)).fill(new Array(n).fill('.')).map(item => [...item]);

  /**
   * 验证是否可以在 track[row][col] 放置皇后
   * @param {*} track 棋盘(路径)
   * @param {*} row 行下标
   * @param {*} col 列表下标
   */
  function isValid(track, row, col) {
    // 检测列是否有皇后冲突
    for (let i = 0; i <= row; i++) {
      if (track[i][col] === 'Q') {
        return false;
      }
    }
    // 检测右上方是否有皇后冲突
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (track[i][j] === 'Q') {
        return false;
      }
    }
    // 检测左上方是否有皇后冲突
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (track[i][j] === 'Q') {
        return false;
      }
    }
    return true;
  }

  /**
   * 定义回溯函数
   * @param {*} track 当前路径(已做出的决策)
   * @param {*} row 可选择列表
   */
  function backtrack(track, row) {
    // 结束条件
    if (row >= n) {
      res.push(track.map(item => item.join('')));
      return;
    }

    // 遍历选择
    for (let col = 0; col < n; col++) {
      // 排除不合法的选择
      if (!isValid(track, row, col)) {
        continue;
      }
      // 做选择
      track[row][col] = 'Q';
      // 进入下一行做决策
      backtrack(track, row + 1);
      // 撤销选择
      track[row][col] = '.';
    }
  }

  // 从第 0 行开始做决策
  backtrack(board, 0);
  return res;
};

console.log(solveNQueens(8));
