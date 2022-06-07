# 아기 상어 - 16236

[문제 링크](https://www.acmicpc.net/problem/16236)

### 성능 요약

메모리: 512MB, 시간 2초

### 문제

N×N 크기의 공간에 물고기 M마리와 아기 상어 1마리가 있다. 공간은 1×1 크기의 정사각형 칸으로 나누어져 있다. 한 칸에는 물고기가 최대 1마리 존재한다.

아기 상어와 물고기는 모두 크기를 가지고 있고, 이 크기는 자연수이다. 가장 처음에 아기 상어의 크기는 2이고, 아기 상어는 1초에 상하좌우로 인접한 한 칸씩 이동한다.

아기 상어는 자신의 크기보다 큰 물고기가 있는 칸은 지나갈 수 없고, 나머지 칸은 모두 지나갈 수 있다. 아기 상어는 자신의 크기보다 작은 물고기만 먹을 수 있다. 따라서, 크기가 같은 물고기는 먹을 수 없지만, 그 물고기가 있는 칸은 지나갈 수 있다.

아기 상어가 어디로 이동할지 결정하는 방법은 아래와 같다.

더 이상 먹을 수 있는 물고기가 공간에 없다면 아기 상어는 엄마 상어에게 도움을 요청한다.
먹을 수 있는 물고기가 1마리라면, 그 물고기를 먹으러 간다.
먹을 수 있는 물고기가 1마리보다 많다면, 거리가 가장 가까운 물고기를 먹으러 간다.
거리는 아기 상어가 있는 칸에서 물고기가 있는 칸으로 이동할 때, 지나야하는 칸의 개수의 최솟값이다.
거리가 가까운 물고기가 많다면, 가장 위에 있는 물고기, 그러한 물고기가 여러마리라면, 가장 왼쪽에 있는 물고기를 먹는다.
아기 상어의 이동은 1초 걸리고, 물고기를 먹는데 걸리는 시간은 없다고 가정한다. 즉, 아기 상어가 먹을 수 있는 물고기가 있는 칸으로 이동했다면, 이동과 동시에 물고기를 먹는다. 물고기를 먹으면, 그 칸은 빈 칸이 된다.

아기 상어는 자신의 크기와 같은 수의 물고기를 먹을 때 마다 크기가 1 증가한다. 예를 들어, 크기가 2인 아기 상어는 물고기를 2마리 먹으면 크기가 3이 된다.

공간의 상태가 주어졌을 때, 아기 상어가 몇 초 동안 엄마 상어에게 도움을 요청하지 않고 물고기를 잡아먹을 수 있는지 구하는 프로그램을 작성하시오.

### 입력

첫째 줄에 공간의 크기 N(2 ≤ N ≤ 20)이 주어진다.

둘째 줄부터 N개의 줄에 공간의 상태가 주어진다. 공간의 상태는 0, 1, 2, 3, 4, 5, 6, 9로 이루어져 있고, 아래와 같은 의미를 가진다.

0: 빈 칸
1, 2, 3, 4, 5, 6: 칸에 있는 물고기의 크기
9: 아기 상어의 위치
아기 상어는 공간에 한 마리 있다.

### 출력

첫째 줄에 아기 상어가 엄마 상어에게 도움을 요청하지 않고 물고기를 잡아먹을 수 있는 시간을 출력한다.

### 예제 입력 1

```
3
0 0 0
0 0 0
0 9 0
```

### 예제 출력 1

```
0
```

### 예제 입력 2

```
3
0 0 1
0 0 0
0 9 0
```

### 예제 출력 2

```
3
```

### 예제 입력 3

```
4
4 3 2 1
0 0 0 0
0 0 9 0
1 2 3 4
```

### 예제 출력 3

```
14
```

### 예제 입력 4

```
6
5 4 3 2 3 4
4 3 2 3 4 5
3 2 9 5 6 6
2 1 2 3 4 5
3 2 1 6 5 4
6 6 6 6 6 6
```

### 예제 출력 4

```
60
```

### 예제 입력 5

```
6
6 0 6 0 6 1
0 0 0 0 0 2
2 3 4 5 6 6
0 0 0 0 0 2
0 2 0 0 0 0
3 9 3 0 0 1
```

### 예제 출력 5

```
48
```

### 예제 입력 6

```
6
1 1 1 1 1 1
2 2 6 2 2 3
2 2 5 2 2 3
2 2 2 4 6 3
0 0 0 0 0 6
0 0 0 0 0 9
```

### 예제 출력 6

```
39
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

<br />

구현 문제에 거의 처음 도전하는데, 코드가 길어서 문자 하나 틀린 것 때문에 시간을 많이 잡아먹었다. 역시 디버깅은 쉽지 않다... 내 눈...

#### 의사 코드 (로직)

이 문제를 해결한 코드의 로직은 다음과 같다.

1. 상수 및 변수값 설정
2. 아기 상어의 위치를 찾기
3. 아기 상어의 위치를 0으로 초기화
4. 먹을 수 있는 물고기가 없을 때까지 반복

- 먹을 수 있는 물고기의 위치 찾기
- 먹을 수 있는 물고기가 없다면 함수를 종료하고 `0` 출력
- 먹을 수 있는 물고기 중 가장 가까이 있는 물고기의 위치 찾기
- 찾은 물고기를 먹는다.
  - 상어를 해당 물고기 위치로 이동
  - 물고기를 먹었으니 지도에서 현 위치를 0으로 변경
  - 해당 위치까지 이동 시간(한 칸당 1초이므로, 이동 거리와 같음)을 총 소요 시간에 추가
  - 먹은 물고기의 수 1 증가
  - 만약 먹은 물고기의 수가 현재 아기 상어의 크기와 같다면
    - 상어 크기 1 증가
    - 먹은 물고기의 수 초기화

5. 총 소요시간 출력

#### 초기 세팅

1. 기본적으로 필요한 상수값들인 지도에서 상어를 나타내는 수(`BABY_SHARK`), 아기 상어의 초기 크기(`INITIAL_SHARK_SIZE`), 아기상어의 초기 위치(`INITIAL_POS`)를 설정해준다.
2. 사용할 변수 값들 상어의 위치(`currentSharkPos`), 상어의 크기(`sharkSize`), 총 소요 시간(`time`), 먹은 양(`amountOfEaten`)을 설정해준다.
3. 아기 상어가 위치했던 초기 위치를 0으로 초기화 해준다. 물론 BFS 탐색 시에 포함해서 탐색하게 할 수도 있지만, 조건문을 간단하게 하기 위해 이렇게 진행했다.

```js
// 아기 상어의 초기 위치 찾기
const findBabySharkPos = (map, babyShark) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === babyShark) return [i, j];
    }
  }
};

