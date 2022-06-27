# 타겟 넘버

## 문제 분류

: DFS/BFS

## 풀이 과정

경우의 수를 구해야하므로 DFS를 이용했다.

1. numbers배열의 첫번째 인덱스부터 시작한다.
2. dfs를 통해 다음 인덱스의 수를 더한 경우와, 뺀 경우를 진행시킨다.
3. 배열의 끝까지 갔을 때, 현재 수가 목표한 수와 같다면 answer 증가

```js
function solution(numbers, target) {
  let answer = 0;

  const makeTargetNumber = (index, currentNumber) => {
    if (index === numbers.length) {
      if (currentNumber === target) answer++;
      return;
    }
    makeTargetNumber(index + 1, currentNumber + numbers[index]);
    makeTargetNumber(index + 1, currentNumber - numbers[index]);
  };

  makeTargetNumber(0, 0);
  return answer;
}
```
