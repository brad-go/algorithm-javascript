# 단지번호붙이기 - 2667

[문제 링크](https://www.acmicpc.net/problem/2667)

### 성능 요약

메모리: 128MB, 시간 1초

### 문제

<그림 1>과 같이 정사각형 모양의 지도가 있다. 1은 집이 있는 곳을, 0은 집이 없는 곳을 나타낸다. 철수는 이 지도를 가지고 연결된 집의 모임인 단지를 정의하고, 단지에 번호를 붙이려 한다. 여기서 연결되었다는 것은 어떤 집이 좌우, 혹은 아래위로 다른 집이 있는 경우를 말한다. 대각선상에 집이 있는 경우는 연결된 것이 아니다. <그림 2>는 <그림 1>을 단지별로 번호를 붙인 것이다. 지도를 입력하여 단지수를 출력하고, 각 단지에 속하는 집의 수를 오름차순으로 정렬하여 출력하는 프로그램을 작성하시오.

<div align="center" display="flex">
<img src="https://www.acmicpc.net/upload/images/ITVH9w1Gf6eCRdThfkegBUSOKd.png" alt="마을 지도">
</div>

### 입력

첫 번째 줄에는 지도의 크기 N(정사각형이므로 가로와 세로의 크기는 같으며 5≤N≤25)이 입력되고, 그 다음 N줄에는 각각 N개의 자료(0혹은 1)가 입력된다.

### 출력

첫 번째 줄에는 총 단지수를 출력하시오. 그리고 각 단지내 집의 수를 오름차순으로 정렬하여 한 줄에 하나씩 출력하시오.

### 예제 입력 1

```
7
0110100
0110101
1110101
0000111
0100000
0111110
0111000
```

### 예제 출력 1

```
3
7
8
9
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### Fail

DFS 방식으로 접근하고 풀이했는데, 백준에서 Stack Size Exceeded라는 에러가 발생했다. 콘솔에서 출력할 때는 문제없이 실행되는데, 이유를 모르겠다.

```js
const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
const N = Number(n);
const map = input.map((line) => line.split("").map((v) => +v));

function Solution(N, map) {
  const visited = Array.from(Array(N), () => Array(N).fill(0));
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  const traverse = (r, c, color) => {
    visited[r][c] = color;

    for (let i = 0; i < 4; i++) {
      let nr = r + DR[i];
      let nc = c + DC[i];

      if (
        nr < N &&
        nc < N &&
        nr >= 0 &&
        nc >= 0 &&
        map[nr][nc] &&
        !visited[nr][nc]
      ) {
        traverse(nr, nc, color);
      }
    }
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!map[i][j] || visited[i][j]) continue;

      traverse(i, j, i + j);
    }
  }

  const totalComplex = visited.flat(2).filter((v) => v);
  const complex = [...new Set(totalComplex)];

  const answer = new Array(complex.length + 1).fill(0);
  answer[0] = complex.length;

  for (let i = 0; i < totalComplex.length; i++) {
    if (complex[0] === totalComplex[i]) answer[1]++;
    if (complex[1] === totalComplex[i]) answer[2]++;
    if (complex[2] === totalComplex[i]) answer[3]++;
  }

  answer.forEach((v) => console.log(v));
}

Solution(N, map);
```

### Solution - BFS

DFS 방식이 안돼서 BFS 방식으로 풀이에 도전했다. BFS 방식에도 조금 애먹었는데, 단지의 개수를 세기 위해 cnt를 정의하고 한번 반복될 때마다 그것을 증가시켰다. 그러나 방문처리를 하는 위치가 잘못되어서 cnt의 개수가 이상하게 출력되어서 애먹었지만 해결했다.

```js
const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
const N = Number(n);
const map = input.map((line) => line.split("").map((v) => +v));

function Solution(N, map) {
  const visited = Array.from(Array(N), () => Array(N).fill(0));
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  const bfs = (sr, sc) => {
    const q = [];
    let cnt = 1;

    visited[sr][sc] = 1;
    q.push([sr, sc]);

    while (q.length) {
      const [r, c] = q.shift();

      for (let i = 0; i < 4; i++) {
        let nr = r + DR[i];
        let nc = c + DC[i];

        if (
          nr < N &&
          nc < N &&
          nr >= 0 &&
          nc >= 0 &&
          map[nr][nc] &&
          !visited[nr][nc]
        ) {
          visited[nr][nc] = 1;
          q.push([nr, nc]);
          cnt++;
        }
      }
    }
    return cnt;
  };

  const answer = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!map[i][j] || visited[i][j]) continue;

      answer.push(bfs(i, j));
    }
  }

  answer.sort((a, b) => a - b);

  console.log(answer.length);
  answer.forEach((v) => console.log(v));
}

Solution(N, map);
```

### Solution - DFS

dfs 풀이 방식의 처음 접근 방식은 단지마다 다른 수로 방문 배열에 표시하고, 그 수를 각각 세어서 정답을 도출해내는 것이었는데, 이번에는 간단하게 전역변수 cnt를 이용했다.

for문 안에 변수 cnt를 만들어 매개변수로 전달하면 제대로된 탈출조건을 설정하기가 애매해서 전역변수로 초기화한 후에 탐색이 끝날 때마다 0으로 다시 초기화해서 개수를 세는 방식으로 풀이했다.

```js
const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
const N = Number(n);
const map = input.map((line) => line.split("").map((v) => +v));

function Solution(N, map) {
  const visited = Array.from(Array(N), () => Array(N).fill(0));
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  let cnt = 0;

  const dfs = (r, c) => {
    visited[r][c] = 1;
    cnt++;

    for (let i = 0; i < 4; i++) {
      let nr = r + DR[i];
      let nc = c + DC[i];

      if (
        nr < N &&
        nc < N &&
        nr >= 0 &&
        nc >= 0 &&
        map[nr][nc] &&
        !visited[nr][nc]
      ) {
        dfs(nr, nc);
      }
    }
  };

  const answer = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!map[i][j] || visited[i][j]) continue;

      dfs(i, j);
      answer.push(cnt);
      cnt = 0;
    }
  }

  answer.sort((a, b) => a - b);

  console.log(answer.length);
  answer.forEach((v) => console.log(v));
}

Solution(N, map);
```

</div>
</details>
