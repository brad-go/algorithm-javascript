# 15652. N과 M (4)

## 문제 링크

https://www.acmicpc.net/problem/15652

## 문제 분류

: 백트래킹

## 소요 시간

: 10분

## 풀이 방법

조건을 만족하는 모든 순열을 출력해야하므로 백트래킹을 사용했다. 조합을 사용하면 기본적인 코드 거의 그대로해서 문제를 풀이할 수 있었다.

1. 1 ~ N까지 수를 담은 배열을 생성한다.
2. 각 수마다 길이가 M이 될때까지 다른 수를 선택하면서 조건을 만족하는 수열을 찾는다.

## 풀이 코드

```js
const solution = (N, M) => {
  // 1부터 N까지 수를 담은 배열
  const numbers = new Array(N).fill().map((_, index) => index + 1);
  // 조건을 만족하는 수열 찾기
  const combinations = getCombinations(numbers, M);
  // 공백을 붙여서 수열로 만들어주기
  const progression = combinations.map((combination) => combination.join(" "));

  return progression.join("\n");
};

const getCombinations = (array, selectCount) => {
  const results = [];

  // 선택할 개수가 1이되면
  if (selectCount === 1) {
    // 배열의 요소들을 배열로 만들어서 반환
    return array.map((element) => [element]);
  }

  // 배열의 각 숫자들을 처음부터
  array.forEach((fixed, index, origin) => {
    // 동일한 수도 포함할 수 있으므로 다음 수가 아닌 현재 숫자부터 포함된 배열
    const rest = origin.slice(index);
    // 재귀를 통해 선택할 개수를 줄여가면서 1개가 될때까지
    const combinations = getCombinations(rest, selectCount - 1);
    // 구한 숫자들과 현재 수를 합치기
    const attached = combinations.map((combination) => [fixed, ...combination]);

    results.push(...attached);
  });

  return results;
};
```

## 코드 개선

같은 방식이지만, 더 간단하게 풀이할 수 있다.

```js
const solution = (N, M) => {
  // 수열이 담길 배열
  const progressions = [];
  // 출력할 수열들이 담길 배열
  const output = [];

  const getProgressions = (index, start) => {
    // M개의 수가 쌓이면 현재 수열을 추가
    if (index === M) {
      output.push(progressions.join(" "));
      return;
    }

    // start ~ N까지 반복하면서 수열에 하나씩 추가
    for (let i = start; i < N; i++) {
      // index - 추가할 수의 위치
      progressions[index] = i + 1;
      // 다음 자리에 i를 넣어서 현재 수보다 같거나 큰 수를 추가
      getProgressions(index + 1, i);
    }
  };

  getProgressions(0, 0);

  return output.join("\n");
};
```