function Solution(N, map) {
  // 1. 상수 설정
  const BABY_SHARK = 9;
  const INITIAL_SHARK_SIZE = 2;
  // 아기 상어의 초기 위치 찾기
  const INITIAL_POS = findBabySharkPos(map, BABY_SHARK);

  // 2. 변수 설정
  let currentSharkPos = INITIAL_POS;
  let sharkSize = INITIAL_SHARK_SIZE;
  let time = 0;
  let amountOfEaten = 0;

  // 3. 상어가 있던 초기 위치 비우기
  const [r, c] = INITIAL_POS;
  map[r][c] = 0;
}

Solution(N, map);
```

#### 먹을 수 있는 물고기들의 위치를 찾기

BFS를 통해서 현재 아기 상어의 위치에서 현재 상어의 크기보다 작은 물고기들의 위치를 찾아서 반환한다.

```js
const findEdibleFish = (N, map, size, [sr, sc]) => {
  const q = [[sr, sc, 0]];
  const visited = Array.from(Array(N), () => Array(N).fill(0));

  visited[sr][sc] = 1;

  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  // 먹을 수 있는 물고기들의 위치가 담길 배열
  const position = [];

  while (q.length) {
    // 현재 위치와 이동 거리
    const [r, c, dist] = q.shift();

    // 현재 위치에 물고기가 있고, 물고기가 상어의 크기보다 작다면 배열에 추가
    if (map[r][c] < size && map[r][c]) {
      position.push([r, c, dist]);
    }

    for (let dir = 0; dir < 4; dir++) {
      let nr = r + DR[dir];
      let nc = c + DC[dir];

      // map을 벗어나지 않고, 방문한 적이 없으며, 상어보다 작거나 같다면 이동 가능
      if (isInRange(nr, nc, N) && !visited[nr][nc] && map[nr][nc] <= size) {
        visited[nr][nc] = 1;
        q.push([nr, nc, dist + 1]);
      }
    }
  }

  return position;
};
```

#### 먹을 수 있는 물고기들의 위치 중 가장 가까운 곳 찾기

> 거리가 가까운 물고기가 많다면, 가장 위에 있는 물고기, 그러한 물고기가 여러마리라면, 가장 왼쪽에 있는 물고기를 먹는다.

처음에 위의 말이 잘 이해가 안됐는데, 문제를 풀다보니 이해했다. 가장 가까운 거리의 물고기들이 여러마리라면, 지도 상에서 가장 위쪽에 위치한 물고기들을 선택하고, 만약 가장 위쪽에 위치한 물고기들도 여러마리라면 그 중 가장 왼쪽에 위치한 물고기를 선택한다.

```js
const findNearestFish = (positions) => {
  let nearestFishPos;

  // 가장 가까운 거리에 위치한 물고기들 찾기
  const minDistance = Math.min(...positions.map(([r, c, dist]) => dist));
  const nearestFish = positions.filter(([r, c, dist]) => dist === minDistance);

  // 가장 위에 위치한 물고기들 찾기
  const topMost = Math.min(...nearestFish.map(([r, c, dist]) => r));
  nearestFishPos = nearestFish.filter(([r, c, dist]) => r === topMost);

  // 가장 위에 위치한 물고기가 여러 마리라면 가장 왼쪽에 있는 물고기
  if (nearestFishPos.length > 1) {
    const leftMost = Math.min(...nearestFishPos.map(([r, c, dist]) => c));
    nearestFishPos = nearestFishPos.filter(([r, c, dist]) => c === leftMost);
  }

  return nearestFishPos[0];
};
```

#### 전체 코드

```js
const [n, ...input] = require("fs")
  .readFileSync("./input5.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(n);
const map = input.map((row) => row.split(" ").map(Number));

// 아기 상어의 초기 위치 찾기
const findBabySharkPos = (map, targetPosition) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === targetPosition) return [i, j];
    }
  }
};

