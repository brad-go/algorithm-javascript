# 15649. N과 M (1)

## 문제 링크

https://www.acmicpc.net/problem/15649

## 문제 분류

: 백트래킹

## 소요 시간

: 20분

## 풀이 방법

조건을 만족하는 모든 순열을 출력해야하므로 백트래킹을 사용했다. 순열을 구하는 알고리즘을 사용해서 풀이할 수 있었다.

1. 1 ~ N까지 수를 담은 배열을 생성한다.
2. 각 수마다 길이가 M이 될때까지 다른 수를 선택하면서 조건을 만족하는 수열을 찾는다.

## 풀이 코드

```js
const solution = (N, M) => {
  const array = new Array(N).fill().map((_, index) => index + 1);
  const permutations = getPermutations(array, M).map((perm) => perm.join(" "));

  return permutations.join("\n");
};

const getPermutations = (array, select) => {
  const results = [];

  if (select === 1) {
    return array.map((number) => [number]);
  }

  array.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const permutations = getPermutations(rest, select - 1);
    const attached = permutations.map((combination) => [fixed, ...combination]);

    results.push(...attached);
  });

  return results;
};
```

## 코드 개선

같은 DFS 방식이지만, 더 효율적으로 할 수 있다.

```js
const solution = (N, M) => {
  const visited = new Array(N + 1).fill(0);
  const progression = [];
  const outputs = [];

  const getProgressions = (index) => {
    if (index === M) {
      outputs.push(progression.join(" "));
      return;
    }

    for (let i = 1; i <= N; i++) {
      if (visited[i]) continue;

      visited[i] = 1;

      progression[index] = i;
      getProgressions(index + 1, i);

      visited[i] = 0;
    }
  };

  getProgressions(0);

  return outputs.join("\n");
};
```
