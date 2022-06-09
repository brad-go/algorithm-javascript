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

### Solution

정말 오래오래 걸려서 푼 문제이다. 중간에 참고도 했지만, 기본적인 로직은 같았고, 어떤 것이 문제인지 찾을 수가 없어서 봤었다. JavaScript로 해설된 문제가 없어서 결국 간점적인 참고만 하게 되었다.

#### 핵심 Trouble Shooting

##### 1. 배열의 복사

기존에 작성했던 코드보다 이 코드가 더 깔끔해서 참고한 코드 방식대로 코드를 리팩토링했는데, 왜 안 풀렸는지 이유를 찾은 지금 원래 코드에서도 풀 수 있었을 것을... 하고 아쉬움이 남는다.

문제를 풀이할 로직을 잘못 세운 것이 아니라 문제는 **2차원 배열과 객체 배열의 깊은 복사 문제**였다.

```js
// 객체 배열 깊은 복사

// 기존 복사 방식
const newFishes = [...fishes];

// 1차 수정
const newFishes = fishes.map((fish) => ({ ...fish }));

// 2차 수정
const newFishes = fishes.map(
  ({ x, y, id, dir, isAlive }) => new Fish(x, y, id, dir, isAlive)
);
```

처음 복사한 방식은 1차원 배열이기 때문에 당연히 자연스레 복사가 될 줄 알고, spread문법을 사용했다.
이것이 문제가 아니라 2차원 배열인 map을 복사한 것이 문제가 있는 줄 알고, 계속 그것만을 수정해보려고 했는데, 이 녀석이 문제였다.

문제를 발견하고 map과 spread 문법을 이용해서 이 객체 배열을 복사를 시도했다. 그러나 또 문제가 있었다. 객체의 값을 참조만 한다면 상관없지만, 나는 저 fish라는 객체를 Class를 통해 만들었다. 그래서 해당 클래스의 메서드를 사용하려고 하니 오류가 났다.

값을 출력해보니 다음과 같았다.

```bash
Fish { x: 3, y: 0, id: 11, dir: 2, isAlive: true } // 기존
{ x: 3, y: 0, id: 11, dir: 2, isAlive: true } // 복사한 것
```

값은 그대로 복사가 되는데, 객체 자체 즉, 클래스가 복사가 되지는 않았다. 아직 이유는 알지 못한다. 그래서 각 객체를 생성자를 이용해 새로 만들어 배열에 담아주었더니 문제가 해결되었다.

##### 2. 공간의 상태 처리

두번째로 신경써줘야 했던 것은 공간의 상태 처리였다. 상어가 물고기를 잡아먹고나서 상태나, 상어의 위치, 혹은 물고기들의 위치 신경써야 할 것들이 많았다. 확인하려고 하면 출력값들이 너무 많이 찍혀 디버깅을 제대로 하기 어려웠다.

#### 의사 코드

1. 물고기와 상어 클래스를 구현해준다.
2. 전역으로 사용할 값들을 설정해준다.

- DX, DY와 같은 방향 값, N = 4(공간의 크기), max(상어가 총 먹은 양)

3. 입력을 통해 공간의 정보를 담을 배열과 물고기들의 정보를 담을 배열을 생성해준다.

- map: 물고기들의 번호가 담김
- fishes: 물고기들의 정보(위치, 번호, 방향, 살아있는지 여부)
- fishes 배열을 번호 기준으로 오름차순으로 정렬해준다.

4. map[0][0]에 위치한 물고기를 잡아먹고 해당 물고기의 위치로 이동하고, 물고기의 방향을 가지고 먹은 양에 추가한다.
5. DFS를 통해서 다음을 반복한다.

- max값이 상어의 먹은 총 양보다 작다면 업데이트
- 모든 물고기들을 순서대로 이동시켜준다.
- 상어는 직선으로 원하는만큼 이동할 수 있다.
- 범위를 초과하지 않고, 이동하려는 칸에 물고기가 있다면
  - 공간과 물고기 리스트 복사
  - 새 물고기 리스트에서 해당 칸의 물고기 찾기
  - 상어가 물고기를 먹는다.
  - 상어가 있는 칸을 비워주고, 물고기가 이동한 칸을 상어가 있다고 표시

6. 상어가 총 먹은 물고기의 번호의 합을 출력한다.

#### 전체 코드

