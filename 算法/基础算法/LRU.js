class DoubleListNode {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoubleList {
  constructor() {
    // 初始化双链表的数据，如头尾虚节点
    const head = new DoubleListNode(0, 0);
    const tail = new DoubleListNode(0, 0);
    head.next = tail;
    tail.prev = head;

    this.head = head;
    this.tail = tail;
    this.size = 0;
  }

  /**
   * 在链尾添加节点
   * @param {DoubleListNode} node
   */
  addLast(node) {
    node.next = this.tail;
    node.prev = this.tail.prev;
    this.tail.prev.next = node;
    this.tail.prev = node;
    this.size++;
  }

  /**
   * 在链表上移除 node 节点
   * @param {DoubleListNode} node
   */
  remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.size--;
  }

  /**
   * 移除链表的第一个节点，并返回该节点
   * @returns {DoubleListNode}
   */
  removeFirst() {
    if (this.head.next === this.tail) {
      return null;
    }
    const firstNode = this.head.next;
    this.remove(firstNode);
    return firstNode;
  }

  /**
   * 返回链表节点个数
   * @returns {number}
   */
  getSize() {
    return this.size;
  }
}

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.capacity = capacity;
  this.map = new Map();
  this.cache = new DoubleList();
};

/**
 * 把 key 提升为最近使用
 * @param {string | number} key 
 */
LRUCache.prototype.makeRecently = function (key) {
  const targetNode = this.map.get(key);
  // 先从链表删除这个节点
  this.cache.remove(targetNode);
  // 然后再把这个节点添加到链尾
  this.cache.addLast(targetNode);
}

/**
 * 添加最近使用的元素
 * @param {string | number} key 
 * @param {string | number} val 
 */
LRUCache.prototype.addRecently = function (key, val) {
  const node = new DoubleListNode(key, val);
  // 链尾就是最近使用的元素
  this.cache.addLast(node);
  this.map.set(key, node);
}

/**
 * 删除某个 key
 * @param {string | number} key 
 */
LRUCache.prototype.deleteKey = function (key) {
  const targetNode = this.map.get(key);
  this.cache.remove(targetNode);
  this.map.delete(key);
}

/**
 * 删除最久未使用的元素
 */
LRUCache.prototype.removeLeastRecently = function () {
  const targetNode = this.cache.removeFirst();
  this.map.delete(targetNode.key);
}

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  if (!this.map.has(key)) {
    return -1;
  }
  this.makeRecently(key);
  return this.map.get(key).val;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  if (this.map.has(key)) {
    this.deleteKey(key);
    this.addRecently(key, value);
    return;
  }
  if (this.cache.size >= this.capacity) {
    this.removeLeastRecently();
  }
  this.addRecently(key, value);
};
