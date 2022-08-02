# 벽 부수고 이동하기 - 2206

[문제 링크](https://www.acmicpc.net/problem/2206)

### 성능 요약

메모리: 192MB, 시간 2초

### 문제

N×M의 행렬로 표현되는 맵이 있다. 맵에서 0은 이동할 수 있는 곳을 나타내고, 1은 이동할 수 없는 벽이 있는 곳을 나타낸다. 당신은 (1, 1)에서 (N, M)의 위치까지 이동하려 하는데, 이때 최단 경로로 이동하려 한다. 최단경로는 맵에서 가장 적은 개수의 칸을 지나는 경로를 말하는데, 이때 시작하는 칸과 끝나는 칸도 포함해서 센다.

만약에 이동하는 도중에 한 개의 벽을 부수고 이동하는 것이 좀 더 경로가 짧아진다면, 벽을 한 개 까지 부수고 이동하여도 된다.

한 칸에서 이동할 수 있는 칸은 상하좌우로 인접한 칸이다.

맵이 주어졌을 때, 최단 경로를 구해 내는 프로그램을 작성하시오.

### 입력

첫째 줄에 N(1 ≤ N ≤ 1,000), M(1 ≤ M ≤ 1,000)이 주어진다. 다음 N개의 줄에 M개의 숫자로 맵이 주어진다. (1, 1)과 (N, M)은 항상 0이라고 가정하자.

### 출력

첫째 줄에 최단 거리를 출력한다. 불가능할 때는 -1을 출력한다.

### 예제 입력 1

```
6 4
0100
1110
1000
0000
0111
0000
```

### 예제 출력 1

```
15
```

### 예제 입력 2

```
4 4
0111
1111
1111
1110
```

### 예제 출력 2

```
-1
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### Fail

탐색을 하다가 벽을 만나면 한 번 벽을 부수고 다시 탐색을 진행하고, 벽을 이미 부쉈다면 더이상 부지지 못하고 종료하는 방식으로 풀이했는데, 실패했다.

```js
const [nm, ...input] = require("fs")
  .readFileSync("./input3.txt")
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
  const bfs = (sr, sc, depth) => {
    const q = new Queue();
    const DR = [0, 1, 0, -1];
    const DC = [1, 0, -1, 0];
    const visited = Array.from(Array(N), () => Array(M).fill(0));

    let crashed = 0;
    visited[sr][sc] = 1;
    q.enqueue([sr, sc, depth]);

    while (q.length) {
      const [r, c, dep] = q.dequeue();

      if (r === N - 1 && c === M - 1) {
        return dep;
      }

      for (let dir = 0; dir < 4; dir++) {
        let nr = r + DR[dir];
        let nc = c + DC[dir];

        if (nr < 0 || nc < 0 || nr >= N || nc >= M || visited[nr][nc]) continue;
        if (map[nr][nc]) {
          if (crashed) continue;
          crashed++;
        }
        visited[nr][nc] = 1;
        q.enqueue([nr, nc, dep + 1]);
      }
    }
  };

  const result = bfs(0, 0, 1);
  console.log(result ? result : -1);
}

Solution(N, M, map);
```

### Solution

시간초과가 뜨는 것은 이해할 수 있었지만 왜 틀렸다고 뜨는지 이해할 수 가 없었다. 하지만 원인을 알게되었다.
문제는 벽을 부수고 이동할 수도 있지만, 벽을 부수지 않고 이동하는 방법도 고려해야 했다. 이전의 로직은 벽은 만나면 무조건 한 번은 부수고 이동하는 전제였기 때문에, 틀렸다고 나오는 것이었다.

```js
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
```

</div>
</details>
