# 경로 찾기

### 성능 요약

메모리: 128MB, 시간: 1초

### 문제

3에서 시작해 2에 도착하는 경로를 찾으려고 한다. 1로 채워진 곳은 지나갈 수 없다.

### 입력

첫째 줄에 미로의 크기 n, m이 주어진다.
다음 n만큼의 줄 만큼 m 길이의 문자열이 미로로 주어진다.

### 출력

3에서 시작해 2에 도착하는 최소 이동횟수를 출력한다.

### 예제 입력

```
4 5
3 1 1 1 1
0 0 0 0 1
0 1 1 0 1
0 0 1 0 2
```

### 예제 출력

```
7
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

```js
const [n, m, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n) {
  const map = new Array(n);
  for (let i = 0; i < n; i++) {
    map[i] = new Array(m).fill().map((_, idx) => input[idx + i * m]);
  }

  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  let count = 0;

  const search = (r, c, dir) => {
    if (map[r][c] === 2) return;
    if (map[r][c] !== 3 && map[r][c] !== 1) map[r][c] = 10;

    count++;

    dir = 0;
    let nr = r + DR[dir];
    let nc = c + DC[dir];

    if (nr < n && nc < m && r >= 0 && c >= 0 && map[nr][nc] !== 1) {
      search(r + DR[dir], c + DC[dir], dir);
    } else {
      dir = (dir + 1) % 4;
      search(r + DR[dir], c + DC[dir], dir);
    }
  };

  search(0, 0, 0);
  console.log(count);
}

Solution(n);
```

이 케이스에 대해서 문제는 풀 수 있었지만, 다른 케이스는 해결할 수 없었다. DFS에 대해 공부하고 다시 풀어봐야 겠다.

### Solution 2

```js
const [n, m, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n) {
  const map = new Array(n);
  for (let i = 0; i < n; i++) {
    map[i] = new Array(m).fill().map((_, idx) => input[idx + i * m]);
  }

  const visited = Array.from(Array(n), () => Array(m).fill(0));

  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  let idx = 1;

  const search = (r, c, dir) => {
    for (let i = 0; i < 4; i++) {
      let nr = r + DR[i % 4];
      let nc = c + DC[i % 4];

      if (nr >= n || nc >= m || nr < 0 || nc < 0) continue;

      if (map[nr][nc] !== 1 && visited[nr][nc] === 0) {
        visited[nr][nc] = idx;
        idx++;

        console.log("방향", i);
        console.log(visited);

        search(nr, nc, i);
      }
    }
  };

  search(0, 0, 0);
  console.log(visited[n - 1][m - 1]);
}

Solution(n);
```

조금 더 나은 방식의 풀이를 찾은 것 같다. 매 칸에 도착할 때마다 네 방향에 대해 모두 탐색하고
가능한 길이라면 재귀함수 `search`를 실행한다.

- 반복문을 통해서 네 방향에 대해 탐색한다.
- 범위를 벗어났다면 `continue`를 통해 로직을 넘어가고,
- `map[nr][nc] !== 1` 이거나 `visitied`(방문해서 탐색한 칸을 기록) 배열이 아직 채워지지 않았다면
  - idx를 증가시키면서 기록
  - 재귀 함수 search 실행
- 도착 지점에 visited 배열에서 구해서 출력

이 방식으로 하면 도착지점에 딱 정확한 이동횟수를 출력할 수 있지만, 재귀함수여서 잘못된 길로 들어섰을 때에도 계속 진행이 된다.
이것을 없앨 수 있는 방법을 찾아봐야겠다.

</div>
</details>
