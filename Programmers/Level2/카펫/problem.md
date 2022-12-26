# 카펫

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/42842

## 문제 분류

: 완전 탐색

## 풀이 과정

접근을 잘못해서 어려웠던 문제.

처음에는 재귀함수와 가지치기를 이용해 유망성 탐색으로 문제를 해결하려고 했다.

```bash
row * column === brown + yellow
```

이 규칙을 가지고 문제를 해결하려고 했지만, 시간 초과가 나거나 런타임 에러가 발생했다.

그래서 다른 방식의 접근이 필요했다. 풀이 중에 다른 규칙을 알게 되었다.

```bash
(row + column) * 2 + 4 = brown
```

그리고 수를 줄이기 위해 yellow가 될 수 있는 경우를 생각해보기로 했다. 결국 두 수를 곱해 yellow가
될 수 있는 두 수의 짝들을 찾아야 했다. 반복문을 통해 하나씩 모두 탐색할 수도 있지만,
**yellow의 약수들을 찾고 해당 약수들 중 두 수를 곱해서 yellow가 되는 수를 찾기**로 했다.

찾은 두 수를 통해 위에서 찾은 식((가로 + 세로) \* 2 + 4는 테두리 타일의 개수)에 부합하는
두 수를 찾아서 반환하도록 했다.

즉, 풀이는 다음과 같다.

1. yellow의 약수들을 찾기
2. yellow의 약수들 중에서 두 수를 곱해 yellow가 되는 수를 찾기 (더 큰 쪽이 가로, 작은 쪽이 세로)
3. 찾은 가로와 세로를 더하고 2를 곱해서 4를 더한 수가 brown이 되는 수를 찾기
4. yellow의 크기이므로 2씩 더하면 각 가로와 세로의 크기를 구할 수 있다.

```js
const solution = (brown, yellow) => {
  // yellow의 약수 찾기
  const submultiples = getSubmultiples(yellow);
  // 곱해서 yellow가 되는 두 수들 찾기
  const pairs = findTargetPairByMultiplication(submultiples, yellow);
  const [row, col] = pairs
    // 두 수로 이루어진 직사각형의 테두리 타일의 개수 brown과 같다면
    .filter(([r, c]) => (r + c) * 2 + 4 === brown)[0]
    .map((num) => num + 2);

  return [row, col];
};

const getSubmultiples = (number) => {
  const array = [];

  for (let i = 1; i <= number; i++) {
    if (number % i === 0) {
      array.push(i);
    }
  }

  return array;
};

const findTargetPairByMultiplication = (array, target) => {
  return array.reduce((acc, cur, index, array) => {
    for (let i = 0; i < array.length; i++) {
      if (cur * array[i] === target && cur >= array[i]) {
        acc.push([cur, array[i]]);
      }
    }
    return acc;
  }, []);
};
```

## 코드 개선 2

while문을 통해 문제를 풀이 했다. 코드가 간결하고 반복이 훨씬 적어서 속도가 기존 코드보다
빠를 것 같았는데 두 세배 정도 느렸다.

```js
const solution = (brown, yellow) => {
  let row = 3;
  let column = 3;

  // 세로 타일이 가로 타일의 개수(총 타일의 개수 / 세로 타일)보다 적을 때까지
  while (column <= (brown + yellow) / column) {
    // 가로 타일의 개수 = 총 타일의 개수 / 세로 타일
    row = Math.floor((brown + yellow) / column);

    // 테두리를 제외한 타일의 개수가 yellow와 같다면
    if ((row - 2) * (column - 2) === yellow) {
      return [row, column];
    }

    column++;
  }

  // column이 마지막에 하나 증가했으므로 줄여서 반환해주기
  return [row, column - 1];
};
```

## 코드 개선 3

개선한 while문 코드를 for문으로 바꿔봤다.
기존 코드보다 10배, while문 코드보다 100배 정도 빠르다.

```js
const solution = (brown, yellow) => {
  for (let col = 3; col <= Math.floor((brown + yellow) / col); col++) {
    const row = Math.floor((brown + yellow) / col);

    if ((row - 2) * (col - 2) === yellow) {
      return [row, col];
    }
  }

  return [0, 0];
};
```
