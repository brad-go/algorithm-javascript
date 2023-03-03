# 14890. 경사로

## 문제 링크

https://www.acmicpc.net/problem/14890

## 문제 분류

: 구현

## 소요 시간

: 2시간

## 풀이 방법

다른 알고리즘은 필요하진 않지만, 구현하기 정말 어려운 문제였다. 문제만 보면 간단하게 할 수 있을 것 같은데 말이다.

이 문제는 N \* N 크기의 지도에서 행과 열을 길로 쳐서 지나갈 수 있는 길의 개수를 찾는 문제였다. 각 길은 N개의 블록으로 이루어져있고, 각 블록은 높이를 가지고 있다. 원래 높이 차이가 나면 지나갈 수 없지만, 이 블록들에 경사로를 놓아서 지나갈 수 있는 길로 만들 수 있다. 경사로의 길이는 L로 주어지며, 다음과 같은 경우는 경사로를 놓을 수 없다.

- 경사로가 겹치는 경우
- 낮은 칸과 높은 칸의 높이 차가 2이상 나는 경우
- 경사로를 설치할 곳의 높이가 일정하지 않은 경우(같은 높이가 연속되어야 함)
- 경사로를 놓다가 지도의 범위를 벗어나는 경우

위 경우를 모두 파악해 지나갈 수 있는 길인지 아닌지만 판단해서 개수를 세면 된다.

우선, 가로로 지나갈 수 있는 길을 센다고 해보자.

가장 먼저 확인할 것은 그 길이 모두 같은 높이로 이루어져있느지 확인하는 것이다. 모두 같은 높이로 이루어져있다면 그 길은 더 확인할 필요없이 지나갈 수 있다.

그 다음은 해당 길의 블록을 하나씩 확인해보는 것이다. 한 블록씩 확인하면서 같은 높이의 블록을 셈으로 경사로를 설치할 수 있는지 없는지 판단할 것이다. 우선, 우리는 몇 가지 경우를 확인할 수 있다.

1. 현재 블록과 다음 블록의 높이차가 2 이상 나는 곳이 있는 경우
2. 현재 블록과 다음 블록의 높이가 같은 경우
3. 현재 블록보다 다음 블록이 더 높은 경우(오르막길)
4. 현재 블록보다 다음 블록이 더 낮은 경우(내리막길)

우선 1번의 경우는 더 확인할 필요없이 경사로를 설치할 수 없으므로 지나갈 수 없는 길이다.

2번의 경우는 같은 높이의 블록을 만났으니 같은 높이의 블록 수(오르막길을 만났을 때, 경사로를 설치할 수 있는 블록 수)를 증가시킨다.

3번의 경우는 지금까지 세었던 같은 높이의 블록 수가 주어진 경사로의 길이(L)보다 크거나 같을 경우 경사로를 설치할 수 있으니 현재까지는 지나갈 수 있다. 만약, 지금까지 센 같은 높이의 블록 수가 경사로의 길이보다 작다면 해당 길은 경사로를 설치할 수 없으니 더 이상 확인할 필요가 없다.

4번의 경우가 나는 가장 구현하기 어려웠다. 중첩 반복문도 써보고 여러가지를 시도해봤지만, 이 역시 같은 높이의 블록 수를 이용해서 해결할 수 있다. 현재 블록에서 다음 블록이 더 낮다면 경사로 설치가 필요하다. 하지만 우리가 센 것은 이전까지의 같은 블록의 높이이다. 그렇다면 어떻게 해야할까?

해결 방법은 **경사로를 설치해야하는 길이만큼 같은 높이의 블록 수를 미리 빼는 것**이다. 미리 경사로의 길이만큼 같은 높이의 블록수를 뺀 후에 진행시킨다. 이렇게 하면 다음에 같은 높이의 블록을 만났을 때, 하나씩 증가해서 경사로 설치를 확인할 수 있다. 만약, 이 상태에서 다른 높이의 블록을 만나게 된다면 경사로 위에 경사로를 설치해야하는 상황이니 탐색을 멈추고 지나갈 수 없는 길로 판단한다.

