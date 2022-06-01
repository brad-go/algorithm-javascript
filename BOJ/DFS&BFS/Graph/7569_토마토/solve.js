const [nmh, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m, h] = nmh.split(" ").map(Number);
const box = Array.from(Array(h), () => Array(m));
for (let i = 0; i < h; i++) {
  for (let j = 0; j < m; j++) {
    box[i][j] = input[i * m + j].split(" ").map(Number);
  }
}

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

function Solution(n, m, h, box) {
  const findRipeTomatoes = (box) => {
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < m; j++) {
        for (let k = 0; k < n; k++) {
          if (box[i][j][k] === 1) q.enqueue([i, j, k, 0]);
        }
      }
    }
  };

  const checkUnRipeTomatoes = (box) => {
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < m; j++) {
        if (box[i][j].includes(0)) return false;
      }
    }
    return true;
  };

  const bfs = (box, q) => {
    const DH = [1, -1, 0, 0, 0, 0];
    const DR = [0, 0, 0, 1, 0, -1];
    const DC = [0, 0, 1, 0, -1, 0];
    let day = 0;

    if (checkUnRipeTomatoes(box)) return day;

    while (q.length) {
      const [p, r, c, dep] = q.dequeue();

      for (let i = 0; i < 6; i++) {
        let np = p + DH[i];
        let nr = r + DR[i];
        let nc = c + DC[i];

        if (
          np < h &&
          nr < m &&
          nc < n &&
          np >= 0 &&
          nr >= 0 &&
          nc >= 0 &&
          !box[np][nr][nc]
        ) {
          box[np][nr][nc] = 1;
          q.enqueue([np, nr, nc, dep + 1]);
        }
      }
      day = dep;
    }

    return day;
  };

  const q = new Queue();
  findRipeTomatoes(box, q);
  const day = bfs(box, q);
  const answer = checkUnRipeTomatoes(box) ? day : -1;

  console.log(answer);
}

Solution(n, m, h, box);
