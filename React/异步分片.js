// const DEFAULT_RUNTIME = 16;

// let sum = 0;

// const runner = tasks => {
//   const prevTime = performance.now();
//   do {
//     if (tasks.length === 0) {
//       return;
//     }
//     const task = tasks.shift();
//     const value = task();
//     sum += value;
//   } while (performance.now() - prevTime < DEFAULT_RUNTIME);
//   setTimeout(() => runner(tasks));
// };

const scheduler = (tasks) => {
  const DEFAULT_RUNTIME = 16;
  const { port1, port2 } = new MessageChannel();

  let sum = 0;
  let isAbort = false;

  const promise = new Promise((resolve, reject) => {
    // 运行器
    const runner = () => {
      const prevTime = performance.now();
      do {
        if (isAbort) {
          return reject();
        }
        if (tasks.length === 0) {
          return resolve(sum);
        }
        const task = tasks.shift();
        const value = task();
        sum += value;
      } while(performance.now() - prevTime < DEFAULT_RUNTIME);

      port2.postMessage('');
    };

    port1.onmessage = () => {
      runner();
    };

    port2.postMessage('');
  });
  
  promise.abort = () => {
    isAbort = true;
  };

  return promise;
};

// console.time();
// for (let i = 0; i < 10000; i++) {
//   for (let j = 0; j < 1000000; j++) {

//   }
// }
// console.timeEnd();

// console.time();
// const tasks = [];
// for (let i = 0; i < 10000; i++) {
//   tasks.push(() => {
//     for (let j = 0; j < 1000000; j++) {

//     }
//   });
// }
// scheduler(tasks).then(res => {});
// console.timeEnd();