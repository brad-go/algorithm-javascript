# 14888. 연산자 끼워넣기

## 문제 링크

https://www.acmicpc.net/problem/14888

## 문제 분류

: 브루트포스 알고리즘, 백트래킹

## 소요 시간

: 45분

## 풀이 방법

연산자의 개수도 지정되어 있고, 최솟값 및 최댓값도 구해야 하니까 브루트포스로 풀어야겠다고 생각했다. DFS를 통해서 연산자를 하나씩 소모해가면서 모두 탐색해보면 된다. 풀이 아이디어는 바로 떠올랐지만, 음수가 포함된 나눗셈 연산 방식이 문제가 된 것을 찾느라 시간이 조금 걸렸다.

1. DFS로 수열의 첫번째 값부터 마지막 값까지 연산자를 하나씩 소모해가면서 연산해본다.
2. 해당값들 중 최댓값과 최솟값을 찾아 출력한다.

문제를 풀이하다가 이중 틸트 연산자에 대해 알게되었다.

이중 틸트 연산자(~~)는 이중 NOT 비트 연산자로 Math.floor보다 더 빠르게 나눗셈 연산을 수행할 수 있다. 그러나 소수점 뒤를 버리기 때문에, 음수에서 결과값이 다르다. 이 문제에서 Math.floor를 사용시 -1 / 3은 -0.33333... 이 내림되어 -1이 되지만, 이중 틸트 연산자를 사용하면 0이된다. Math.trunc와 대신에 사용할 수 있을 것 같다.

## 풀이 코드

```js
const solution = (N, numbers, operators) => {
  const answers = [];
  const operate = {
    0: (num1, num2) => num1 + num2,
    1: (num1, num2) => num1 - num2,
    2: (num1, num2) => num1 * num2,
    3: (num1, num2) => ~~(num1 / num2),
  };

  const dfs = (current, index) => {
    if (index === N) {
      answers.push(current);
      return;
    }

    for (let i = 0; i < 4; i++) {
      if (operators[i] === 0) continue;

      operators[i]--;
      dfs(operate[i](current, numbers[index]), index + 1);
      operators[i]++;
    }
  };

  dfs(numbers[0], 1);

  return `${Math.max(...answers)}\n${Math.min(...answers)}`;
};
```
