const [nm, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = nm.split(" ").map(Number);
const box = input.map((row) => row.split(" ").map(Number));

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

  enqueue(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else this.tail.next = node;

    this.tail = node;
    this.length++;
  }

  dequeue() {
    if (!this.head) return null;

    const node = this.head.item;
    this.head = this.head.next;
    this.length--;

    return node;
  }
}

function Solution(n, m, box) {
  const findRipeTomatoes = (box) => {
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (box[i][j] === 1) q.enqueue([i, j, 0]);
      }
    }
  };

  const bfs = (box, q) => {
    const DR = [0, 1, 0, -1];
    const DC = [1, 0, -1, 0];
    let day = 0;

    while (q.length) {
      const [r, c, dep] = q.dequeue();

      for (let i = 0; i < 4; i++) {
        let nr = r + DR[i];
        let nc = c + DC[i];

        if (nr < m && nc < n && nr >= 0 && nc >= 0 && !box[nr][nc]) {
          box[nr][nc] = 1;
          q.enqueue([nr, nc, dep + 1]);
        }
      }
      day = dep;
    }

    return day;
  };

  const checkUnRipeTomatoes = (box) => {
    for (let i = 0; i < m; i++) {
      if (box[i].includes(0)) return false;
    }
    return true;
  };

  const q = new Queue();
  findRipeTomatoes(box, q);

  const day = bfs(box, q);
  const answer = checkUnRipeTomatoes(box) ? day : -1;

  console.log(answer);
}

Solution(n, m, box);
