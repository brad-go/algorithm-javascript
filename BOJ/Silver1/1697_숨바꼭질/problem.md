# 1697. 숨바꼭질

## 문제 링크

https://www.acmicpc.net/problem/1697

## 문제 분류

: 그래프, 너비 우선 탐색, 다이나믹 프로그래밍

## 소요 시간

: 1시간

## 풀이 방법

문제를 어떻게 접근해야 할지 몰라서 제대로 풀지 못했다. dfs를 통해 백트래킹을 하려고 했는데, 시간 초과가 나서 실패했다.
그러고 나니 dp로 풀어야겠다 싶었는데, 규칙이 잘 보이지 않았다. 해결책은 bfs로 풀이하는 것이었다.

수빈이는 어차피 1초에 한칸씩 이동 혹은 자신의 위치보다 두배인 곳으로 순간이동 할 수 있으므로,
동생의 위치(K)가 수빈이의 위치(N)보다 작거나 같다면 수빈이의 위치 - 동생의 위치를 해주면 된다.

이제 동생이 수빈이 보다 더 큰 수의 위치에 있는 경우만 생각해보자.
수빈이는 1초마다 앞으로 가거나, 뒤로 가거나, 두배의 위치로 순간이동을 할 수 있다.
이때 수빈이의 이동 범위는 0보다 작거나 100,000보다 클 수는 없다.

이를 BFS 탐색을 진행한다고 생각해보자. 각 초마다 뒤로 가거나, 앞으로 가거나 두배로 이동하거나
세가지 분기가 생긴다. DFS 탐색을 하게 되면 콜스택 오류가 발생하지만 BFS로는 이를 풀이할 수 있다.
주의할 것은 계산 속도 향상을 위해서 수빈이가 같은 지점을 방문하지 않도록 해야 한다.

1. 수빈이가 동생보다 더 크거나 같은 위치에 있다면 수빈이 위치에서 동생 위치를 뺀 값을 반환한다.
2. 수빈이 위치에서 동생 위치가 될 때까지 너비 우선 탐색을 진행한다.
3. 이 때 0 ~ 100,000 사이에서만 탐색이 진행되도록 한다.

## 풀이 코드

```js
const solution = (N, K) => {
  // 수빈이가 동생보다 더 크거나 같은 수의 위치에 있을 때
  if (N >= K) return N - K;

  const bfs = (start, target) => {
    // 수빈이의 위치에서 탐색 시작
    const queue = [[start, 0]];
    // 경계를 넘어가지 않도록
    const BOUNDARY = { max: 100_000, min: 0 };
    // 같은 초에는 같은 공간에 있어야하므로 방문 처리 필요
    const visited = new Array(BOUNDARY.max + 1).fill(0);

    while (queue.length) {
      // 수빈이의 현재 위치와 시간
      const [position, second] = queue.shift();

      // 방문한 곳이라면 탐색 멈추기
      if (visited[position]) continue;
      // 동생의 위치에 도착했다면 몇 초가 걸렸는지 반환
      if (position === target) return second;

      // 다시 방문하지 않도록 방문처리
      visited[position] = 1;

      // 범위 내에서 탐색 진행
      if (position * 2 <= BOUNDARY.max) queue.push([position * 2, second + 1]);
      if (position + 1 <= BOUNDARY.max) queue.push([position + 1, second + 1]);
      if (position - 1 >= BOUNDARY.min) queue.push([position - 1, second + 1]);
    }
  };

  return bfs(N, K);
};
```

## 코드 개선

반복되는 로직을 조금 더 다듬으면 아래와 같이 된다.

```js
const solution = (N, K) => {
  if (N >= K) return N - K;

  const bfs = (start, target) => {
    const BOUNDARY = { max: 100_000, min: 0 };
    const queue = [[start, 0]];
    const visited = new Array(BOUNDARY.max + 1).fill(false);

    visited[start] = true;

    while (queue.length) {
      const [position, time] = queue.shift();

      for (const next of [position + 1, position - 1, position * 2]) {
        if (next > BOUNDARY.max || next < BOUNDARY.min || visited[next])
          continue;

        if (next === target) return time + 1;

        visited[next] = true;
        queue.push([next, time + 1]);
      }
    }
  };

  return bfs(N, K);
};
```

## 코드 개선 2

연결 리스트를 이용해 큐를 직접 구현하면 10배 정도 빠르다.

