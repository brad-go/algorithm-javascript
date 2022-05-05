# 바이러스

### 성능 요약

메모리: 128MB, 시간: 1초

### 문제

한 공간에 여러 명의 사람들이 줄을 서서 모여 있다. 이때 바이러스를 가진 사람들이 있는데, 이 바이러스는 1초마다 상하좌우로 인접한 사람들에게 퍼진다. 그러나 사람들 중 면역자들이 있다. 면역자들을 만나게 되면, 바이러스는 퍼지지 못한다. 공간 안에 바이러스가 전부 퍼지게 되는 시간은?

### 입력

첫째 줄에 줄 수 N, M이 주어진다.
둘째줄 부터 공백을 기준으로 바이러스에 걸린 사람과, 일반인, 면역자가 입력된다.

### 출력

바이러스가 전부 퍼지는데 걸리는 시간을 첫째 줄에 출력한다. 만약 면역자에 막혀 바이러스가 퍼지지 못한다면 -1을 출력한다.

### 예제 입력 1

```
7 7
2 0 0 0 1 1 0
0 0 1 0 1 2 0
0 1 1 0 1 0 0
0 1 0 0 0 0 0
0 0 0 0 0 1 1
0 1 0 0 0 0 0
0 1 0 0 0 0 0
```

### 예제 출력 1

```
8
```

### 예제 입력 2

```
7 7
2 1 0 0 1 1 0
1 0 1 0 1 2 1
0 1 1 0 1 1 0
0 1 0 0 0 0 0
0 0 0 0 0 1 1
0 1 0 0 0 0 0
0 1 0 0 0 0 0
```

### 예제 출력 2

```
-1
```

<details><summary><b>문제 풀이</b></summary><div markdwon="1">

바이러스가 1초마다 상하좌우로 퍼지는 것. 이 문제는 BFS로 풀어야 했다. BFS에서 사용할 큐를 사용하기 위해 이전에 구현했던, 큐를 가져와서 풀이했다.

```js
const queue = require("../Queue/queue");
```

<details><summary><b>큐 구현 보기</b></summary><div markdwon="1">

```js
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
```

</div></details>

이차원 배열의 형태로 사람들의 줄 선 공간을 그리기 위해 입력을 받는다.

```js
const map = new Array(N)
  .fill()
  .map((_, row) => new Array(M).fill().map((_, col) => input[col + row * M]));
```

방향을 나타낼 배열을 선언하고, 감염될 수 있는 사람 수를 나타낼 `target`, 모두 감염되는 데 걸리는 시간인 `infectionTime`을 선언해준다.

```js
const DR = [0, 1, 0, -1];
const DC = [1, 0, -1, 0];

// 감염 될 수 있는 사람
let target = 0;
// 모두 감염되는데 걸리는 시간
let infectionTime = 0;
```

감염자의 위치를 찾아서 coords 배열에 넣어준다. 이 때 전체 사람들을 탐색하는데, 면역자와 바이러스 보균자가 아니면 수를 센다.

```js
// 감염자의 위치를 찾아서 넣어주기
const coords = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 2) coords.push([i, j]);
    if (!map[i][j]) target++;
  }
}
```

바이러스를 퍼뜨리는 함수를 만들어준다.

```js
// 탐색하면서 바이러스 퍼뜨리기
const bfs = (coords, depth) => {
  const q = new Queue();

  // 바이러스 보균자의 위치를 찾아 큐에 넣어주기
  coords.forEach((coord) => {
    const [sr, sc] = coord;
    q.enQueue([sr, sc, depth]);
  });

  // 큐가 빌 때까지
  while (!q.isEmpty()) {
    // 큐에서 현재 좌표, 퍼진 정도를 꺼내기
    const [r, c, dep] = q.deQueue();
    // 감염 시간을 업데이트 해주기
    infectionTime = Math.max(infectionTime, dep);

    for (let i = 0; i < 4; i++) {
      const nr = r + DR[i];
      const nc = c + DC[i];

      if (nr < N && nc < M && nr >= 0 && nc >= 0 && !map[nr][nc]) {
        // 다음 위치의 사람을 감염시키기
        map[nr][nc] = 2;
        // 감염 안된 사람의 수를 줄이기
        target--;
        q.enQueue([nr, nc, dep + 1]);
      }
    }
  }

  // 면역자를 제외하고 모두 감염되었다면 감염 시간을 출력, 바이러스가 막혀 모두 감염되지 않았다면 -1을 출력
  console.log(target === 0 ? infectionTime : -1);
};

bfs(coords, 0);
```

### Solution

```js
const Queue = require("../../Queue/queue");
const [N, M, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(N, M, input) {
  const map = new Array(N)
    .fill()
    .map((_, row) => new Array(M).fill().map((_, col) => input[col + row * M]));

  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  let target = 0;
  let infectionTime = 0;

  const coords = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 2) coords.push([i, j]);
      if (!map[i][j]) target++;
    }
  }

  const bfs = (coords, depth) => {
    const q = new Queue();

    coords.forEach((coord) => {
      const [sr, sc] = coord;
      q.enQueue([sr, sc, depth]);
    });

    while (!q.isEmpty()) {
      const [r, c, dep] = q.deQueue();
      infectionTime = Math.max(infectionTime, dep);

      for (let i = 0; i < 4; i++) {
        const nr = r + DR[i];
        const nc = c + DC[i];

        if (nr < N && nc < M && nr >= 0 && nc >= 0 && !map[nr][nc]) {
          map[nr][nc] = 2;
          target--;
          q.enQueue([nr, nc, dep + 1]);
        }
      }
    }

    console.log(target === 0 ? infectionTime : -1);
  };

  bfs(coords, 0);
}

Solution(N, M, input);
```

</div></details>
