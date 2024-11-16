# 2480. 주사위 세개

## 문제 링크

https://www.acmicpc.net/problem/2480

## 문제 분류

: 수학, 구현, 사칙연산, 많은 조건 분기

## 소요 시간

: 30분

## 풀이 방법

`if` 문으로만 풀고 싶지 않아서, `Map`을 사용해서 풀이했다.

1. 입력받은 문자열을 숫자 배열로 만든다.
2. 위 배열을 통해 `Map`을 만들어 `key`, `value`로 숫자와 그 개수를 저장한다.
3. 반복문을 통해 가장 개수가 많은 수와 그 개수가 무엇인지 판별한다.
4. 가장 많은 수의 개수에 따른 기본 상금을 정의한다.
5. 가장 많은 수의 수와 추가적으로 곱해지는 상금을 계산한다.
6. 만약 모두 다른 수라면 그 중 가장 큰 수를 찾아 그걸 곱해준다.
7. 둘을 더해서 결과를 반환한다.

## 풀이 코드

```js
const solution = (input) => {
  const numbers = input.split(" ").map(Number);
  const numbersMap = numbers.reduce((acc, cur) => {
    acc.set(cur, (acc.get(cur) || 0) + 1);
    return acc;
  }, new Map());

  let maxCountNumber = 0;
  let maxCount = 0;

  numbersMap.forEach((value, key) => {
    if (value > maxCount) {
      maxCountNumber = key;
      maxCount = value;
    }
  });
  const basePrice = maxCount >= 2 ? Math.pow(10, maxCount + 1) : 0;
  const multipleFactor = maxCount > 2 ? 1000 : 100;

  maxCountNumber = maxCount == 1 ? Math.max(...numbers) : maxCountNumber;

  return basePrice + maxCountNumber * multipleFactor;
};
```

## 코드 개선

```js
const solution = (input) => {
  const numbers = input.split(" ").map(Number);
  const map = numbers.reduce((acc, cur) => {
    acc.set(cur, (acc.get(cur) || 0) + 1);
    return acc;
  }, new Map());

  const duplicateCount = Math.max(...map.values());

  if (duplicateCount < 2) {
    return Math.max(...numbers) * 100;
  }

  const duplicateNumber = [
    ...new Set(
      numbers.filter((item, index) => numbers.indexOf(item) !== index)
    ),
  ];
  const basePrice = Math.pow(10, duplicateCount + 1);
  const multipleFactor = duplicateCount > 2 ? 1000 : 100;

  return basePrice + duplicateNumber * multipleFactor;
};
```
