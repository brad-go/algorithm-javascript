# 미로 탐색 - 2178

[문제 링크](https://www.acmicpc.net/problem/2178)

### 성능 요약

메모리: 192MB, 시간 1초

### 문제

N×M크기의 배열로 표현되는 미로가 있다.

| 1   | 0   | 1   | 1   | 1   | 1   |
| --- | --- | --- | --- | --- | --- |
| 1   | 0   | 1   | 0   | 1   | 0   |
| 1   | 0   | 1   | 0   | 1   | 1   |
| 1   | 1   | 1   | 0   | 1   | 1   |

미로에서 1은 이동할 수 있는 칸을 나타내고, 0은 이동할 수 없는 칸을 나타낸다. 이러한 미로가 주어졌을 때, (1, 1)에서 출발하여 (N, M)의 위치로 이동할 때 지나야 하는 최소의 칸 수를 구하는 프로그램을 작성하시오. 한 칸에서 다른 칸으로 이동할 때, 서로 인접한 칸으로만 이동할 수 있다.

위의 예에서는 15칸을 지나야 (N, M)의 위치로 이동할 수 있다. 칸을 셀 때에는 시작 위치와 도착 위치도 포함한다.

### 입력

첫째 줄에 두 정수 N, M(2 ≤ N, M ≤ 100)이 주어진다. 다음 N개의 줄에는 M개의 정수로 미로가 주어진다. 각각의 수들은 붙어서 입력으로 주어진다.

### 출력

첫째 줄에 지나야 하는 최소의 칸 수를 출력한다. 항상 도착위치로 이동할 수 있는 경우만 입력으로 주어진다.

### 예제 입력 1

```
4 6
101111
101010
101011
111011
```

### 예제 출력 1

```
15
```

### 예제 입력 2

```
4 6
110110
110110
111111
111101
```

### 예제 출력 2

```
9
```

### 예제 입력 3

```
2 25
1011101110111011101110111
1110111011101110111011101
```

### 예제 출력 3

```
38
```

### 예제 입력 4

```
7 7
1011111
1110001
1000001
1000001
1000001
1000001
1111111
```

### 예제 출력 4

```
13
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

기본적인 bfs를 이용한 탐색 문제였다.

우선 입력을 받아준다.

```js
const input = require("fs")
  .readFileSync("./input4.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input
  .shift()
  .split(" ")
  .map((v) => +v);

// 미로를 담을 2차원 배열
const map = Array.from(Array(N), (_, row) =>
  Array(M)
    .fill()
    .map((_, col) => Number(input[row][col]))
);
```

그 다음 최소 탐색 횟수를 출력하기 위해 bfs의 매개변수로 탐색 횟수를 타나낼 것을 하나 더 넘겨준다.
그리고 큐에 넣어주고, 탐색이 진행될 때마다 1씩 증가시켜서 큐에 넣어준다. 시작 탐색 위치를 포함해야 해서
1로 시작하고, 조건인 지도의 맨 오른쪽 아래에 도착하면 출력하고 탐색을 종료한다.

```js
const bfs = (sr, sc, depth) => {
  const q = [];
  q.push([sr, sc, depth]);

  while(q.length) {
    const [r, c, dep] = q.shift();

    // 조건 도달 시 출력 및 탐색 종료
    if (r === N - 1 && c === M - 1) {
      console.log(dep);
      return;
    }

    for (let i = 0; i < 4; i ++) {
      ...
      // 탐색 횟수를 증가시켜서 큐에 넣기
      q.push([nr, nc, dep + 1]);
    }
  }
}

bfs(0, 0, 1);
```

```js
const input = require("fs")
  .readFileSync("./input4.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const map = Array.from(Array(N), (_, row) =>
  Array(M)
    .fill()
    .map((_, col) => Number(input[row][col]))
);

function Solution(N, M, map) {
  const visited = Array.from(Array(N), () => Array(M).fill(0));
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  const bfs = (sr, sc, depth) => {
    const q = [];

    visited[sr][sc] = 1;
    q.push([sr, sc, depth]);

    while (q.length) {
      const [r, c, dep] = q.shift();

      if (r === N - 1 && c === M - 1) {
        console.log(dep);
        return;
      }

      for (let i = 0; i < 4; i++) {
        let nr = r + DR[i];
        let nc = c + DC[i];

        if (
          nr < N &&
          nc < M &&
          nr >= 0 &&
          nc >= 0 &&
          map[nr][nc] &&
          !visited[nr][nc]
        ) {
          visited[nr][nc] = 1;
          q.push([nr, nc, dep + 1]);
        }
      }
    }
  };

  bfs(0, 0, 1);
}

Solution(N, M, map);
```

</div>
</details>
