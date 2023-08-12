# 2309. 일곱 난쟁이

## 문제 링크

https://www.acmicpc.net/problem/2309

## 문제 분류

: 브루트포스 알고리즘, 정렬

## 소요 시간

: 10분

## 풀이 방법

1. 조합 알고리즘을 통해 주어진 배열에서 7개의 수를 선택한 조합들을 구한다.
2. 조합들 중 합이 100이 되는 조합을 찾는다.
3. 해당 조합을 오름차순으로 정렬한다.

## 풀이 코드

```js
const solution = (heights) => {
  const combinations = getCombinations(heights, 7);
  const answerHeights = combinations.find((combination) => {
    return combination.reduce((acc, cur) => acc + cur, 0) === 100;
  });
  let answer = "";

  answerHeights.sort((a, b) => a - b);
  answerHeights.forEach((height) => (answer += `${height}\n`));

  return answer.trim();
};

const getCombinations = (array, selectNumber) => {
  const results = [];

  if (selectNumber === 1) {
    return array.map((element) => [element]);
  }

  array.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, selectNumber - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);

    results.push(...attached);
  });

  return results;
};
```

## 코드 개선

dfs를 통해서도 문제를 해결할 수 있다.

```js
const solution = (heights) => {
  let answer = "";

  const dfs = (index, items = []) => {
    if (answer !== "") return;

    if (items.length === 7) {
      const sum = items.reduce((acc, cur) => acc + cur, 0);

      if (sum == 100) {
        answer = items.sort((a, b) => a - b).join("\n");
      }

      return;
    }

    for (let i = index; i < heights.length; i++) {
      items.push(heights[i]);

      dfs(i + 1, items);

      items.pop(heights[i]);
    }
  };

  dfs(0);

  return answer;
};
```
