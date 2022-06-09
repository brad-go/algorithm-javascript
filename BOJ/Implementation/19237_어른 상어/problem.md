# 어른 상어 - 19237

[문제 링크](https://www.acmicpc.net/problem/19237)

### 성능 요약

메모리: 512MB, 시간 1초

### 문제

청소년 상어는 더욱 자라 어른 상어가 되었다. 상어가 사는 공간에 더 이상 물고기는 오지 않고 다른 상어들만이 남아있다. 상어에는 1 이상 M 이하의 자연수 번호가 붙어 있고, 모든 번호는 서로 다르다. 상어들은 영역을 사수하기 위해 다른 상어들을 쫓아내려고 하는데, 1의 번호를 가진 어른 상어는 가장 강력해서 나머지 모두를 쫓아낼 수 있다.

N×N 크기의 격자 중 M개의 칸에 상어가 한 마리씩 들어 있다. 맨 처음에는 모든 상어가 자신의 위치에 자신의 냄새를 뿌린다. 그 후 1초마다 모든 상어가 동시에 상하좌우로 인접한 칸 중 하나로 이동하고, 자신의 냄새를 그 칸에 뿌린다. 냄새는 상어가 k번 이동하고 나면 사라진다.

각 상어가 이동 방향을 결정할 때는, 먼저 인접한 칸 중 아무 냄새가 없는 칸의 방향으로 잡는다. 그런 칸이 없으면 자신의 냄새가 있는 칸의 방향으로 잡는다. 이때 가능한 칸이 여러 개일 수 있는데, 그 경우에는 특정한 우선순위를 따른다. 우선순위는 상어마다 다를 수 있고, 같은 상어라도 현재 상어가 보고 있는 방향에 따라 또 다를 수 있다. 상어가 맨 처음에 보고 있는 방향은 입력으로 주어지고, 그 후에는 방금 이동한 방향이 보고 있는 방향이 된다.

모든 상어가 이동한 후 한 칸에 여러 마리의 상어가 남아 있으면, 가장 작은 번호를 가진 상어를 제외하고 모두 격자 밖으로 쫓겨난다.

![그림 1](https://upload.acmicpc.net/149aa507-f474-43cb-9071-1959bb83d59a/-/preview/)

<그림 1>

<table>
  <thead>
    <tr>
      <th colspan="8">우선 순위</th>
    </tr>
    <tr>
      <th colspan="2">상어1</th>
      <th colspan="2">상어2</th>
      <th colspan="2">상어3</th>
      <th colspan="2">상어4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>↑</th>
        <td>↓ ← ↑ →</td>
      <th>↑</th>
        <td>↓ → ← ↑</td>
      <th>↑</th>
        <td>→ ← ↓ ↑</td>
      <th>↑</th>
        <td>← → ↑ ↓</td>
    </tr>
    <tr>
      <th>↓</th>
        <td>→ ↑ ↓ ←</td>
      <th>↓</th>
        <td>↓ ↑ ← →</td>
      <th>↓</th>
        <td>↑ → ← ↓</td>
      <th>↓</th>
        <td>← ↓ → ↑</td>
    </tr>
    <tr>
      <th>←</th>
        <td>← → ↓ ↑</td>
      <th>←</th>
        <td>← → ↑ ↓</td>
      <th>←</th>
        <td>↑ ← ↓ →</td>
      <th>←</th>
        <td>↑ → ↓ ←</td>
    </tr>
    <tr>
      <th>→</th>
        <td>→ ← ↑ ↓</td>
      <th>→</th>
        <td>→ ↑ ↓ ←</td>
      <th>→</th>
        <td>← ↓ ↑ →</td>
      <th>→</th>
        <td>↑ → ↓ ←</td>
    </tr>
  </tbody>
</table>

<표 1>

<그림 1>은 맨 처음에 모든 상어가 자신의 냄새를 뿌린 상태를 나타내며, <표 1>에는 각 상어 및 현재 방향에 따른 우선순위가 표시되어 있다. 이 예제에서는 k = 4이다. 왼쪽 하단에 적힌 정수는 냄새를 의미하고, 그 값은 사라지기까지 남은 시간이다. 좌측 상단에 적힌 정수는 상어의 번호 또는 냄새를 뿌린 상어의 번호를 의미한다.

![그림 2](https://upload.acmicpc.net/b2d80580-57ba-419b-9d16-bc7fbe49512b/-/preview/)

<그림 2>

![그림 3](https://upload.acmicpc.net/52324aeb-3f7d-49b0-8128-560eb3742aa3/-/preview/)

<그림 3>

<그림 2>는 모든 상어가 한 칸 이동하고 자신의 냄새를 뿌린 상태이고, <그림 3>은 <그림 2>의 상태에서 한 칸 더 이동한 것이다. (2, 4)에는 상어 2과 4가 같이 도달했기 때문에, 상어 4는 격자 밖으로 쫓겨났다.

![그림 4](https://upload.acmicpc.net/86821cd6-b638-43a1-8abb-99c917d6d324/-/preview/)

<그림 4>

![그림 5](https://upload.acmicpc.net/76e735b6-44e1-437c-9b69-b7f55ea29d02/-/preview/)

<그림 5>

<그림 4>은 격자에 남아있는 모든 상어가 한 칸 이동하고 자신의 냄새를 뿌린 상태, <그림 5>는 <그림 4>에서 한 칸 더 이동한 상태를 나타낸다. 상어 2는 인접한 칸 중에 아무 냄새도 없는 칸이 없으므로 자신의 냄새가 들어있는 (2, 4)으로 이동했다. 상어가 이동한 후에, 맨 처음에 각 상어가 뿌린 냄새는 사라졌다.

이 과정을 반복할 때, 1번 상어만 격자에 남게 되기까지 몇 초가 걸리는지를 구하는 프로그램을 작성하시오.

### 입력

첫 줄에는 N, M, k가 주어진다. (2 ≤ N ≤ 20, 2 ≤ M ≤ N2, 1 ≤ k ≤ 1,000)

그 다음 줄부터 N개의 줄에 걸쳐 격자의 모습이 주어진다. 0은 빈칸이고, 0이 아닌 수 x는 x번 상어가 들어있는 칸을 의미한다.

그 다음 줄에는 각 상어의 방향이 차례대로 주어진다. 1, 2, 3, 4는 각각 위, 아래, 왼쪽, 오른쪽을 의미한다.

그 다음 줄부터 각 상어의 방향 우선순위가 상어 당 4줄씩 차례대로 주어진다. 각 줄은 4개의 수로 이루어져 있다. 하나의 상어를 나타내는 네 줄 중 첫 번째 줄은 해당 상어가 위를 향할 때의 방향 우선순위, 두 번째 줄은 아래를 향할 때의 우선순위, 세 번째 줄은 왼쪽을 향할 때의 우선순위, 네 번째 줄은 오른쪽을 향할 때의 우선순위이다. 각 우선순위에는 1부터 4까지의 자연수가 한 번씩 나타난다. 가장 먼저 나오는 방향이 최우선이다. 예를 들어, 우선순위가 1 3 2 4라면, 방향의 순서는 위, 왼쪽, 아래, 오른쪽이다.

맨 처음에는 각 상어마다 인접한 빈 칸이 존재한다. 따라서 처음부터 이동을 못 하는 경우는 없다.

### 출력

1번 상어만 격자에 남게 되기까지 걸리는 시간을 출력한다. 단, 1,000초가 넘어도 다른 상어가 격자에 남아 있으면 -1을 출력한다.

### 예제 입력 1

```
5 4 4
0 0 0 0 3
0 2 0 0 0
1 0 0 0 4
0 0 0 0 0
0 0 0 0 0
4 4 3 1
2 3 1 4
4 1 2 3
3 4 2 1
4 3 1 2
2 4 3 1
2 1 3 4
3 4 1 2
4 1 2 3
4 3 2 1
1 4 3 2
1 3 2 4
3 2 1 4
3 4 1 2
3 2 4 1
1 4 2 3
1 4 2 3
```

### 예제 출력 1

```
14
```

### 예제 입력 2

```
4 2 6
1 0 0 0
0 0 0 0
0 0 0 0
0 0 0 2
4 3
1 2 3 4
2 3 4 1
3 4 1 2
4 1 2 3
1 2 3 4
2 3 4 1
3 4 1 2
4 1 2 3
```

### 예제 출력 2

```
26
```

### 예제 입력 3

```
5 4 1
0 0 0 0 3
0 2 0 0 0
1 0 0 0 4
0 0 0 0 0
0 0 0 0 0
4 4 3 1
2 3 1 4
4 1 2 3
3 4 2 1
4 3 1 2
2 4 3 1
2 1 3 4
3 4 1 2
4 1 2 3
4 3 2 1
1 4 3 2
1 3 2 4
3 2 1 4
3 4 1 2
3 2 4 1
1 4 2 3
1 4 2 3
```

### 예제 출력 3

```
-1
```

### 예제 입력 4

```
5 4 10
0 0 0 0 3
0 0 0 0 0
1 2 0 0 0
0 0 0 0 4
0 0 0 0 0
4 4 3 1
2 3 1 4
4 1 2 3
3 4 2 1
4 3 1 2
2 4 3 1
2 1 3 4
3 4 1 2
4 1 2 3
4 3 2 1
1 4 3 2
1 3 2 4
3 2 1 4
3 4 1 2
3 2 4 1
1 4 2 3
1 4 2 3
```

### 예제 출력 4

```
-1
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

<br />

### 의사 코드

1. BFS를 통해서 상어의 이동이 시작된다.
2. 큐에는 상어가 있는 공간(map), 현재 상어들의 상태(sharks), 시간(time)이 들어간다.
3. 큐가 빌 때까지 아래의 과정을 반복한다.
   [ while 문 ]
   1. 큐에서 공간, 상어들, 시간을 꺼낸다.
   2. 상어들의 수만큼 아래의 과정을 반복한다.
      [ for 문 ]
      1. 상어가 쫓겨났는지 확인한다.
      2. 상어가 갈 수 있는지 후보지로 갈 수 있는 방향들(candidates), 자신의 냄새를 남긴 공간으로 갈 수 있는 방향들(ownSmellPlaces)를 빈 배열로 선언한다.
      3. 현재 상어가 보고 있는 방향의 우선 순위 방향(priority[dir])에 따라 아래를 반복한다.
         [ 2차 for 문 ]
         1. 다음 상어의 방향 값을 구한다. (nx, ny)
         2. 상어들이 있는 공간의 범위를 벗어난다면 다음 방향을 체크한다. (continue)
         3. 갈수 있는 곳이 있다면 그곳으로 갈 수 있는 방향을 후보지 배열에 추가한다.
         4. 갈 수 있는 곳이 자신의 냄새가 있는 곳 뿐이라면, 그곳으로 갈 수 있는 방향을 자신의 냄새를 남긴 공간에 추가한다.
      4. 후보지로 갈 수 있는 방향들(candidates)이 있다면 상어의 상어의 우선 순위 방향 중 후보지로 갈 수 있는 방향이 있다면 다음 방향으로 설정해준다.
      5. 후보지로 갈 수 있는 방향들이 없다면 자신의 냄새를 남긴 공간으로 갈 수 있는 방향들(ownSmellPlaces)이 담긴 것 중에서 방향을 찾아 다음 방향으로 설정한다.
      6. 공간의 상태를 나타내는 배열에서 현재 위치에 상어가 없다고 표시한다.
      7. 상어가 바라볼 방향과 다음으로 이동할 위치값을 설정해준다.
   3. 이동할 위치에 다른 상어가 없다면 상어의 냄새를 남긴다.
   4. 이동할 위치에 다른 상어가 있다면 현재 상어의 번호보다 기존에 위치한 상어의 번호가 크다면 자신의 냄새를 남기고 다른 상어를 쫓아낸다.
   5. 이동할 위치에 다른 상어가 있을 때 자신이 그 상어보다 번호가 크다면 쫓겨난다.
   6. 이동할 위치가 자신의 냄새가 남아있는 곳이라면 자신의 냄새를 새로 남긴다.
   7. 상어가 위치하지 않고, 냄새가 남아있는 공간들의 냄새를 1씩 줄여준다.
   8. 현재 남아있는 상어를 확인하고, 1번 상어만 남았다면 1번 상어만 남기까지의 시간을 출력하고 종료
   9. 1000초가 넘어도, 다른 상어가 공간에 남아있다면 -1을 출력하고 종료
   10. 둘다 아니라면 큐에 다시 현재 상태의 공간, 상어들, 시간 + 1을 넣어주고 반복

### 상어 클래스 생성

```js
class Shark {
  constructor(id) {
    this.id = id;
    this.x = null;
    this.y = null;
    this.dir = null;
    this.priority = new Array(4).fill(null);
    this.isDriveAway = false;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setDir(dir) {
    this.dir = dir;
  }

  setPriority(idx, direction) {
    this.priority[idx] = direction;
  }

  findNextDir(candidates) {
    // 후보지 중에 갈 수 있는 곳이 있다면 방향을 반환
    for (let i = 0; i < 4; i++) {
      // 현재 바라보고 있는 방향에서 이동할 우선 순위 방향 중 후보지로 갈 방향에 포함되어 있다면 그 방향을 반환
      if (candidates.includes(this.priority[this.dir][i]))
        return this.priority[this.dir][i];
    }
    // 없다면 0 반환
    return 0;
  }

  driveAway() {
    this.isDriveAway = true;
  }
}
```

### 공간 생성

다른 분들은 어떻게 풀었는지 모르겠지만, 나는 3차원 배열을 이용해서 문제를 해결했다. 2차원 배열까지는 해당 공간, 즉 격자를 나타내기 위함이고, 그 안의 값인 배열은 해당 칸에 위치한 상어의 번호(냄새 주인), 냄새 지속 시간, 상어가 현재 칸에 위치하는지를 나타내기 위해 사용했다.

```js
// 3차원 배열을 이용해서 상어들이 있는 공간 구현
const map = new Array(N).fill().map((_, idx) =>
  input[idx + 1].split(" ").map((v) => {
    // 상어 번호, 냄새 지속 시간, 상어가 있는지 없는지
    if (+v) return [+v, k, 1];
    return [+v, 0, 0];
  })
);
```

### BFS로 해결하기

방향 탐색을 진행해야 하니 BFS로 문제를 풀기 위해 접근했는데, 큐에 뭘 넣고 빼가면서 문제를 해결할 수 있을지 방법이 잘 떠오르지 않았다. 그러나 곧 해결 방안이 떠올랐는데, 현재 map의 상태와 상어들의 상태, 시간을 갱신된 상태로 상용해야 했기에 이들을 큐에 넣고 문제를 풀이했다.

```js
const q = [[initialMap, initialSharks, time + 1]];

while (q.length) {
  const [map, sharks, time] = q.shift();
  ...
}
```

그리고 이 안에서 상어들을 동시에 이동시키고, 맵을 갱신해야 했다. 그러기 위해서 각 상어가 이동할 방향이 선택되었을 때, 공간을 바로 갱신 시키면 안됐다. 그래서 상어들이 가진 바라볼 방향값과 위칫값의 상태만 업데이트 해주었다.

### 상어의 냄새 남기기

각 상어들의 바라보는 방향과 위칫값의 상태가 이미 갱신되었다. 즉, 이미 방향 탐색을 통해 다음에 이동할 곳은 정해졌다. 이 상태에서는 공간의 상태를 갱신할 수 있었다. 각 상어들마다 아래의 코드대로 예정된 곳으로 이동시켜주었다.

그러나 그곳에 상어가 존재한다면 번호를 확인해서 큰 번호를 가진 상어를 쫓아내주었고, 만약 자기 냄새가 남은 곳이라면 상어를 이동시키고 냄새를 갱신해주었다.

```js
// 냄새 남기는 함수
const leaveSmell = (map, sharks) => {
  for (let shark of sharks) {
    // 상어가 죽었다면 냄새를 남기면 안된다.
    if (shark.isDriveAway) continue;

    const { x, y, id } = shark;

    // 현재 지도에 상어가 있는 곳에 상어의 번호와 냄새를 남긴다.
    if (map[x][y][0] === 0) {
      map[x][y] = [id, k, 1];
      continue;
    }

    // 상어의 번호가 기존에 위치한 상어보다 작다면 갱신
    if (map[x][y][0] > id) map[x][y] = [id, k, 1];
    // 상어가 갈 곳이 없어 자기 냄새 쪽으로 이동했다면 갱신
    else if (map[x][y][0] === id) map[x][y] = [id, k, 1];
    // 상어가 기존에 위치한 상어보다 번호가 크다면 내쫓기
    else shark.driveAway();
  }
};
```

### 전체 코드

```js
const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

class Shark {
  constructor(id) {
    this.id = id;
    this.x = null;
    this.y = null;
    this.dir = null;
    this.priority = new Array(4).fill(null);
    this.isDriveAway = false;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setDir(dir) {
    this.dir = dir;
  }

  setPriority(idx, direction) {
    this.priority[idx] = direction;
  }

  findNextDir(candidates) {
    // 후보지 중에 갈 수 있는 곳이 있다면 방향을 반환
    for (let i = 0; i < 4; i++) {
      if (candidates.includes(this.priority[this.dir][i]))
        return this.priority[this.dir][i];
    }
    // 없다면 0 반환
    return 0;
  }

  driveAway() {
    this.isDriveAway = true;
  }
}

// 맵 크기, 상어 마릿 수, 냄새 지속 시간 입력 받기
const [N, M, k] = input[0].split(" ").map(Number);
// 3차원 배열을 이용해서 상어들이 있는 공간 구현
const map = new Array(N).fill().map((_, idx) =>
  input[idx + 1].split(" ").map((v) => {
    // 상어 번호, 냄새 지속 시간, 상어가 있는지 없는지
    if (+v) return [+v, k, 1];
    return [+v, 0, 0];
  })
);
// 상어들 생성해주기
const sharks = new Array(M).fill().map((_, idx) => new Shark(idx + 1));

// 상어의 위치 입력 받기
sharks.forEach((shark, idx) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j][0] === idx + 1) shark.setPosition(i, j);
    }
  }
});

// 첫 방향 입력받기
const firstDirections = input[N + 1].split(" ").map(Number);
firstDirections.forEach((dir, idx) => sharks[idx].setDir(dir - 1));

// 상어의 각 방향별 우선 순위 입력받기
for (let i = N + 2; i < input.length; i++) {
  const id = Math.floor((i - N + 2) / 4) - 1;
  const idx = (i - N + 2) % 4;
  const dir = input[i].split(" ").map((v) => v - 1);
  sharks[id].setPriority(idx, dir);
}

// 범위 체크 함수
const isInRange = (nx, ny) => {
  if (0 > nx || nx >= N || 0 > ny || ny >= N) return false;
  return true;
};

// 냄새 남기는 함수
const leaveSmell = (map, sharks) => {
  for (let shark of sharks) {
    // 상어가 죽었다면 냄새를 남기면 안된다.
    if (shark.isDriveAway) continue;

    const { x, y, id } = shark;

    // 현재 지도에 상어가 있는 곳에 상어의 번호와 냄새를 남긴다.
    if (map[x][y][0] === 0) {
      map[x][y] = [id, k, 1];
      continue;
    }

    // 상어의 번호가 기존에 위치한 상어보다 작다면 갱신
    if (map[x][y][0] > id) map[x][y] = [id, k, 1];
    // 상어가 갈 곳이 없어 자기 냄새 쪽으로 이동했다면 갱신
    else if (map[x][y][0] === id) map[x][y] = [id, k, 1];
    // 상어가 기존에 위치한 상어보다 번호가 크다면 내쫓기
    else shark.driveAway();
  }
};

// 냄새 지속 시간을 줄이는 함수
const decreaseSmellTime = (map) => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 냄새가 없거나 상어가 현재 위치하고 있다면 넘어감
      if (!map[i][j][1] || map[i][j][2]) continue;

      // 해당 위치의 냄새 줄이기
      map[i][j][1]--;

      // 냄새가 0이되면 냄새의 주인 표시도 없애주기
      if (map[i][j][1] === 0) map[i][j][0] = 0;
    }
  }
};

