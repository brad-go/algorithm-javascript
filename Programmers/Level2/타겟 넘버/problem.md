# 타겟 넘버

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/43165

## 문제 분류

: DFS/BFS

## 풀이 과정

경우의 수를 구해야하므로 DFS를 이용했다.
`visited` 배열을 선언해서 방문 체크를 했었는데, 어차피 인덱스의 마지막까지 순서대로 증가하며 탐색하기 때문에
인덱스가 주어진 numbers 배열의 마지막에 도달하면 종료하면 되기 때문에 불필요했다.

1. numbers배열의 첫번째 인덱스부터 시작한다.
2. dfs를 통해 다음 인덱스의 수를 더한 경우와, 뺀 경우를 진행시킨다.
3. 배열의 끝까지 갔을 때, 현재 수가 목표한 수와 같다면 answer 증가

```js
const solution = (numbers, target) => {
  let count = 0;

  const searchNumbers = (current, index) => {
    if (index === numbers.length) {
      count += current === target ? 1 : 0;
      return;
    }

    searchNumbers(current + numbers[index], index + 1);
    searchNumbers(current - numbers[index], index + 1);
  };

  searchNumbers(0, 0);

  return count;
};
```
