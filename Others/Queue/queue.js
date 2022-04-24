class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enQueue(item) {
    const node = new Node(item);

    if (!this.length) this.head = node;
    else this.tail.next = node;

    this.tail = node;
    this.length++;
  }

  deQueue() {
    if (!this.length) {
      this.tail = null;
      return;
    }

    const poped = this.head.item;
    this.head = this.head.next;
    this.length--;

    return poped;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length ? 0 : 1;
  }
}

module.exports = Queue;
