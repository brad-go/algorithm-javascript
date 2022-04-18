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

</div>
</details>
