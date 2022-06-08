# 청소년 상어 - 19236

[문제 링크](https://www.acmicpc.net/problem/19236)

### 성능 요약

메모리: 512MB, 시간 1초

### 문제

아기 상어가 성장해 청소년 상어가 되었다.

4×4크기의 공간이 있고, 크기가 1×1인 정사각형 칸으로 나누어져 있다. 공간의 각 칸은 (x, y)와 같이 표현하며, x는 행의 번호, y는 열의 번호이다. 한 칸에는 물고기가 한 마리 존재한다. 각 물고기는 번호와 방향을 가지고 있다. 번호는 1보다 크거나 같고, 16보다 작거나 같은 자연수이며, 두 물고기가 같은 번호를 갖는 경우는 없다. 방향은 8가지 방향(상하좌우, 대각선) 중 하나이다.

오늘은 청소년 상어가 이 공간에 들어가 물고기를 먹으려고 한다. 청소년 상어는 (0, 0)에 있는 물고기를 먹고, (0, 0)에 들어가게 된다. 상어의 방향은 (0, 0)에 있던 물고기의 방향과 같다. 이후 물고기가 이동한다.

물고기는 번호가 작은 물고기부터 순서대로 이동한다. 물고기는 한 칸을 이동할 수 있고, 이동할 수 있는 칸은 빈 칸과 다른 물고기가 있는 칸, 이동할 수 없는 칸은 상어가 있거나, 공간의 경계를 넘는 칸이다. 각 물고기는 방향이 이동할 수 있는 칸을 향할 때까지 방향을 45도 반시계 회전시킨다. 만약, 이동할 수 있는 칸이 없으면 이동을 하지 않는다. 그 외의 경우에는 그 칸으로 이동을 한다. 물고기가 다른 물고기가 있는 칸으로 이동할 때는 서로의 위치를 바꾸는 방식으로 이동한다.

물고기의 이동이 모두 끝나면 상어가 이동한다. 상어는 방향에 있는 칸으로 이동할 수 있는데, 한 번에 여러 개의 칸을 이동할 수 있다. 상어가 물고기가 있는 칸으로 이동했다면, 그 칸에 있는 물고기를 먹고, 그 물고기의 방향을 가지게 된다. 이동하는 중에 지나가는 칸에 있는 물고기는 먹지 않는다. 물고기가 없는 칸으로는 이동할 수 없다. 상어가 이동할 수 있는 칸이 없으면 공간에서 벗어나 집으로 간다. 상어가 이동한 후에는 다시 물고기가 이동하며, 이후 이 과정이 계속해서 반복된다.

![그림 1](https://upload.acmicpc.net/1c7c473e-5e2c-4c45-9c88-b3b7cd06a360/-/preview/)

<그림 1>

<그림 1>은 청소년 상어가 공간에 들어가기 전 초기 상태이다. 상어가 공간에 들어가면 (0, 0)에 있는 7번 물고기를 먹고, 상어의 방향은 ↘이 된다. <그림 2>는 상어가 들어간 직후의 상태를 나타낸다.

![그림 2](https://upload.acmicpc.net/8f26df12-6f68-43a3-9f6e-7416144e91dc/-/preview/)

<그림 2>

이제 물고기가 이동해야 한다. 1번 물고기의 방향은 ↗이다. ↗ 방향에는 칸이 있고, 15번 물고기가 들어있다. 물고기가 있는 칸으로 이동할 때는 그 칸에 있는 물고기와 위치를 서로 바꿔야 한다. 따라서, 1번 물고기가 이동을 마치면 <그림 3>과 같아진다.

![그림 3](https://upload.acmicpc.net/75315b3c-ee04-4ae8-9422-5b1137f86117/-/preview/)

<그림 3>

2번 물고기의 방향은 ←인데, 그 방향에는 상어가 있으니 이동할 수 없다. 방향을 45도 반시계 회전을 하면 ↙가 되고, 이 칸에는 3번 물고기가 있다. 물고기가 있는 칸이니 서로 위치를 바꾸고, <그림 4>와 같아지게 된다.

![그림 4](https://upload.acmicpc.net/7be317c7-b8b5-4b83-becb-ffd8550311fb/-/preview/)

<그림 4>

3번 물고기의 방향은 ↑이고, 존재하지 않는 칸이다. 45도 반시계 회전을 한 방향 ↖도 존재하지 않으니, 다시 회전을 한다. ← 방향에는 상어가 있으니 또 회전을 해야 한다. ↙ 방향에는 2번 물고기가 있으니 서로의 위치를 교환하면 된다. 이런 식으로 모든 물고기가 이동하면 <그림 5>와 같아진다.

![그림 5](https://upload.acmicpc.net/a58fbda0-bb64-4773-b5f9-2da0bd3f0fd2/-/preview/)

<그림 5>

물고기가 모두 이동했으니 이제 상어가 이동할 순서이다. 상어의 방향은 ↘이고, 이동할 수 있는 칸은 12번 물고기가 있는 칸, 15번 물고기가 있는 칸, 8번 물고기가 있는 칸 중에 하나이다. 만약, 8번 물고기가 있는 칸으로 이동하면, <그림 6>과 같아지게 된다.

![그림 6](https://upload.acmicpc.net/2431d117-fab6-4de9-8d76-2fb41d471ee7/-/crop/651x656/1,12/-/preview/)

<그림 6>

상어가 먹을 수 있는 물고기 번호의 합의 최댓값을 구해보자.

### 입력

첫째 줄부터 4개의 줄에 각 칸의 들어있는 물고기의 정보가 1번 행부터 순서대로 주어진다. 물고기의 정보는 두 정수 ai, bi로 이루어져 있고, ai는 물고기의 번호, bi는 방향을 의미한다. 방향 bi는 8보다 작거나 같은 자연수를 의미하고, 1부터 순서대로 ↑, ↖, ←, ↙, ↓, ↘, →, ↗ 를 의미한다.

### 출력

상어가 먹을 수 있는 물고기 번호의 합의 최댓값을 출력한다.

### 예제 입력 1

```
7 6 2 3 15 6 9 8
3 1 1 8 14 7 10 1
6 1 13 6 4 3 11 4
16 1 8 7 5 2 12 2
```

### 예제 출력 1

```
33
```

### 예제 입력 2

```
16 7 1 4 4 3 12 8
14 7 7 6 3 4 10 2
5 2 15 2 8 3 6 4
11 8 2 4 13 5 9 4
```

### 예제 출력 2

```
43
```

### 예제 입력 3

```
12 6 14 5 4 5 6 7
15 1 11 7 3 7 7 5
10 3 8 3 16 6 1 1
5 8 2 7 13 6 9 2
```

### 예제 출력 3

```
76
```

### 예제 입력 4

```
2 6 10 8 6 7 9 4
1 7 16 6 4 2 5 8
3 7 8 6 7 6 14 8
12 7 15 4 11 3 13 3
```

### 예제 출력 4

```
39
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
