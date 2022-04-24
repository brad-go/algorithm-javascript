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

### 예제 입력 1

```
4 5
3 1 1 1 1
0 0 0 0 1
0 1 1 0 1
0 0 1 0 2
```

### 예제 출력 1

```
7
```

### 예제 입력 2

```
5 6
3 1 1 1 1 1
0 1 0 0 0 1
0 1 0 1 0 1
0 1 0 1 0 2
0 0 0 1 1 1
```

### 예제 출력 2

```
14
```

### 예제 입력 3

```
5 5
3 1 1 1 1
0 0 0 1 1
0 1 1 1 1
0 1 1 1 1
0 0 0 0 2
```

### 예제 출력 3

```
8
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

DFS 방식과 BFS 방식으로 문제를 풀이해보려고 한다. 우선 두 방식 다 입력받는 것은 같다.

```js
const [n, m, ...input] = require("fs")
  .readFileSync("./input3.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n, m, input) {
  // 입력받은 값으로 이차원 배열의 맵 그리기
  const map = new Array(n)
    .fill()
    .map((_, row) => new Array(m).fill().map((_, col) => input[col + row * m]));

  // 방향 설정 - 우, 하, 좌, 상
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];

  // 배열의 인덱스에 방문했음을 나타내줄 배열
  const visited = Array.from(Array(n), () => Array(m).fill(0));

  // dfs 혹은 bfs 함수로 최소 이동거리를 구하는 함수 구현...
}

Solution(n, m, input);
```

우선 입력을 받고, 그것을 토대로 `map`을 그려준다. 그리고 방향을 변경해줄 `DR`, `DC`를 설정해주고, 방문 표시를 나타낼 `visited` 배열을 만들어준다.

#### DFS 구현

```js
const dfs = (r, c, depth) => {
    if (map[r][c] === 2) {
      console.log(depth);
      return;
    }

    visited[r][c] = 1;
    map[r][c] = 10;

    for (let i = 0; i < 4; i++) {
      let nr = r + DR[i];
      let nc = c + DC[i];

      if (
        nr < n &&
        nc < m &&
        nr >= 0 &&
        nc >= 0 &&
        !visited[nr][nc] &&
        map[nr][nc] !== 1
      ) {
        dfs(nr, nc, depth + 1);
      }
    }
  };

  dfs(0, 0, 0);
}
```

#### DFS 풀이

- 깊이 우선 탐색 방식으로 구현하기 위해서는 **재귀함수**를 사용한다.
- 재귀함수는 `return` 조건에 도달해도 **이전 함수로 돌아가서 다시 함수를 실행하므로 `visited` 배열로 방문처리를 해줘야 한다**.

```js
const dfs = (r, c, depth) => {
  // ...
  visited[r][c] = 1;
  // ...
};
```

- `map`에서는 지나간 곳에 **10**을 통해 경로를 표시한다. (확인하기 위해, 아무 숫자나 상관 없다.)

```js
const dfs = (r, c, depth) => {
  // ...
  map[r][c] = 10;
  // ...
};
```

- 각 인덱스에 도착할 때마다 네 방향에 대해 갈 수 있는 곳인지 탐색해줘야 하므로 `dfs` 함수가 실행될 때마다, 네 방향에 대해 반복문을 실행한다.

```js
for (let i = 0; i < 4; i++) {
  // ...
}
```

- 반복문 안에서 각 방향의 다음 칸이 갈 수 있는 곳인지 확인하기 위해 `nr`, `nc` 설정

```js
for (let i = 0; i < 4; i++) {
  // i값이 변화하면서 각 네 방향에 대해 체크
  let nr = r + DR[i];
  let nc = c + DC[i];
  // ...
}
```

- map의 경계를 지나진 않는지, 이미 방문한 곳이 아닌지, 갈수 있는 곳인지 체크하는 조건을 체크하고, 통과한다면 재귀함수 실행

```js
for (let i = 0; i < 4; i++) {
  let nr = r + DR[i];
  let nc = c + DC[i];

  if (
    // 경계 체크
    nr < n &&
    nc < m &&
    nr >= 0 &&
    nc >= 0 &&
    // 방문한 곳인지 체크, 1이라면 방문한 곳
    !visited[nr][nc] &&
    // 갈 수 있는 곳인지 체크, 1이면 지나갈 수 없음
    map[nr][nc] !== 1
  ) {
    // 조건에 부합한다면 재귀함수 실행
    dfs(nr, nc, depth + 1);
  }
}
```

- 이동 횟수를 표시하는 depth를 매개변수로 넘기고, 재귀함수를 실행할 때마다 depth 증가시키기. 만약 `depth + 1`이 아니라 `depth++`이라면 depth가 증가되지 못한채 전달 되므로 `depth + 1`로 전달.

```js
dfs(nr, nc, depth + 1);
```

- **2**에 도착한다면 `depth`를 출력하고 `return`

```js
if (map[r][c] === 2) {
  console.log(depth);
  return;
}
```

</div>
</details>
