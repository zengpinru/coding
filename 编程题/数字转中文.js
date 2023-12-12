const chineseNumberChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const chineseUnitSection = ['', '万', '亿', '万亿', '亿亿'];
const chineseUnitChar = ['', '十', '百', '千'];

function processFn(section) {
  let strIns = '';
  let chineseStr = '';
  let unitPosition = 0;
  let zero = true;

  while (section > 0) {
    const v = section % 10;

    if (v === 0) {
      if (!zero) {
        zero = true;
        chineseStr = chineseNumberChar[v] + chineseStr;
      }
    } else {
      zero = false;
      strIns = chineseNumberChar[v];
      strIns += chineseUnitChar[unitPosition];
      chineseStr = strIns + chineseStr;
    }
  
    unitPosition++;
    section = Math.floor(section / 10);
  }

  return chineseStr;
}

/**
 * 阿拉伯数字转中文数字
 * @param {number} number
 */
function chineseNumber(num) {
  // show me your code
  if (num === 0) {
    return chineseNumberChar[0];
  }
  let res = '';
  let needZero = false;
  let strIns = '';
  let unitPosition = 0;
  while (num > 0) {
    const section = num % 10000;
    if (needZero) {
      res = chineseNumberChar[0] + res;
    }
    strIns = processFn(section);
    strIns += (section !== 0) ? chineseUnitSection[unitPosition] : chineseUnitSection[0];
    res = strIns + res;
    needZero = section < 1000 && section > 0;
    num = Math.floor(num / 10000);
    unitPosition++;
  }
  return res;
}
