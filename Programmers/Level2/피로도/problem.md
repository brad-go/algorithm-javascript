# 피로도

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/87946

## 문제 분류

: 완전 탐색

## 풀이 과정

모든 곳을 탐색해보는 완전 탐색을 이용했다. DFS를 이용해 모든 던전을 돌아보며 가지치기를 하는 방식으로 문제를 풀이 할 수 있었다.

1. 입력받은 모든 던전에서 각각 시작한다.
2. 현재 유저의 피로도가 최소 필요 피로도 이상이라면 피로도를 감소시키며 해당 던전에 들어간다.
3. 피로도가 모자라거나 방문한 곳이라면 다른 던전을 탐색한다.
4. 조건에 맞는 던전이 있다면 들어간다.
5. 각 선택에 의해 클리어한 던전의 개수들 중에서 가장 큰 수를 반환한다.

```js
const solution = (k, dungeons) => {
  const counts = [];

  // 모든 던전에서 각각 시작하기
  for (let i = 0; i < dungeons.length; i++) {
    const [requireFatigue, consumeFatigue] = dungeons[i];
    const visited = new Array(dungeons.length).fill(false);

    // 탐험 위치 체크
    visited[i] = true;

    const count = exploreDungeon(dungeons, visited, i, k - consumeFatigue, []);
    counts.push(count);
  }

  return Math.max(...counts);
};

const exploreDungeon = (dungeons, visited, index, fatigue, counts) => {
  // 모든 던전을 탐색
  for (let i = 0; i < dungeons.length; i++) {
    // 방문한 곳이라면 건너뛰기
    if (visited[i]) {
      continue;
    }

    const [requireFatigue, consumeFatigue] = dungeons[i];

    // 유저의 피로도가 최소 필요 피로도 이상이라면
    if (fatigue >= requireFatigue) {
      // 탐험 위치 체크
      visited[i] = true;
      // 피로도를 소비하며 다음 던전 탐험
      exploreDungeon(dungeons, visited, i, fatigue - consumeFatigue, counts);
    }

    // 던전을 탐험하지 않았을 경우
    visited[i] = false;
  }

  const exploreCount = visited.filter((vist) => vist).length;
  counts.push(exploreCount);

  return Math.max(...counts);
};
```

## 코드 개선

중복되는 코드를 제거하고, 조금 더 선언적으로 코드를 작성했다. 기존 코드보다 100배 정도 빠르다.

```js
const solution = (k, dungeons) => {
  const maxCount = { value: 0 };

  dungeons.forEach(([, consumeFatigue], index) => {
    const visited = new Set([index]);
    exploreDungeon(dungeons, k - consumeFatigue, visited, maxCount);
  });

  return maxCount.value;
};

const exploreDungeon = (dungeons, fatigue, visited, maxCount) => {
  if (fatigue < 0) {
    return;
  }

  const count = visited.size;
  maxCount.value = Math.max(maxCount.value, count);

  dungeons.forEach(([requireFatigue, consumeFatigue], index) => {
    if (visited.has(index) || fatigue < requireFatigue) {
      return;
    }

    visited.add(index);
    exploreDungeon(dungeons, fatigue - consumeFatigue, visited, maxCount);
    visited.delete(index);
  });
};
```

## 코드 개선 3

첫 던전을 탐색하기 위한 불필요한 반복문을 제거해주었다.

```js
const solution = (k, dungeons) => {
  const visited = new Set([]);
  const maxCount = { value: 0 };

  exploreDungeon(dungeons, visited, k, maxCount, 0);

  return maxCount.value;
};

const exploreDungeon = (dungeons, visited, fatigue, maxCount, count) => {
  maxCount.value = Math.max(maxCount.value, count);

  dungeons.forEach(([requireFatigue, consumeFatigue], index) => {
    if (visited.has(index) || fatigue < requireFatigue) {
      return;
    }
    visited.add(index);
    exploreDungeon(
      dungeons,
      visited,
      fatigue - consumeFatigue,
      maxCount,
      count + 1
    );
    visited.delete(index);
  });
};
```

## 코드 개선 4

함수를 분리하지 않고, 내부에서 선언해주면 성능 면에서 이점이 있고, 파라미터 수를 줄일 수 있다.

```js
const solution = (k, dungeons) => {
  const visited = new Array(dungeons.length).fill(false);
  let maxCount = 0;

  const exploreDungeon = (fatigue, count) => {
    maxCount = Math.max(maxCount, count);

    dungeons.forEach(([requireFatigue, consumeFatigue], index) => {
      if (visited[index] || fatigue < requireFatigue) {
        return;
      }

      visited[i] = true;
      exploreDungeon(fatigue - consumeFatigue, count + 1);
      visited[i] = false;
    });
  };

  exploreDungeon(k, 0);
  return maxCount;
};
```
