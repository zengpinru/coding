function enNumToZhNum(nums) {
  const str = String(nums);
  const arr = str.split('').reverse();
  const enNumMap = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const unit = ['十', '百', '千', '万', '十', '百'];
  let res = '';
  let index = -1;
  for (const [idx, val] of arr.entries()) {
    const cur = enNumMap[val];
    if (index === -1) {
      res = cur + res; // 个位数
    } else {
      if (val === '1' && res.startsWith('十')) {
        res = unit[index] + res;
      } else {
        res = val === '0' ? cur + res : cur + unit[index] + res;
      }
    }
    index++;
  }
  return res.length > 1 ? res.replace(/零+$/, '') : res;
}

console.log(enNumToZhNum(1111000));