// 현재 남아 있는 상어의 번호를 반환하는 함수
const checkRemainingSharks = (sharks) => {
  let remainingShark = M;

  for (let shark of sharks) {
    if (shark.isDriveAway) remainingShark--;
  }

  return remainingShark;
};

// BFS를 통해 진행하기
const moveShark = (initialMap, initialSharks, time) => {
  const DX = [-1, 1, 0, 0];
  const DY = [0, 0, -1, 1];

  const q = [[initialMap, initialSharks, time + 1]];

  while (q.length) {
    const [map, sharks, time] = q.shift();

    for (let i = 0; i < M; i++) {
      const shark = sharks[i];

      if (shark.isDriveAway) continue;

      const candidates = [];
      const ownSmellPlaces = [];

      for (let dir of shark.priority[shark.dir]) {
        let nx = shark.x + DX[dir];
        let ny = shark.y + DY[dir];

        // 범위 체크
        if (!isInRange(nx, ny)) continue;

        // 갈 수 있는 곳이 있다면
        if (map[nx][ny][0] === 0) candidates.push(dir);
        // 갈 수 있는 곳이 자신의 냄새가 있는 곳 뿐이라면
        else if (map[nx][ny][0] === shark.id) ownSmellPlaces.push(dir);
      }

      // 후보지가 있다면 다음 방향은 nextDir
      let nextDir = shark.findNextDir(candidates);
      // 후보지가 없다면 자기 냄새가 있는 쪽으로 방향을 틈
      if (!candidates.length) nextDir = shark.findNextDir(ownSmellPlaces);

      // 이전 위치의 상어 존재 여부 false
      map[shark.x][shark.y] = [shark.id, k, 0];

      // 상어가 보는 방향과 위치 설정
      shark.setPosition(shark.x + DX[nextDir], shark.y + DY[nextDir]);
      shark.setDir(nextDir);
    }

    // 다음 위치에 상어의 냄새 남기기
    leaveSmell(map, sharks);

    // 맵 전체에 상어가 없는 곳에 냄새 시간 줄이기
    decreaseSmellTime(map);

    // 남아있는 상어 확인하기
    if (checkRemainingSharks(sharks) === 1) {
      console.log(time);
      return;
    }

    // 1000초가 넘어도 다른 상어가 격자에 남아있으면 -1 출력
    if (time >= 1000) {
      console.log(-1);
      return;
    }

    q.push([map, sharks, time + 1]);
  }
};

moveShark(map, sharks, 0);
```

</div>
</details>
