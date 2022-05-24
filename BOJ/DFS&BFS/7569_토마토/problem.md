# 토마토 - 7576

[문제 링크](https://www.acmicpc.net/problem/7576)

### 성능 요약

메모리: 256MB, 시간 1초

### 문제

철수의 토마토 농장에서는 토마토를 보관하는 큰 창고를 가지고 있다. 토마토는 아래의 그림과 같이 격자모양 상자의 칸에 하나씩 넣은 다음, 상자들을 수직으로 쌓아 올려서 창고에 보관한다.

![상자](https://upload.acmicpc.net/c3f3343d-c291-40a9-9fe3-59f792a8cae9/-/preview/)

창고에 보관되는 토마토들 중에는 잘 익은 것도 있지만, 아직 익지 않은 토마토들도 있을 수 있다. 보관 후 하루가 지나면, 익은 토마토들의 인접한 곳에 있는 익지 않은 토마토들은 익은 토마토의 영향을 받아 익게 된다. 하나의 토마토에 인접한 곳은 위, 아래, 왼쪽, 오른쪽, 앞, 뒤 여섯 방향에 있는 토마토를 의미한다. 대각선 방향에 있는 토마토들에게는 영향을 주지 못하며, 토마토가 혼자 저절로 익는 경우는 없다고 가정한다. 철수는 창고에 보관된 토마토들이 며칠이 지나면 다 익게 되는지 그 최소 일수를 알고 싶어 한다.

토마토를 창고에 보관하는 격자모양의 상자들의 크기와 익은 토마토들과 익지 않은 토마토들의 정보가 주어졌을 때, 며칠이 지나면 토마토들이 모두 익는지, 그 최소 일수를 구하는 프로그램을 작성하라. 단, 상자의 일부 칸에는 토마토가 들어있지 않을 수도 있다.

### 입력

첫 줄에는 상자의 크기를 나타내는 두 정수 M,N과 쌓아올려지는 상자의 수를 나타내는 H가 주어진다. M은 상자의 가로 칸의 수, N은 상자의 세로 칸의 수를 나타낸다. 단, 2 ≤ M ≤ 100, 2 ≤ N ≤ 100, 1 ≤ H ≤ 100 이다. 둘째 줄부터는 가장 밑의 상자부터 가장 위의 상자까지에 저장된 토마토들의 정보가 주어진다. 즉, 둘째 줄부터 N개의 줄에는 하나의 상자에 담긴 토마토의 정보가 주어진다. 각 줄에는 상자 가로줄에 들어있는 토마토들의 상태가 M개의 정수로 주어진다. 정수 1은 익은 토마토, 정수 0 은 익지 않은 토마토, 정수 -1은 토마토가 들어있지 않은 칸을 나타낸다. 이러한 N개의 줄이 H번 반복하여 주어진다.

토마토가 하나 이상 있는 경우만 입력으로 주어진다.

### 출력

여러분은 토마토가 모두 익을 때까지의 최소 날짜를 출력해야 한다. 만약, 저장될 때부터 모든 토마토가 익어있는 상태이면 0을 출력해야 하고, 토마토가 모두 익지는 못하는 상황이면 -1을 출력해야 한다.

### 예제 입력 1

```
5 3 1
0 -1 0 0 0
-1 -1 0 1 1
0 0 0 1 1
```

### 예제 출력 1

```
-1
```

### 예제 입력 2

```
5 3 2
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 1 0 0
0 0 0 0 0
```

### 예제 출력 2

```
4
```

### 예제 입력 3

```
4 3 2
1 1 1 1
1 1 1 1
1 1 1 1
1 1 1 1
-1 -1 -1 -1
1 1 1 -1
```

### 예제 출력 3

```
0
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

이전 토마토 문제의 3차원 버전이었다. 입력을 받는 것부터 조금 문제가 있었는데, 문제를 대충 읽어서 생긴 오해였는데, 입력 받은 전체 그대로 층층이 쌓인다고 문제를 이해해서 조금 오래 걸려버렸다.
또, 3차원을 어떻게 탐색할 수 있을까 생각했는데, DH 배열을 하나 더 만들어서 탐색을 더하는 것으로 문제를 해결했다.

```js
const [nmh, ...input] = require("fs")
  .readFileSync("dev/stdin")
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
```

</div>
</details>
