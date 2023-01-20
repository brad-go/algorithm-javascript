# k진수에서 소수 개수 구하기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/92335

## 문제 분류

: 문자열, 숫자

## 풀이 과정

1. k진수로 변환한다.
2. 문제의 조건을 보면 0을 기준으로 수를 나누고 있다. 변환한 수를 0을 기준으로 분할한다.
3. 분할된 수들이 소수인지 판별한다.
4. 소수인 수의 개수를 반환한다.

## 풀이한 코드

```js
const solution = (n, k) => {
  const converted = convertNumber(n, k);
  const qualified = converted.split("0").map(Number);

  return qualified.filter(isPrime).length;
};

// k진수로 변환하는 함수
const convertNumber = (number, base) => {
  let result = "";
  let current = number;

  while (current > 0) {
    result += current % base;
    current = Math.floor(current / base);
  }

  return result.split("").reverse().join("");
};

// 소수인지 판별하는 함수
const isPrime = (number) => {
  if (number < 2) {
    return false;
  }

  if (number === 2 || number === 3) {
    return true;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
};
```

## 코드 개선

문제를 풀이하고 보니 자바스크립트에서 진수 변환을 위한 메서드가 있어서 굳이 직접 진수 변환을 위한 함수를 구현할 필요가 없었다.

```js
const solution = (n, k) => {
  // toString을 통해 k진수로 변환하고 0을 기준으로 분할
  const numbers = n.toString(k).split("0").map(Number);

  // 소수인지 판별해서 개수 반환
  return numbers.filter(isPrime).length;
};

const isPrime = (number) => {
  if (number < 2) return false;

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }

  return true;
};
```
