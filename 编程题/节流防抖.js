// 节流
function throttle(fn, delay = 1000) {
  let timer = null;
  return function (...args) {
    const context = this;
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, delay);
    }
  }
}

// 防抖
function debounce(fn, delay = 1000, immediate = false) {
  let timer = null;
  return function (...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    immediate && !timer && fn.apply(context, args);
    timer = setTimeout(() => {
      !immediate && fn.apply(context, args);
      timer = null;
    }, delay);
  }
}

function debounce_1(fn, delay) {
  let timer = null;
  return function (...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
      timer = null;
    }, delay);
  };
}
