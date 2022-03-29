const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출

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

  push(item) {
    const node = new Node(item);
    if (!this.head) {
      this.head = node;
      this.head.next = this.tail;
    } else this.tail.next = node;

    this.tail = node;
    this.length++;
  }

  size() {
    return this.length;
  }

  pop() {
    if (this.length > 2) {
      const popedItem = this.head.item;
      const newHead = this.head.next;
      this.head = newHead;
      this.length--;
      return popedItem;
    }
    if (this.length === 2) {
      const popedItem = this.head.item;
      const newHead = this.head.next;
      this.head = newHead;
      this.tail = newHead;
      this.length--;
      return popedItem;
    }
    if (this.length === 1) {
      const popedItem = this.head.item;
      this.head = null;
      this.tail = null;
      this.length--;
      return popedItem;
    }
    return -1;
  }

  empty() {
    return this.length ? 0 : 1;
  }

  front() {
    return this.length ? this.head.item : -1;
  }

  back() {
    return this.length ? this.tail.item : -1;
  }
}

function Solution(commands) {
  const queue = new Queue();
  let result = "";

  commands.forEach((commandline) => {
    const [command, value] = commandline.split(" ");
    if (command === "push") return queue[command](value);
    result += `${queue[command]()}\n`;
  });

  console.log(result.trim());
}

Solution(input);
