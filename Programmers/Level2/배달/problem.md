# 배달

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12978

## 문제 분류

: DFS/BFS, 그래프 탐색

## 풀이 과정

1. 입력받은 road를 통해서 마을들의 연결 정보(마을, 시간)을 입력해준다.
2. 1번 마을부터 시작해서 연결된 마을들을 탐색한다.
3. 탐색 시에 방문 처리를 해준다.
4. 가는 시간이 K이하라면 Set객체에 마을 번호를 추가해준다.
5. 탐색을 마친 후 Set객체에 저장된 마을 번호들의 수를 반환한다.

## 풀이 코드

```js
const solution = (N, road, K) => {
  // 마을들의 정보를 담을 배열
  const villages = Array.from(Array(N + 1), () => []);
  // 방문 배열
  const visited = new Array(N + 1).fill(0);
  // 배달 가능한 마을의 번호를 담을 Set객체
  const deliveryableVillage = new Set();

  // 마을 정보를 입력해준다.
  road.forEach(([from, to, time]) => {
    villages[from].push({ to, time });
    villages[to].push({ to: from, time });
  });

  const dfs = (index, visited, total) => {
    // 현재 마을에 연결된 마을들을 탐색
    for (const village of villages[index]) {
      // 연결된 마을, 소요 시간
      const { to, time } = village;

      // 방문한 마을이라면 건너뛰기
      if (visited[to]) continue;

      // 방문 처리
      visited[to] = 1;

      // 총 소요 시간이 K이하라면
      if (total + time <= K) {
        // 배달 가능 지역에 추가
        deliveryableVillage.add(to);
        // 해당 마을을 탐색
        dfs(to, visited, total + time);
      }

      // 다를 분기에서 탐색을 위해 방문 처리 해제
      visited[to] = 0;
    }
  };

  // 1번 마을부터 방문처리 및 배달 가능 마을에 추가
  visited[1] = 1;
  deliveryableVillage.add(1);

  // 1번 마을에서 배달할 수 있는 마을들을 탐색
  dfs(1, visited, 0);

  return deliveryableVillage.size;
};
```

## 코드 개선

BFS 방식으로도 풀이할 수 있다. 다른 테스트 케이스는 비슷한 속도를 보이는데, 32번 테스트 케이스에서 dfs는 너무 시간을 잡아먹는데, 이 풀이는 빠른 속도를 보인다.

```js
const solution = (N, road, K) => {
  const villages = Array.from(Array(N + 1), () => []);
  // 1번 마을에서 각 마을을 가는데 소요되는 시간을 담을 배열
  const requireTimes = new Array(N + 1).fill(Number.MAX_SAFE_INTEGER);
  // 1번 마을부터 시작
  const queue = [{ to: 1, time: 0 }];

  // 각 마을 정보를 담아주기
  road.forEach(([from, to, time]) => {
    villages[from].push({ to, time });
    villages[to].push({ to: from, time });
  });

  // 1번 마을부터 시작하므로 소요 시간은 0
  requireTimes[1] = 0;

  while (queue.length) {
    // 현재 마을
    const { to, time } = queue.shift();

    // 현재 마을에서 연결된 다음 마을들
    for (const village of villages[to]) {
      // 1번 마을 부터 다음 마을까지 가는 시간 > 현재 마을까지 가는 시간 + 다음 마을까지 소요되는 시간
      // 즉, 해당 마을까지 가는 최단 시간이 있을 경우 업데이트 해주고 다음 마을 탐색
      if (requireTimes[village.to] > requireTimes[to] + village.time) {
        requireTimes[village.to] = requireTimes[to] + village.time;
        queue.push(village);
      }
    }
  }

  // K보다 적은 시간으로 해당마을에 갈 수 있다면
  return requireTimes.filter((time) => time <= K).length;
};
```