```js
const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map(Number);

class Fish {
  constructor(x, y, num, dir, isAlive) {
    this.x = x;
    this.y = y;
    this.id = num;
    this.dir = dir;
    this.isAlive = isAlive;
  }

  swap(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Shark {
  constructor(eatenFish = 0) {
    this.x = null;
    this.y = null;
    this.dir = null;
    this.eatenFish = eatenFish;
  }

  hunt(fish) {
    this.x = fish.x;
    this.y = fish.y;
    this.dir = fish.dir;
    this.eatenFish += fish.id;
  }
}

// 0 부터 7 까지 순서대로 ↑, ↖, ←, ↙, ↓, ↘, →, ↗
const DX = [-1, -1, 0, 1, 1, 1, 0, -1];
const DY = [0, -1, -1, -1, 0, 1, 1, 1];
const N = 4;
let max = 0;

// map안인지 범위 체크
const isInRange = (nx, ny) => {
  if (0 <= nx && nx < N && 0 <= ny && ny < N) return true;
  return false;
};

// 빈 칸 혹은 다른 물고기가 있는 칸으로 이동
const moveFish = (fish, map, fishes) => {
  if (fish.isAlive === false) return;

  for (let i = 0; i < 8; i++) {
    // 움직일 수 있는 곳이 있을 때까지 반시계 방향으로 방향 회전
    let nextDir = (fish.dir + i) % 8;
    let nx = fish.x + DX[nextDir];
    let ny = fish.y + DY[nextDir];

    // 범위를 벗어나지 않고, 상어가 있는 곳이 아니라면
    if (isInRange(nx, ny) && map[nx][ny] > -1) {
      // 이동할 곳에 물고기가 없을 곳을 대비해 0으로 미리 만들어줌
      map[fish.x][fish.y] = 0;

      // 빈 칸이라면 물고기를 이동 시키기
      if (map[nx][ny] === 0) {
        fish.swap(nx, ny);
      } else {
        // 다음 위치에 있는 물고기
        const nextFish = fishes[map[nx][ny] - 1];
        nextFish.swap(fish.x, fish.y);

        // 현재 공간에 있던 물고기의 id를 바꾼 물고기의 id로 변경해주기
        map[fish.x][fish.y] = nextFish.id;

        fish.swap(nx, ny);
      }

      // 바꾸려고 했던 물고기가 있던 위치에 현재 물고기의 id로 변경해주기
      map[nx][ny] = fish.id;
      fish.dir = nextDir;
      return;
    }
  }
};

// 상어가 이동할 수 없을 때까지 반복
const eatFish = (map, shark, fishes) => {
  if (max < shark.eatenFish) max = shark.eatenFish;

  // 모든 물고기 순서대로 이동
  fishes.forEach((fish) => moveFish(fish, map, fishes));

  for (let dist = 1; dist < N; dist++) {
    let nx = shark.x + DX[shark.dir] * dist;
    let ny = shark.y + DY[shark.dir] * dist;

    if (isInRange(nx, ny) && map[nx][ny] > 0) {
      // 2차원 배열 깊은 복사
      const newMap = map.map((m) => [...m]);
      const newFishes = [...fishes];

      newMap[shark.x][shark.y] = 0;

      const fish = newFishes[map[nx][ny] - 1];
      const newShark = new Shark(shark.eatenFish);

      newShark.hunt(fish);
      fish.isAlive = false;

      // 상어가 이동할 것이므로 원래 있던 곳은 빈 칸이 되고, 물고기의 위치를 상어가 있다고 표시
      newMap[fish.x][fish.y] = -1;

      eatFish(newMap, newShark, newFishes);
    }
  }
};

function Solution(input) {
  // 현재 공간의 상태를 나타낼 배열
  const map = Array.from(Array(4), () => Array(4).fill(null));
  // 물고기들의 정보를 담을 배열
  const fishes = new Array(input.length / 2);

  for (let i = 0; i < input.length; i += 2) {
    const x = Math.floor(i / 8);
    const y = (i % 8) / 2;
    const num = input[i];
    const dir = input[i + 1] - 1;

    const fish = new Fish(x, y, num, dir, true);
    fishes[i / 2] = fish;
    // 현재 공간에 물고기들의 번호를 넣어준다.
    map[x][y] = fish.id;
  }

  // 물고기는 번호가 작은 순서부터 이동해야 하기 때문에 정렬해두기
  fishes.sort((a, b) => a.id - b.id);

  const fish = fishes[map[0][0] - 1];
  const shark = new Shark();

  // 물고기를 잡아먹는다. 물고기의 위치로 이동, 물고기의 방향을 가지게 되고, 먹은 양에 추가
  shark.hunt(fish);
  fish.isAlive = false;
  // 상어가 있는 곳을 -1로 표시
  map[0][0] = -1;

  eatFish(map, shark, fishes);
  console.log(max);
}

Solution(input);
```

</div>
</details>
