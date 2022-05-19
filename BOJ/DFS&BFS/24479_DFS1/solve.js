const input = require("fs")
  .readFileSync("./input3.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m, r] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const edges = input.map((edge) => edge.split(" ").map((v) => +v));

class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return !this.length;
  }

  add(value) {
    const node = new Node(value);

    if (this.tail) this.tail.next = node;
    else this.head = node;

    this.tail = node;
    this.length++;
  }

  remove() {
    if (!this.tail) return;

    const value = this.tail.item;
    let current = this.head;
    let i = 0;

    while (i < this.length - 2) {
      current = current.next;
      i++;
    }

    current.next = null;
    this.tail = current;
    this.length--;

    return value;
  }

  *iterator() {
    if (!this.head) return;

    let current = this.head;

    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  [Symbol.iterator]() {
    return this.iterator();
  }
}

class Stack {
  constructor() {
    this.list = new LinkedList();
  }

  size() {
    return this.list.size();
  }

  isEmpty() {
    return this.list.isEmpty();
  }

  push(element) {
    this.list.add(element);
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.list.remove();
  }

  [Symbol.iterator]() {
    return this.list.iterator();
  }
}

function Solution(n, m, r, edges) {
  const graph = Array.from(Array(n + 1), () => []);
  const visited = new Array(n + 1).fill(0);
  const answer = new Array(n + 1).fill(0);

  for (let edge of edges) {
    const [key, value] = edge;
    graph[key].push(value);
    graph[value].push(key);
  }

  for (let i = 1; i <= n; i++) {
    graph[i].sort((a, b) => b - a);
  }

  const stack = new Stack();
  stack.push(r);

  let cnt = 1;
  while (stack.size()) {
    let currentNode = stack.pop();
    visited[currentNode] = 1;

    if (answer[currentNode] === 0) {
      answer[currentNode] = cnt;
      cnt++;
    }

    for (nextNode of graph[currentNode]) {
      if (!visited[nextNode]) stack.push(nextNode);
    }
  }

  for (let i = 1; i < answer.length; i++) {
    console.log(answer[i]);
  }
}

Solution(n, m, r, edges);
