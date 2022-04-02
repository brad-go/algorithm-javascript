const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(n, commands) {
  class Node {
    constructor(item) {
      this.prev = null;
      this.item = item;
      this.next = null;
    }
  }

  class Deque {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }

    pushFront(item) {
      const node = new Node(item);
      if (!this.length) {
        this.head = node;
        this.tail = node;
      } else {
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
      }

      this.length++;
    }

    pushBack(item) {
      const node = new Node(item);
      if (!this.length) {
        this.head = node;
        this.tail = node;
      } else {
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
      }

      this.length++;
    }

    popFront() {
      if (!this.length) return -1;

      const popItem = this.head.item;
      this.head = this.head.next;

      if (this.length == 1) this.head = null;
      else this.head.prev = null;

      this.length--;
      return popItem;
    }

    popBack() {
      if (!this.length) return -1;

      const popItem = this.tail.item;
      this.tail = this.tail.prev;

      if (this.length == 1) this.tail = null;
      else this.tail.prev = null;

      this.length--;
      return popItem;
    }

    size() {
      return this.length;
    }

    empty() {
      return !this.length ? 1 : 0;
    }

    front() {
      return this.length ? this.head.item : -1;
    }

    back() {
      return this.length ? this.tail.item : -1;
    }
  }

  let answer = "";
  const deque = new Deque();

  commands.forEach((commandLine) => {
    const [command, item] = commandLine.split(" ");

    switch (command) {
      case "push_front":
        deque.pushFront(item);
        break;
      case "push_back":
        deque.pushBack(item);
        break;
      case "pop_front":
        answer += `${deque.popFront()}\n`;
        break;
      case "pop_back":
        answer += `${deque.popBack()}\n`;
        break;
      case "size":
        answer += `${deque.size()}\n`;
        break;
      case "empty":
        answer += `${deque.empty()}\n`;
        break;
      case "front":
        answer += `${deque.front()}\n`;
        break;
      case "back":
        answer += `${deque.back()}\n`;
        break;
      default:
        break;
    }
  });
  console.log(answer.trim());
}

Solution(n, input);
