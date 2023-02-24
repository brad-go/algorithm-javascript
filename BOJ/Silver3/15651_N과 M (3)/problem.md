# 15651. N과 M (3)

## 문제 링크

https://www.acmicpc.net/problem/15651

## 문제 분류

: 백트래킹

## 소요 시간

: 5분

## 풀이 방법

조건을 만족하는 모든 수열을 출력해야하므로 백트래킹을 사용했다. 오름차순으로 이루어진 순열을 구하면 된다.

1. 한 자리씩 선택해가면서 모든 수를 선택해본다.

## 풀이 코드

```js
const solution = (N, M) => {
  const progression = [];
  const outputs = [];

  const dfs = (index) => {
    if (index === M) {
      outputs.push(progression.join(" "));
      return;
    }

    for (let i = 0; i < N; i++) {
      progression[index] = i + 1;
      dfs(index + 1);
    }
  };

  dfs(0);

  return outputs.join("\n");
};
```
