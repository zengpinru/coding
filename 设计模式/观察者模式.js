/**
 * 观察者模式与发布、订阅模式有什么区别:
 * 区别在于是否存在一个托管中心
 */

class EventEmitter {
  constructor() {
    this.handles = {};
  }

  on(eventName, callback) {
    if (!this.handles[eventName]) {
      this.handles[eventName] = [];
    }
  
    this.handles[eventName].push(callback);

    return () => {
      this.off(eventName, callback);
    };
  }

  off(eventName, callback) {
    if (!this.handles[eventName]) {
      console.warn(`${eventName} not exist`);
      return;
    }
    const index = this.handles[eventName].indexOf(callback);
    if (index !== -1) {
      this.handles[eventName].splice(index, 1);
    }
  }

  once(eventName, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }

  emit(eventName, ...args) {
    if (!this.handles[eventName]) {
      console.warn(`${eventName} not exist`);
      return;
    }
    this.handles[eventName].forEach(callback => {
      callback(...args);
    });
  }
}

const eventEmitter = new EventEmitter();
const testHandle1 = () => {
  console.log('xxx1');
}
const testHandle2 = () => {
  console.log('xxx2');
}
eventEmitter.on('test', testHandle1);
eventEmitter.on('test', testHandle2);
eventEmitter.off('test', testHandle1);
eventEmitter.emit('test');
