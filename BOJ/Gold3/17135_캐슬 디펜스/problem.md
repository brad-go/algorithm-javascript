# 17135. 캐슬 디펜스

## 문제 링크

https://www.acmicpc.net/problem/17135

## 문제 분류

: 구현, 그래프, 브루트포스 알고리즘, 너비 우선 탐색

## 소요 시간

: 3시간

## 풀이 방법

M이 15까지여서 궁수들의 위치를 대입해보는 로직이 시간 초과가 날 줄 알았는데, 다행히 풀 수 있었다.

문제를 풀고보니 분류가 너비 우선 탐색이 포함되어있는데, 나는 너비 우선 탐색으로 풀지는 않고 정렬을 이용해서 풀었다. 궁수가 공격할 적을 찾을 때에 너비 우선 탐색을 통해서 공격할 적을 선택할 수 있을 거라고 생각하긴 했는데, 그 방법이 더 정확한 방법이었나보다.

나는 궁수들을 가능한 조합으로 전부 배치시켜보면서 궁수들과 적들을 객체로 생성한 후에 매턴마다 궁수들이 공격한 적의 수를 세는 방식으로 풀이했다.

각 턴에는 궁수들이 공격을 먼저 한다. 궁수한명마다 공격할 수 있는 적들을 확인하는데, 이때 공격할 수 있는 적들을 거리 순으로 정렬해주었고, 가장 가까운 적을 공격하게 만들었다.

궁수들의 공격이 끝나면 적들을 한 칸 전진시키고, 성에 닿은 적들은 사라지게 만들었다.

위 방식을 각 궁수들의 배치 방법마다 총 공격한 적의 수를 세어서 반환하게 가장 많이 공격한 경우를 반환하게 만들었다.

1. 궁수들의 배치 방법을 조합을 통해 모두 찾는다.
2. 각 배치 방법마다 아래를 진행한다.
3. 궁수들을 객체로 만들어 각자의 위치를 가지게 한다.
4. 적들을 객체로 만들어 각자의 위치와 살아있는지의 여부를 나타내는 값을 가지게 한다.
5. 적들이 남아있을 때까지 각 턴마다 궁수는 공격을 한다.
6. 공격 시에는 궁수들이 각자 공격할 수 있는 적을 찾는다.
7. 적들을 모두 확인하면서 사정거리 안에 있는 적들만 남기고, 거리 순으로 정렬해서 가장 가까운 적을 타겟으로 삼아 공격한다.
8. 공격 후에는 살아있는 적들만 남기고 기존 적들의 수와 남은 적들의 수를 빼서 총 공격한 적들의 수에 더해준다.
9. 적들을 한 칸 아래로 전진시키고, 성에 진입했다면 제거한다.
10. 5번부터의 과정을 적이 사라질때까지 반복한다.
11. 궁수 배치 방법을 모두 확인하면서 가장 적을 많이 공격한 값을 반환한다.ㄴ

## 풀이 코드

```js
const solution = (N, M, D, board) => {
  // 궁수들의 배치 방법과 적의 위치
  const { archerPositions, defaultEnemies } = initGame(N, M, board);

  // 가장 많이 적을 공격한 수를 담을 변수
  let answer = 0;

  // 궁수 배치 방법을 모두 확인
  archerPositions.forEach((position) => {
    // 배치 방법에 따라 궁수 생성
    const archers = position.map((column) => makeArcher(N, D, column));

    // 각 배치 방법마다 얼마나 적들을 공격하느지 확인해야하므로 복사
    let enemies = [...defaultEnemies.map((enemy) => ({ ...enemy }))];
    // 현재 배치 방법에서의 총 공격한 수
    let attackCount = 0;

    // 맨 위의 적이 성에 닿을 때까지, 즉 모든 적이 사라질 때까지
    for (let i = 0; i < N; i++) {
      // 게임을 진행시키기
      const { movedEnemies, count } = playGame(N, D, archers, enemies);

      // 적들과 공격한 횟수 최신화
      enemies = movedEnemies;
      attackCount += count;
    }

    // 가장 많이 공격한 수를 반환
    answer = Math.max(answer, attackCount);
  });

  return answer;
};

const initGame = (N, M, board) => {
  const defaultEnemies = [];
  // 조합을 통해 궁수들의 배치 방법 찾기
  const archerPositions = getCombinations(
    new Array(M).fill().map((_, index) => index),
    3
  );

  let id = 1;

  // 적들의 위치를 찾아서 객체로 만들어주기
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j]) defaultEnemies.push(makeEnemy(id++, i, j));
    }
  }

  return { archerPositions, defaultEnemies };
};

// 궁수 배치 방법을 위한 조합 로직
const getCombinations = (array, select) => {
  const results = [];

  if (select === 1) {
    return array.map((number) => [number]);
  }

  array.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, select - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);

    results.push(...attached);
  });

  return results;
};

const makeEnemy = (id, row, column) => ({
  id,
  r: row,
  c: column,
  isAlive: true,
});

const makeArcher = (N, D, column) => ({ r: N, c: column, distance: D });

// 각 턴마다 게임을 진행시킬 함수
const playGame = (N, D, archers, enemies) => {
  // 궁수들의 공격
  attack(archers, enemies, D);

  // 살아있는 적들만 남기기
  const aliveEnemies = enemies.filter(({ isAlive }) => isAlive);
  // 기존 적의 수 - 살아있는 적의 수 = 공격한 적의 수
  const count = enemies.length - aliveEnemies.length;

  // 적들을 아래로 한칸 전진시키기
  const movedEnemies = aliveEnemies
    .map((enemy) => ({ ...enemy, r: (enemy.r += 1) }))
    .filter(({ r }) => r < N);

  return { count, movedEnemies };
};

// 궁수들의 공격
const attack = (archers, enemies, D) => {
  archers.forEach((archer) => {
    // 각 궁수마다 공격할 적 찾아서 공격
    const target = findTarget(archer, enemies, D);

    if (target) target.isAlive = false;
  });
};

// 공격할 적 찾기
const findTarget = (archer, enemies, D) => {
  // 공격 가능한 적들 찾기
  const attackableEnemies = enemies.filter((enemy) => {
    return isInDistance(D, archer.r, archer.c, enemy.r, enemy.c);
  });

  // 없다면 넘어가기
  if (!attackableEnemies.length) return -1;

  // 거리 순으로 정렬. 만약 거리가 같다면 가장 왼쪽의 적 선택
  attackableEnemies.sort((a, b) => {
    const distanceA = getDistance(archer.r, archer.c, a.r, a.c);
    const distanceB = getDistance(archer.r, archer.c, b.r, b.c);

    if (distanceA === distanceB) return a.c - b.c;

    return distanceA - distanceB;
  });

  // 찾은 적 반환
  return enemies.find(({ id }) => attackableEnemies[0].id === id);
};

// 사정 거리 안에 있는지 확인
const isInDistance = (distance, r1, c1, r2, c2) => {
  return distance >= getDistance(r1, c1, r2, c2);
};

// 거리를 구하는 함수
const getDistance = (r1, c1, r2, c2) => Math.abs(r1 - r2) + Math.abs(c1 - c2);
```
