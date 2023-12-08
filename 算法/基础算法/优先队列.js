export class PriorityQueue {
  /**
   * @param {function} compareFn 比较函数，决定是大根堆还是小根堆
   */
  constructor(compareFn = (a, b) => a - b) {
    // 第一个元素不使用
    this.data = [null];
    this.size = 0;
    this.compareFn = compareFn;
  }

  /**
   * 根据当前节点索引获取父节点索引
   * @param {number} index
   */
  getParentIndex(index) {
    return Math.floor(index / 2);
  }

  /**
   * 根据当前节点索引获取左节点索引
   * @param {number} index
   */
  getLeftIndex(index) {
    return index * 2;
  }

  /**
   * 根据当前节点索引获取右节点索引
   * @param {number} index
   */
  getRightIndex(index) {
    return index * 2 + 1;
  }

  /**
   * 交换两个下标元素的节点
   * @param {number} i 
   * @param {number} j 
   */
  swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }

  /**
   * 上浮第 index 个元素，以维护大小根堆的性质
   * @param {number} index
   */
  swim(index) {
    while(index > 1 && this.compareFn(this.data[index], this.data[this.getParentIndex(index)]) < 0) {
      this.swap(index, this.getParentIndex(index));
      index = this.getParentIndex(index);
    }
  }

  /**
   * 下沉第 index 个元素，以维护大小根堆的性质
   * @param {number} index
   */
  sink(index) {
    let leftIndex = this.getLeftIndex(index);
    while (leftIndex <= this.size) {
      let rightIndex = this.getRightIndex(index);
      let temp = leftIndex;
      if (rightIndex <= this.size && this.compareFn(this.data[rightIndex], this.data[leftIndex]) < 0) {
        temp = rightIndex;
      }
      if (this.compareFn(this.data[index], this.data[temp]) < 0) {
        break;
      }
      this.swap(temp, index);
      leftIndex = temp;
    }
  }

  /**
   * 判断队列是否为空
   */
  isEmpty() {
    return this.size === 0;
  }
  
  /**
   * 插入元素
   * @param {any} val 
   */
  add(val) {
    this.size++;
    this.data[this.size] = val;
    this.swim(this.size);
  }

  /**
   * 弹出堆顶节点
   */
  poll() {
    const node = this.data[1];
    // 最后一个节点和第一个节点交换
    this.swap(1, this.size);
    this.data[this.size] = undefined;
    this.size--;
    // 下沉调整堆
    this.sink(1);
    return node;
  }
}

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

const priorityQueue = new PriorityQueue((a, b) => b.val - a.val);
priorityQueue.add(new ListNode(7));
priorityQueue.add(new ListNode(6));
priorityQueue.add(new ListNode(5));
priorityQueue.add(new ListNode(4));
priorityQueue.add(new ListNode(3));
priorityQueue.add(new ListNode(2));
priorityQueue.add(new ListNode(1));
console.log(priorityQueue.data);
console.log(priorityQueue.poll());
console.log(priorityQueue.poll());
console.log(priorityQueue.poll());
console.log(priorityQueue.poll());
console.log(priorityQueue.poll());
console.log(priorityQueue.poll());
console.log(priorityQueue.poll());
console.log(priorityQueue.isEmpty());
console.log(priorityQueue.data);