## 풀이 코드

```js
const solution = (N, L, map) => {
  const rowMap = map.map((road) => [...road]);
  const columnMap = createColumnMap(N, map);

  return findPassibleRoad(N, L, rowMap) + findPassibleRoad(N, L, columnMap);
};

const createColumnMap = (N, map) => {
  const columnMap = Array.from(Array(N), () => Array(N));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      columnMap[j][i] = map[i][j];
    }
  }

  return columnMap;
};

const findPassibleRoad = (N, L, map) => {
  let passibleRoadCount = 0;

  for (const road of map) {
    // 모두 같은 높이일 경우
    if (new Set(road).size === 1) {
      passibleRoadCount += 1;
      continue;
    }

    let blocks = 1;

    for (let i = 1; i < N; i++) {
      // 높이가 2이상 차이나는 곳이 있는 길이라면
      if (Math.abs(road[i - 1] - road[i]) > 1) {
        blocks = -1;
        break;
      }

      if (road[i - 1] === road[i]) {
        // 같은 높이의 길이라면
        blocks++;
      } else if (road[i - 1] < road[i] && blocks >= L) {
        // 오르막길
        blocks = 1;
      } else if (road[i - 1] > road[i] && blocks >= 0) {
        // 내리막길
        blocks = 1 - L;
      } else {
        // 오르막길 이거나 내리막길 인데 경사로를 설치할 수 없는 경우
        // 오르막길인데 같은 높이의 블록이 L이상 이전에 없어서 설치 불가
        // 내리막길인데 이미 경사로를 설치 중이어서 설치 불가
        blocks = -1;
        break;
      }
    }

    if (blocks >= 0) passibleRoadCount += 1;
  }

  return passibleRoadCount;
};
```

## 코드 개선

속도는 훨씬 느리지만 알아보기 쉽도록 변수나 함수명을 변경했다.

```js
const solution = (N, L, map) => {
  const rowMap = map.map((road) => [...road]);
  const columnMap = createColumnMap(N, map);

  return findPassibleRoad(N, L, rowMap) + findPassibleRoad(N, L, columnMap);
};

const createColumnMap = (N, map) => {
  const columnMap = Array.from(Array(N), () => Array(N));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      columnMap[j][i] = map[i][j];
    }
  }

  return columnMap;
};

const findPassibleRoad = (N, L, map) => {
  return map.filter((road) => isPassibleRoad(L, road)).length;
};

const isPassibleRoad = (L, road) => {
  if (isAllSameHeight(road)) return true;

  let sameHeightBlocks = 1;

  for (let i = 0; i < N - 1; i++) {
    if (isHeightDifferenceGreaterThanOne(road[i], road[i + 1])) {
      sameHeightBlocks = -1;
      break;
    }

    if (isSameHeight(road[i], road[i + 1])) {
      sameHeightBlocks++;
    } else if (isUpHill(road[i], road[i + 1]) && sameHeightBlocks >= L) {
      sameHeightBlocks = 1;
    } else if (isDownHill(road[i], road[i + 1]) && sameHeightBlocks >= 0) {
      sameHeightBlocks = 1 - L;
    } else {
      sameHeightBlocks = -1;
      break;
    }
  }

  return sameHeightBlocks >= 0;
};

const isAllSameHeight = (road) => {
  return new Set(road).size === 1;
};

const isHeightDifferenceGreaterThanOne = (blockHeight, nextBlockHeight) => {
  return Math.abs(blockHeight - nextBlockHeight) > 1;
};

const isSameHeight = (blockHeight, nextBlockHeight) => {
  return blockHeight === nextBlockHeight;
};

const isUpHill = (blockHeight, nextBlockHeight) => {
  return blockHeight < nextBlockHeight;
};

const isDownHill = (blockHeight, nextBlockHeight) => {
  return blockHeight > nextBlockHeight;
};
```
