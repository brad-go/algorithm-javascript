const [nm, ...input] = require("fs")
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

const from = [];
const to = [];

for (let i = 0; i < input.length; i++) {
  const [start, end] = input[i].split(" ").map((v) => v - 1);
  from.push(start);
  to.push(end);
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(value) {
    const node = new Node(value);

    if (!this.head) this.head = node;
    else this.tail.next = node;

    this.tail = node;
    this.length++;
  }

  dequeue() {
    if (!this.head) return null;

    const node = this.head.value;
    this.head = this.head.next;
    this.length--;

    return node;
  }
}

function Solution(from, to) {
  const rollDice = (board, visited, start) => {
    const DICE = [1, 2, 3, 4, 5, 6];
    const q = new Queue();

    q.enqueue([start, 0]);
    visited[0] = 1;

    while (q.length) {
      const [pos, time] = q.dequeue();

      if (board[pos] === 100) {
        console.log(time);
        return;
      }

      for (let num = 0; num < DICE.length; num++) {
        let npos = pos + DICE[num];

        if (npos < 0 || npos >= 100 || visited[npos]) continue;
        visited[npos] = 1;

        for (let i = 0; i < input.length; i++) {
          if (npos === from[i]) npos = to[i];
        }

        q.enqueue([npos, time + 1]);
      }
    }
  };

  const board = new Array(100).fill().map((_, idx) => idx + 1);
  const visited = new Array(100).fill(0);
  rollDice(board, visited, 0);
}

Solution(from, to);