// 지도를 벗어나는지 체크하기
const isInRange = (r, c, N) => {
  if (r >= N || c >= N || r < 0 || c < 0) return false;

  return true;
};

// 먹을 수 있는 물고기 찾기
const findEdibleFish = (N, map, size, [sr, sc]) => {
  const q = [[sr, sc, 0]];
  const visited = Array.from(Array(N), () => Array(N).fill(0));

  visited[sr][sc] = 1;

  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  const position = [];

  while (q.length) {
    const [r, c, dist] = q.shift();

    if (map[r][c] < size && map[r][c]) {
      position.push([r, c, dist]);
    }

    for (let dir = 0; dir < 4; dir++) {
      let nr = r + DR[dir];
      let nc = c + DC[dir];

      if (isInRange(nr, nc, N) && !visited[nr][nc] && map[nr][nc] <= size) {
        visited[nr][nc] = 1;
        q.push([nr, nc, dist + 1]);
      }
    }
  }

  return position;
};

const findNearestFish = (positions) => {
  let nearestFishPos;

  const minDistance = Math.min(...positions.map(([r, c, dist]) => dist));
  const nearestFish = positions.filter(([r, c, dist]) => dist === minDistance);

  const topMost = Math.min(...nearestFish.map(([r, c, dist]) => r));
  nearestFishPos = nearestFish.filter(([r, c, dist]) => r === topMost);

  if (nearestFishPos.length > 1) {
    const leftMost = Math.min(...nearestFishPos.map(([r, c, dist]) => c));
    nearestFishPos = nearestFishPos.filter(([r, c, dist]) => c === leftMost);
  }

  return nearestFishPos[0];
};

function Solution(N, map) {
  const BABY_SHARK = 9;
  const INITIAL_SHARK_SIZE = 2;
  const INITIAL_POS = findBabySharkPos(map, BABY_SHARK);

  let currentSharkPos = INITIAL_POS;
  let sharkSize = INITIAL_SHARK_SIZE;
  let time = 0;
  let amountOfEaten = 0;

  const [r, c] = INITIAL_POS;
  map[r][c] = 0;

  // 먹을 수 있는 물고기가 없을 때까지 반복
  while (true) {
    // 먹을 수 있는 물고기의 위치
    const edibleFisPos = findEdibleFish(N, map, sharkSize, currentSharkPos);

    if (!edibleFisPos.length) break;

    // 먹을 수 있는 물고기 중 가장 가까운 물고기의 위치
    const nearestFishPos = findNearestFish(edibleFisPos);

    // 먹을 수 있는 가장 가까운 물고기 먹기
    const [r, c, dist] = nearestFishPos;
    // 상어 이동 및 먹어치우기
    currentSharkPos = [r, c];
    map[r][c] = 0;

    // 먹은 물고기 추가하고 이동시간 증가
    time += dist;
    amountOfEaten++;

    // 먹은 물고기의 양이 상어의 크기와 같다면 상어 크기 증가
    if (amountOfEaten === sharkSize) {
      sharkSize++;
      amountOfEaten = 0;
    }
  }
  console.log(time);
}

Solution(N, map);
```

</div>
</details>
