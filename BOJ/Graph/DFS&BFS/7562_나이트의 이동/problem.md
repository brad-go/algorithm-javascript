# 나이트의 이동 - 7562

[문제 링크](https://www.acmicpc.net/problem/7562)

### 성능 요약

메모리: 256MB, 시간 1초

### 문제

체스판 위에 한 나이트가 놓여져 있다. 나이트가 한 번에 이동할 수 있는 칸은 아래 그림에 나와있다. 나이트가 이동하려고 하는 칸이 주어진다. 나이트는 몇 번 움직이면 이 칸으로 이동할 수 있을까?

![체스판](https://www.acmicpc.net/upload/images/knight.png)

### 입력

입력의 첫째 줄에는 테스트 케이스의 개수가 주어진다.

각 테스트 케이스는 세 줄로 이루어져 있다. 첫째 줄에는 체스판의 한 변의 길이 l(4 ≤ l ≤ 300)이 주어진다. 체스판의 크기는 l × l이다. 체스판의 각 칸은 두 수의 쌍 {0, ..., l-1} × {0, ..., l-1}로 나타낼 수 있다. 둘째 줄과 셋째 줄에는 나이트가 현재 있는 칸, 나이트가 이동하려고 하는 칸이 주어진다.

### 출력

각 테스트 케이스마다 나이트가 최소 몇 번만에 이동할 수 있는지 출력한다.

### 예제 입력 1

```
3
8
0 0
7 0
100
0 0
30 50
10
1 1
1 1
```

### 예제 출력 1

```
5
28
0
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">
<br />

이차원 배열을 탐색하면서 목표지점에 도착하기 위한 나이트의 이동 최단 거리를 구하는 문제여서 BFS를 이용해서 문제를 풀이했다. 기본적인 풀이 방법으로 풀 수 있었다.

```js
const [t, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(t, input) {
  const bfs = (len, start, target) => {
    const [sr, sc] = start;
    const [tr, tc] = target;

    const DR = [-1, -2, -2, -1, 1, 2, 2, 1];
    const DC = [-2, -1, 1, 2, 2, 1, -1, -2];

    const q = [];
    const map = Array.from(Array(len), () => Array(len).fill(0));

    map[sr][sc] = 1;
    q.push([sr, sc, 0]);

    while (q.length) {
      const [r, c, move] = q.shift();

      if (r === tr && c === tc) {
        console.log(move);
        return;
      }

      for (let dir = 0; dir < 8; dir++) {
        let nr = r + DR[dir];
        let nc = c + DC[dir];

        if (nr < len && nc < len && nr >= 0 && nc >= 0 && !map[nr][nc]) {
          map[nr][nc] = 1;
          q.push([nr, nc, move + 1]);
        }
      }
    }
  };

  for (let i = 0; i < Number(t); i++) {
    const l = Number(input.shift());
    const startPos = input.shift().split(" ").map(Number);
    const targetPos = input.shift().split(" ").map(Number);

    bfs(l, startPos, targetPos);
  }
}

Solution(t, input);
```

</div>
</details>