```js
class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(item) {
    const node = new Node(item);

    if (!this.length) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
    this.length += 1;
  }

  dequeue() {
    const deleted = this.head;

    this.head = this.head.next;
    this.length -= 1;

    return deleted.item;
  }
}

const solution = (N, K) => {
  if (N >= K) return N - K;

  const bfs = (start, target) => {
    const BOUNDARY = { max: 100_000, min: 0 };
    const queue = new Queue();
    const visited = new Array(BOUNDARY.max + 1).fill(false);

    queue.enqueue([start, 0]);
    visited[start] = true;

    while (queue.length) {
      const [position, time] = queue.dequeue();

      for (const next of [position + 1, position - 1, position * 2]) {
        if (next > BOUNDARY.max || next < BOUNDARY.min || visited[next])
          continue;

        if (next === target) return time + 1;

        visited[next] = true;
        queue.enqueue([next, time + 1]);
      }
    }
  };

  return bfs(N, K);
};
```

## 다른 풀이

수빈이가 두배씩 순간이동하고, 앞뒤로 움직이기 때문에 이전 값(초)을 분명히 재사용할 것이라 생각했다. 그래서 이는 DP로 풀 수 있다.

BFS 방식과 마찬가지로 N이 K보다 크면 N - K를 반환한다. 어차피 순간이동을 할 수 없으므로 1초당 한 칸씩 움직여야 한다.

편의상 K + 1 크기의 dp배열을 생성하고 여기에는 각 칸으로 이동하는 데 걸리는 시간을 담을 것이다.

N 이전까지는 어차피 1초에 한 칸씩 이동해야 하므로 N 이전의 값들을 현재 위치에서 한 칸당 1씩 적은 값으로 채워준다.

N은 0이므로 0으로 두고 넘어간다.

N 이상의 칸들부터 K까지는 아래의 규칙을 통해 채워줄 수 있다. 우선 이 규칙을 적용하려면 세 가지 값을 알아야 한다.

1. 이전 칸의 값
2. 현재 칸으로 순간이동 하기 전 칸의 값 (현재 인덱스 / 2 칸의 값)
3. 다음 칸으로 순간이동 하기 전 칸의 값 (다음 인덱스 / 2 칸의 값)

이 값들을 재사용해서 dp 배열을 채워 N에서 각 칸까지 이동하는데 얼마나 걸리는지 알 수 있다.

우선 짝수인 경우 1번 값과 2번 값만 알면 된다. 짝수라면 해당 칸으로 순간 이동 할 수 있기 때문이다. 그래서 직전 칸 + 1 값과 순간 이동 전 칸의 값 + 1을 비교해서 더 작은 값으로 채워준다.

```js
dp[i] = Math.min(dp[i - 1] + 1, dp[i / 2] + 1);
```

홀수인 경우는 순간 이동을 할 수 없다. 다음 칸으로 순간이동한 후에 한번 더 왼쪽으로 움직여야 한다. 그러므로 홀수는 직전 칸 + 1 값과 다음 칸으로 순간 이동하기 전 값 + 2를 비교해줘야 한다.

```js
dp[i] = Math.min(dp[i - 1] + 1, dp[(i + 1) / 2] + 1);
```

결과적으로 다음과 같은 코드가 된다.

```js
const solution = (N, K) => {
  // 수빈이가 동생보다 멀리 있다면
  if (N >= K) return N - K;

  // 각 칸까지 수빈이가 이동하는데 걸리는 시간을 담을 배열
  const dp = new Array(K + 1).fill(0);

  // 수빈이의 위치까지 이전 값들은 순간이동을 할 수 없으므로 한 칸씩 이동해서 채워주기
  for (let i = 0; i < N; i++) {
    dp[i] = N - i;
  }

  // 수빈이 다음 위치부터 동생 위치까지
  for (let i = N + 1; i <= K; i++) {
    dp[i] =
      i % 2 === 0
        ? // 짝수라면 현재 칸으로 순간 이동을 할 수 있으므로
          // 이전 칸의 값 + 1과 순간 이동 전 칸의 값 + 1을 비교
          Math.min(dp[i - 1] + 1, dp[i / 2] + 1)
        : // 홀수라면 현재 칸으로 순간 이동을 할 수 없으므로
          // 이전 칸의 값 + 1과 다음 칸으로 순간 이동 전 칸의 값 + 2을 비교
          // 다음 칸으로 순간 이동 후 현재 칸으로 한번 더 이동해야 하므로 2를 더한다.
          Math.min(dp[i - 1] + 1, dp[(i + 1) / 2] + 2);
  }

  return dp[K];
};
```
