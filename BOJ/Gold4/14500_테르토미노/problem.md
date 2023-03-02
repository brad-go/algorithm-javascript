# 14500. 테르토미노

## 문제 링크

https://www.acmicpc.net/problem/14500

## 문제 분류

: 구현, 브루트포스 알고리즘

## 소요 시간

: 1시간 30분

## 풀이 방법

문제에 주어진 테르토미노의 5가지 모양을 가지고 회전시켜보고, 뒤집어보면서 각 모양들을 그려보았다. 해당 모양들을 자세히 보니 사방 탐색을 진행하면 모두 탐색이 가능하다고 보여졌다. 그래서 처음에 BFS를 통해서 문제를 풀이하려고 했는데, 방문 처리에서 어려움을 겪었고, DFS를 통해서 풀이해야 한다는 것을 알게되었다.

DFS로 문제를 풀이하는데, 테스트 케이스가 모두 통과하지 못했다. 문제를 파악해보니 5번 테로토미노 모양인, ㅗ, ㅜ, ㅓ, ㅏ는 일반적인 DFS를 통해서 탐색이 불가능하다는 것을 알게되었다. 해당 문제를 해결하기 위해 두번째 칸인 DFS가 한 번 수행되고 나서, 분기를 한번 더 만들어줌으로 해결할 수 있었다.

1. N \* M 크기 종이의 모든 칸에서 DFS를 수행한다.
2. DFS는 깊이가 4번째 이전까지만 탐색하고, 총 4칸을 탐색했으면 해당 칸들의 합을 최댓값으로 지정한다.
3. 각 탐색마다 사방 탐색을 진행한다.
4. 보드의 크기를 벗어나거나 방문한 곳이라면 건너뛴다.
5. 다음 칸에 대해 탐색을 진행한다.
6. 만약 깊이가 2라면, 즉 두 번째 칸에서는 ㅗ, ㅜ, ㅓ, ㅏ 모양을 만들기 위해 다음 칸에 대한 탐색과 기존 위치에서 탐색해 두 개의 분기를 만들어서 탐색한다.

## 풀이 코드

```js
const solution = (N, M, board) => {
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  const visited = Array.from(Array(N), () => Array(M).fill(false));

  let answer = 0;

  const dfs = (r, c, sum, depth) => {
    // 4번째 칸까지 탐색했다면
    if (depth === 4) {
      // 지금까지의 최댓값과 현재 방문한 4칸의 합을 비교해서 최댓값 지정
      answer = Math.max(answer, sum);
      return;
    }

    // 4방향으로 뻗어나가면서 탐색
    for (let dir = 0; dir < 4; dir++) {
      const nr = r + DR[dir];
      const nc = c + DC[dir];

      // 종이를 벗어나거나 방문한 곳이라면 건너뛰기
      if (!isInBoard(N, M, nr, nc) || visited[nr][nc]) continue;

      visited[nr][nc] = true;

      // 두번째 칸에서 ㅗ, ㅓ, ㅜ, ㅏ 모양을 만들기 위해 기존 위치에서 탐색을 한번 더 진행.
      // 이렇게 하면 다음 칸으로 넘어가지 않고 제자리에서 다음 칸의 합을 더하고, depth가 증가하게 된다.
      if (depth === 2) dfs(r, c, sum + board[nr][nc], depth + 1);
      // 다음 위치에서 탐색
      dfs(nr, nc, sum + board[nr][nc], depth + 1);

      // 방문 후에는 다른 분기에서 탐색할 수 있게 방문 기록 제거
      visited[nr][nc] = false;
    }
  };

  // 종이의 모든 위치에서 dfs를 통해 4칸의 합 중 최댓값 찾기
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      visited[i][j] = true;
      dfs(i, j, board[i][j], 1);
      visited[i][j] = false;
    }
  }

  return answer;
};

const isInBoard = (N, M, r, c) => 0 <= r && r < N && 0 <= c && c < M;
```

## 코드 개선

위의 코드는 많은 분기를 탐색하기 때문에 상당히 느리다. 어떻게 하면 분기를 조금이라도 더 줄일 수 있을까? (조금이라도 빨리 유망성을 판단할 수 있을까) 생각보다 방법은 간단하다.

주어진 보드에서 가장 큰 값을 구한다. 그리고 매 dfs 탐색마다 지금까지의 합 + 나머지 탐색할 칸의 개수 \* 가장 큰 값이 이전 탐색에서 구한 정답보다 작다면 해당 분기는 더 이상 탐색할 필요가 없다.

```js
const solution = (N, M, board) => {
  const DR = [0, 1, 0, -1];
  const DC = [1, 0, -1, 0];
  const visited = Array.from(Array(N), () => Array(M).fill(false));
  const maxValue = getMaxValue(board);

  let answer = 0;

  const dfs = (r, c, sum, depth) => {
    // 지금까지의 합 + 최댓값 * 남은 칸의 수가 정답보다 작다면 탐색할 필요없음
    if (sum + maxValue * (4 - depth) <= answer) return;

    if (depth === 4) {
      answer = Math.max(answer, sum);
      return;
    }

    for (let dir = 0; dir < 4; dir++) {
      const nr = r + DR[dir];
      const nc = c + DC[dir];

      if (!isInBoard(N, M, nr, nc) || visited[nr][nc]) continue;

      visited[nr][nc] = true;

      if (depth === 2) dfs(r, c, sum + board[nr][nc], depth + 1);
      dfs(nr, nc, sum + board[nr][nc], depth + 1);

      visited[nr][nc] = false;
    }
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      visited[i][j] = true;
      dfs(i, j, board[i][j], 1);
      visited[i][j] = false;
    }
  }

  return answer;
};

const isInBoard = (N, M, r, c) => 0 <= r && r < N && 0 <= c && c < M;

const getMaxValue = (board) => {
  return board.reduce((acc, cur) => Math.max(acc, Math.max(...cur)), 0);
};
```
