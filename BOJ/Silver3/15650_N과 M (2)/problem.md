# 15650. N과 M (2)

## 문제 링크

https://www.acmicpc.net/problem/15650

## 문제 분류

: 브루트포스 알고리즘, 백트래킹

## 소요 시간

: 5분

## 풀이 방법

조건을 만족하는 모든 순열을 출력해야하므로 백트래킹을 사용했다. 오름차순으로 이루어진 조합을 구하면 된다.

1. 한 자리씩 선택해가면서 DFS 탐색을 진행한다.
2. 자기 자신보다 작은 수는 건너뛰고 선택하면서 탐색을 진행한다.

## 풀이 코드

```js
const solution = (N, M) => {
  const visited = new Array(N).fill(0);
  const progression = [];
  const outputs = [];

  const dfs = (index, start) => {
    if (index === M) {
      outputs.push(progression.join(" "));
      return;
    }

    // 이전에 선택했던 것 이후로부터 탐색
    for (let i = start; i < N; i++) {
      if (visited[i]) continue;

      visited[i] = 1;
      progression[index] = i + 1;

      dfs(index + 1, i);

      visited[i] = 0;
    }
  };

  dfs(0, 0);

  return outputs.join("\n");
};
```
