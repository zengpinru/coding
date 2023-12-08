function getType(target) {
  return Object.prototype.toString.call(target).replace(/\[object\s(.+)\]/, '$1').toLowerCase();
}

function createStore(reducer, storeEnhancer) {
  if (storeEnhancer) {
    return storeEnhancer(createStore)(reducer);
  }

  let currentState;
  const listeners = [];

  function getState() {
    return currentState;
  }

  function subscribe(listener) {
    listeners.push(listener);

    return () => {
      let index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  function dispatch(action) {
    if (getType(action) !== 'object') {
      throw new Error('action must be object');
    }

    // 修改 state
    currentState = reducer(currentState, action);

    // 通知变更
    listeners.forEach(listener => listener(currentState));
  }

  return {
    getState,
    subscribe,
    dispatch,
  };
}

// 应用中间件函数实现
function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    middlewares.forEach(middleware => {
      dispatch = middleware(store)(dispatch);
    });

    return {
      ...store,
      dispatch,
    };
  };
}

// 实现异步中间件
function thunk({ getState }) {
  return next => action => {
    if (getType(action) === 'function') {
      return action(next, getState);
    }
    return next(action);
  };
}

// 实现一个打印日志的中间件
function logger({ getState }) {
  // next 是被修饰过的 dispatch
  return next => action => {
    console.log('old state', getState());
    const res = next(action);
    console.log('new state', getState());
    return res;
  };
}
