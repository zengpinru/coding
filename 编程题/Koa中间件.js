const middleware1 = async function (ctx, next) {
  console.log(1);
  await next();
  console.log(6);
}

const middleware2 = async function (ctx, next) {
  console.log(2);
  await next();
  console.log(5);
}

const middleware3 = async function (ctx, next) {
  console.log(3);
  await next();
  console.log(4);
}

function compose(middlewares) {
  return function (context) {
    async function dispatch(i) {
      if (i === middlewares.length) {
        return;
      }
      const fn = middlewares[i];
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch(err) {
        return Promise.reject(err);
      }
    }
    return dispatch(0);
  }
}

const context = {
  name: 'zpr',
  age: 18,
};

const fn = compose([middleware1, middleware2, middleware3]);

fn(context).then(res => {
  console.log('结束', res);
});
