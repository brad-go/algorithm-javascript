# 피자판매 - 2632

[문제 링크](https://www.acmicpc.net/problem/2632)

## 문제 풀이

### 풀이 설명

이분 탐색이 아닌 피자 경우의 수를 구하는 방법으로 문제를 해결했다.

1. 각 피자에 대해 다음과 같은 과정을 수행한다.
2. 주문 사이즈의 크기와 같은 counts 배열을 생성한다. 이 배열은 인덱스의 크기만큼 만들 수 있는 피자 조각의 조합의 수를 담는다.
3. 피자 조각을 하나도 선택하지 않았을 경우는 한가지이므로 인덱스 0을 1로 초기화한다.
4. 피자 조각의 크기를 모두 더한 값을 구한다.
5. 이 값이 주문 사이즈보다 작다면 해당 counts의 인덱스 값을 1 증가시켜준다.
6. 반복문과 모듈러 연산을 통해 끝이 정해진 배열을 원형의 연속된 형태로 계산할 수 있다.
7. 6을 통해 시작하는 피자의 인덱스 값을 증가시키면서 피자 조각을 `1 ~ 전체 피자조각 -1`만큼까지 선택하며 모든 경우의 수를 구한다.
8. 피자 조각의 합이 손님이 원하는 크기보다 크다면 연속해서 피자조각을 선택할 필요가 없으므로 break
9. 선택한 피자조각의 개수만큼 현재 인덱스 값에 누적하여 나올 수 있는 크기의 합의 카운트를 하나씩 증가시킨다.
10. A, B모두의 값을 구했다면 0 ~ 주문 사이즈만큼 탐색하면서 A, B 조각의 경우의 수의 합이 주문 사이즈가 되는 각각의 경우의 수 끼리 곱한 값을 누적해서 답을 구한다.

### 풀이한 코드

```js
// prettier-ignore
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const ORDER_SIZE = Number(input.shift());
const [M, N] = input.shift().split(" ").map(Number);
const pizzaA = input.slice(0, M).map(Number);
const pizzaB = input.slice(M).map(Number);

function solution(ORDER_SIZE, pizzaA, pizzaB) {
  const sizesOfPizzaA = getCountsSumOfSizes(pizzaA, ORDER_SIZE);
  const sizesOfPizzaB = getCountsSumOfSizes(pizzaB, ORDER_SIZE);

  let answer = 0;

  for (let i = 0; i <= ORDER_SIZE; i++) {
    answer += sizesOfPizzaA[i] * sizesOfPizzaB[ORDER_SIZE - i];
  }

  return answer;
}

const getCountsSumOfSizes = (array, orderSize, length = array.length) => {
  const counts = new Array(orderSize + 1).fill(0);
  const maxSize = getMaxSizeOfPizza(array);
  counts[0] = 1;

  if (maxSize <= orderSize) counts[maxSize]++;

  for (let i = 0; i < length; i++) {
    let sum = 0;
    for (let j = i; j < i + length - 1; j++) {
      sum += array[j % length];

      if (sum > orderSize) break;
      counts[sum]++;
    }
  }

  return counts;
};

const getMaxSizeOfPizza = (array) => {
  return array.reduce((acc, cur) => acc + cur, 0);
};

console.log(solution(ORDER_SIZE, pizzaA, pizzaB));
```

### 다른 풀이

```js

```
