# 토마토 - 7576

[문제 링크](https://www.acmicpc.net/problem/7576)

### 성능 요약

메모리: 256MB, 시간 1초

### 문제

철수의 토마토 농장에서는 토마토를 보관하는 큰 창고를 가지고 있다. 토마토는 아래의 그림과 같이 격자 모양 상자의 칸에 하나씩 넣어서 창고에 보관한다.

![상자](https://upload.acmicpc.net/de29c64f-dee7-4fe0-afa9-afd6fc4aad3a/-/preview/)

창고에 보관되는 토마토들 중에는 잘 익은 것도 있지만, 아직 익지 않은 토마토들도 있을 수 있다. 보관 후 하루가 지나면, 익은 토마토들의 인접한 곳에 있는 익지 않은 토마토들은 익은 토마토의 영향을 받아 익게 된다. 하나의 토마토의 인접한 곳은 왼쪽, 오른쪽, 앞, 뒤 네 방향에 있는 토마토를 의미한다. 대각선 방향에 있는 토마토들에게는 영향을 주지 못하며, 토마토가 혼자 저절로 익는 경우는 없다고 가정한다. 철수는 창고에 보관된 토마토들이 며칠이 지나면 다 익게 되는지, 그 최소 일수를 알고 싶어 한다.

토마토를 창고에 보관하는 격자모양의 상자들의 크기와 익은 토마토들과 익지 않은 토마토들의 정보가 주어졌을 때, 며칠이 지나면 토마토들이 모두 익는지, 그 최소 일수를 구하는 프로그램을 작성하라. 단, 상자의 일부 칸에는 토마토가 들어있지 않을 수도 있다.

### 입력

첫 줄에는 상자의 크기를 나타내는 두 정수 M,N이 주어진다. M은 상자의 가로 칸의 수, N은 상자의 세로 칸의 수를 나타낸다. 단, 2 ≤ M,N ≤ 1,000 이다. 둘째 줄부터는 하나의 상자에 저장된 토마토들의 정보가 주어진다. 즉, 둘째 줄부터 N개의 줄에는 상자에 담긴 토마토의 정보가 주어진다. 하나의 줄에는 상자 가로줄에 들어있는 토마토의 상태가 M개의 정수로 주어진다. 정수 1은 익은 토마토, 정수 0은 익지 않은 토마토, 정수 -1은 토마토가 들어있지 않은 칸을 나타낸다.

토마토가 하나 이상 있는 경우만 입력으로 주어진다.

### 출력

여러분은 토마토가 모두 익을 때까지의 최소 날짜를 출력해야 한다. 만약, 저장될 때부터 모든 토마토가 익어있는 상태이면 0을 출력해야 하고, 토마토가 모두 익지는 못하는 상황이면 -1을 출력해야 한다.

### 예제 입력 1

```
6 4
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 1
```

### 예제 출력 1

```
8
```

### 예제 입력 2

```
6 4
0 -1 0 0 0 0
-1 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 1
```

### 예제 출력 2

```
-1
```

### 예제 입력 3

```
6 4
1 -1 0 0 0 0
0 -1 0 0 0 0
0 0 0 0 -1 0
0 0 0 0 -1 1
```

### 예제 출력 3

```
6
```

### 예제 입력 4

```
5 5
-1 1 0 0 0
0 -1 -1 -1 0
0 -1 -1 -1 0
0 -1 -1 -1 0
0 0 0 0 0
```

### 예제 출력 4

```
14
```

### 예제 입력 5

```
2 2
1 -1
-1 1
```

### 예제 출력 5

```
0
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

시간초과가 나서 while문을 반복하는 내 로직에 문제가 있다고 생각하고, 문제를 푸느라 시간이 좀 걸렸다. 그러나 문제는 로직이 아닌 shift()나 push()연산에 걸리는 시간이 문제였던 것 같다.
큐를 간단하게 직접 구현하고 문제를 풀었더니 통과할 수 있었다.

### Solution

```js
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
  // 익은 토마토의 위치를 찾아서 큐에 넣어주기
  const findRipeTomatoes = (box) => {
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (box[i][j] === 1) q.enqueue([i, j, 0]);
      }
    }
  };

  // bfs를 통해 토마토가 모두 익는데 걸리는 일 수 체크하기
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

  // 안 익은 토마토가 박스에 존재하는지 확인하기
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
```

</div>
</details>
