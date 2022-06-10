# 마법사 상어와 파이어볼 = 20056

[문제 링크](https://www.acmicpc.net/problem/20056)

## 문제 풀이

파이어볼을 합치는 과정에서 파이어볼 전체를 탐색하기 때문에 시간 복잡도가 많이 늘어난 것 같다. 맵에 파이어볼의 개수만 표시할게 아니라 맵을 파이어볼 자체를 나타내는 것으로 코드를 다시 짜봐야 겠다.

### 의사 코드

1. 맵에 입력 받은 파이어볼의 위치에 1을 표시한다. (맵은 파이어 볼의 개수만을 나타낸다.)
2. K번 동안 반복하면서 아래를 반복한다.
   [ while 문 ]
   1. 파이어 볼을 이동시킨다.
      - 파이어볼을 탐색하면서 다음 위치값을 구하고 업데이트 해준다.
      - 현재 위치의 개수를 1 줄인다.
      - 다음 위치의 파이어볼의 개수를 1 늘린다.
   2. 파이어 볼이 두 개 이상 있는 곳을 찾는다.
   3. 파이어볼을 합치고 나눠준다.
      - 파이어볼 배열을 탐색하면서 파이어볼의 좌표가 두개 이상 있는 곳의 좌표와 같다면 합칠 파이어볼을 담을 배열에 추가
      - 담긴 파이어볼은 null 표시
      - 문제에서 정의된 값에 따라 m, s, d 값을 구해주고, 새 파이어볼을 생성해서 파이어볼 배열에 담는다.
      - 현재 좌표에 파이어볼의 개수 4 표시를 한다. (네개로 나눠지므로)
   4. null 상태인 파이어볼을 없애준다.
3. 파이어볼들의 질량의 합을 구하고 정답을 출력한다.

### 전체 코드

```js
const input = require("fs")
  .readFileSync("./input3.txt")
  .toString()
  .trim()
  .split("\n");

class FireBall {
  constructor(r, c, m, s, d) {
    this.r = r;
    this.c = c;
    this.m = m;
    this.s = s;
    this.d = d;
  }
}

const [N, M, K] = input.shift().split(" ").map(Number);
const fireBalls = input.map((ball) => {
  const [r, c, m, s, d] = ball.split(" ").map(Number);
  return new FireBall(r - 1, c - 1, m, s, d);
});

// 파이어볼 이동시키기
const moveFireBalls = (map, fireBalls) => {
  const DR = [-1, -1, 0, 1, 1, 1, 0, -1];
  const DC = [0, 1, 1, 1, 0, -1, -1, -1];

  fireBalls.forEach((fireBall) => {
    const { r, c, s, d } = fireBall;

    let nr = (r + DR[d] * s + s * N) % N;
    let nc = (c + DC[d] * s + s * N) % N;

    // 이전 위치의 파이어볼 없애기
    map[r][c] -= 1;

    fireBall.r = nr;
    fireBall.c = nc;

    map[nr][nc] += 1;
  });
};

// 파이어볼이 두개 이상 있는 곳 찾기
const findPlaceWithMoreThanOneBall = (map) => {
  const places = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] > 1) places.push([i, j]);
    }
  }

  return places;
};

// 파이어볼 합치기
const combineFireBall = (map, fireBalls, places) => {
  // 기존 배열의 길이 저장
  const M = fireBalls.length;
  // 한 번에 여러 공간에 겹쳐있을 수 있으므로
  places.forEach(([r, c]) => {
    const willCombined = [];

    // 파이어볼을 합쳐질 것들을 골라 새 배열에 담고 기존 것 제거
    for (let i = 0; i < M; i++) {
      if (fireBalls[i] === null) continue;

      const fireBall = fireBalls[i];

      if (fireBall.r === r && fireBall.c === c) {
        willCombined.push(fireBall);
        // fireBalls.splice(i, 1);
        // i--;
        fireBalls[i] = null;
      }
    }

    map[r][c] = 0;

    let comM = 0;
    let comS = 0;
    let comD = new Array(willCombined.length);

    willCombined.forEach((fireBall, idx) => {
      if (fireBall === null) return;

      comM += fireBall.m;
      comS += fireBall.s;
      comD[idx] = fireBall.d;
    });

    let flag = comD[0] % 2 === 0 ? true : false;
    let isEven;

    if (flag) isEven = comD.every((d) => d % 2 === 0);
    else isEven = comD.every((d) => d % 2 === 1);

    const m = Math.floor(comM / 5);
    const s = Math.floor(comS / willCombined.length);
    const dir = isEven ? [0, 2, 4, 6] : [1, 3, 5, 7];

    // 질량이 0이 아니라면
    if (m <= 0) return;

    // 4개의 새 파이어볼로 만들어줌
    for (let i = 0; i < 4; i++) {
      fireBalls.push(new FireBall(r, c, m, s, dir[i]));
    }

    map[r][c] = 4;
  });
};

const calculateSumOfMass = (fireBalls) => {
  const sum = fireBalls.reduce((acc, cur) => (acc += cur.m), 0);
  return sum;
};

const Solution = (N, K, fireBalls) => {
  // 공간의 상태 나타내기
  const map = Array.from(Array(N), () => Array(N).fill(0));
  fireBalls.forEach((fireBall) => (map[fireBall.r][fireBall.c] = 1));

  while (K > 0) {
    // 파이어볼 이동 - 좌표 값 업데이트
    moveFireBalls(map, fireBalls);
    // 맵을 체크해서 파이어볼이 공존하는 곳을 찾음
    const placesToCheck = findPlaceWithMoreThanOneBall(map);
    // 파이어 볼을 합치고 4개의 파이어볼로 만듦
    combineFireBall(map, fireBalls, placesToCheck);
    // 질량이 0인 파이어볼 제거
    fireBalls = fireBalls.filter((fireBall) => fireBall !== null);

    K--;
  }
  // 질량의 합 구하기
  const answer = calculateSumOfMass(fireBalls);

  console.log(answer);
};

Solution(N, K, fireBalls);
```

### 개선된 코드

코드를 조금 더 가독성 있고 효율적이게 개선했다. 메모리 소비가 조금 올라갔지만, 시간이 2.5배 정도 단축되었다.

```js
const input = require("fs")
  .readFileSync("./input3.txt")
  .toString()
  .trim()
  .split("\n");

class FireBall {
  constructor(row, col, mass, speed, dir) {
    this.row = row;
    this.col = col;
    this.mass = mass;
    this.speed = speed;
    this.dir = dir;
  }
}

const [N, M, K] = input.shift().split(" ").map(Number);
const fireBalls = input.map((fireBall) => {
  const [row, col, mass, speed, dir] = fireBall.split(" ").map(Number);
  return new FireBall(row - 1, col - 1, mass, speed, dir);
});

const moveFireBalls = (map, fireBalls) => {
  const newMap = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => [])
  );

  const DR = [-1, -1, 0, 1, 1, 1, 0, -1];
  const DC = [0, 1, 1, 1, 0, -1, -1, -1];

  fireBalls.forEach((fireBall) => {
    const { row, col, speed, dir } = fireBall;

    let nr = (row + DR[dir] * speed + speed * N) % N;
    let nc = (col + DC[dir] * speed + speed * N) % N;

    fireBall.row = nr;
    fireBall.col = nc;

    newMap[nr][nc].push(fireBall);
  });

  return newMap;
};

const checkNumberOfFireBallsOnMap = (map) => {
  const newFireBalls = [];
  const placesMoreThanOne = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 0이라면 continue로 넘겼었는데, 오히려 시간이 60mbs정도 더 소모되었다. 더 빠를거라고 생각했는데 왜지?
      if (map[i][j].length === 1) newFireBalls.push(...map[i][j]);
      if (map[i][j].length > 1) placesMoreThanOne.push([i, j]);
    }
  }

  return [newFireBalls, placesMoreThanOne];
};

const combineFireBall = (map, places) => {
  const newFireBalls = [];

  const ODD = [1, 3, 5, 7];
  const EVEN = [0, 2, 4, 6];

  places.forEach(([row, col]) => {
    const combinedFireBalls = map[row][col];

    let combinedMass = 0;
    let combinedSpeed = 0;
    let combinedEvenDir = 0;

    combinedFireBalls.forEach((fireBall) => {
      const { mass, speed, dir } = fireBall;

      combinedMass += mass;
      combinedSpeed += speed;
      if (dir % 2 === 0) combinedEvenDir++;
    });

    const mass = Math.floor(combinedMass / 5);
    const speed = Math.floor(combinedSpeed / combinedFireBalls.length);

    if (mass === 0) return; // 이 코드가 없다면 시작하자마자 틀렸다고 나오게 된다.

    for (let i = 0; i < 4; i++) {
      if (!combinedEvenDir || combinedEvenDir === combinedFireBalls.length) {
        newFireBalls.push(new FireBall(row, col, mass, speed, EVEN[i]));
      } else {
        newFireBalls.push(new FireBall(row, col, mass, speed, ODD[i]));
      }
    }
  });

  return newFireBalls;
};

const calculateSumOfMass = (fireBalls) => {
  return fireBalls.reduce((acc, cur) => acc + cur.mass, 0);
};

const Solution = (N, K, fireBalls) => {
  let map = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => [])
  );

  fireBalls.forEach((fireBall) =>
    map[fireBall.row][fireBall.col].push(fireBall)
  );

  while (K > 0) {
    map = moveFireBalls(map, fireBalls);
    const [existFireBalls, placesMoreThanOne] =
      checkNumberOfFireBallsOnMap(map);
    const devidedFireBalls = combineFireBall(map, placesMoreThanOne);
    fireBalls = [...existFireBalls, ...devidedFireBalls];
    K--;
  }

  const answer = calculateSumOfMass(fireBalls);

  console.log(answer);
};

Solution(N, K, fireBalls);
```
