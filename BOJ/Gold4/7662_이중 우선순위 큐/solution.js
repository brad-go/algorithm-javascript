const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input5.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

class Heap {
  constructor(compareFunction) {
    this.heap = [];
    this.compare = compareFunction;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  peek() {
    return this.heap[0];
  }

  add(node) {
    this.heap.push(node);
    this.#swim();
  }

  #swim(index = this.heap.length - 1) {
    const lastNode = this.heap[index];

    while (index > 0) {
      const parentIndex = this.#getParentIndex(index);
      const parentNode = this.heap[parentIndex];

      if (this.compare(parentNode, lastNode)) break;

      this.#swap(index, parentIndex);
      index = parentIndex;
    }
  }

  poll() {
    if (this.size() < 2) return this.heap.pop();

    const rootNode = this.peek();

    this.heap[0] = this.heap.pop();
    this.#sink();

    return rootNode;
  }

  #sink(index = 0) {
    while (this.#hasLeftChild(index)) {
      const leftChildIndex = this.#getLeftChildIndex(index);
      const rightChildIndex = this.#getRightChildIndex(index);
      const childIndex =
        this.#hasRightChild(index) &&
        this.compare(this.heap[rightChildIndex], this.heap[leftChildIndex])
          ? rightChildIndex
          : leftChildIndex;

      if (this.compare(this.heap[index], this.heap[childIndex])) break;

      this.#swap(index, childIndex);
      index = childIndex;
    }
  }

  #swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  #hasLeftChild(index) {
    return this.#getLeftChildIndex(index) < this.size();
  }

  #hasRightChild(index) {
    return this.#getRightChildIndex(index) < this.size();
  }

  #getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  #getLeftChildIndex(index) {
    return index * 2 + 1;
  }

  #getRightChildIndex(index) {
    return index * 2 + 2;
  }
}

let index = 0;
const T = +input[index++];
const answers = [];

const trimHeap = (heap, map) => {
  while (!heap.isEmpty() && map.get(heap.peek()) === 0) {
    heap.poll();
  }
};

const solution = (operations) => {
  const maxHeap = new Heap((a, b) => a > b);
  const minHeap = new Heap((a, b) => a < b);
  const map = new Map();

  const methods = {
    I(value) {
      map.set(value, (map.get(value) || 0) + 1);
      maxHeap.add(value);
      minHeap.add(value);
    },
    D(value) {
      const heap = value > 0 ? maxHeap : minHeap;
      trimHeap(heap, map);

      if (heap.isEmpty()) return;

      const deleted = heap.poll();
      map.set(deleted, map.get(deleted) - 1);
    },
  };

  operations.forEach((operation) => {
    const [command, value] = operation.split(" ");

    methods[command](+value);
  });

  trimHeap(maxHeap, map);
  trimHeap(minHeap, map);

  return maxHeap.isEmpty() ? "EMPTY" : `${maxHeap.peek()} ${minHeap.peek()}`;
};

for (let i = 0; i < T; i++) {
  const k = +input[index++];
  const operations = input.slice(index, k + index);

  answers.push(solution(operations));

  index += k;
}

console.log(answers.join("\n"));
