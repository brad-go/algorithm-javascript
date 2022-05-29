const [nm, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = nm.split(" ").map(Number);
const map = input.map((row) => row.split("").map(Number));

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

function Solution(N, M, map) {
  const resetShortestRoute = (isCrashed) => {
    const shortestRoute = Array.from(Array(N), () => Array(M));

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        shortestRoute[i][j] = new Array(2).fill(isCrashed);
      }
    }

    return shortestRoute;
  };

  const bfs = (sr, sc, isCrashed) => {
    const shortestRoute = resetShortestRoute(isCrashed);

    const q = new Queue();
    const DR = [0, 1, 0, -1];
    const DC = [1, 0, -1, 0];

    q.enqueue([sr, sc, isCrashed]);
    shortestRoute[sr][sc][isCrashed] = 1;

    while (q.length) {
      const [r, c, isCrashed] = q.dequeue();

      if (r === N - 1 && c === M - 1) return shortestRoute[r][c][isCrashed];

      for (let dir = 0; dir < 4; dir++) {
        let nr = r + DR[dir];
        let nc = c + DC[dir];

        if (nr < 0 || nc < 0 || nr >= N || nc >= M) continue;

        const moveWithoutCrashingTheWall =
          !map[nr][nc] && !shortestRoute[nr][nc][isCrashed];
        if (moveWithoutCrashingTheWall) {
          q.enqueue([nr, nc, isCrashed]);
          shortestRoute[nr][nc][isCrashed] = shortestRoute[r][c][isCrashed] + 1;
        }

        const moveCrashingTheWall = map[nr][nc] && !isCrashed;
        if (moveCrashingTheWall) {
          q.enqueue([nr, nc, isCrashed + 1]);
          shortestRoute[nr][nc][isCrashed + 1] =
            shortestRoute[r][c][isCrashed] + 1;
        }
      }
    }

    return -1;
  };

  console.log(bfs(0, 0, 0));
}

Solution(N, M, map);
