# N개의 최소공배수

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12953

## 문제 분류

: 수학

## 풀이 과정

1. 정수 배열 arr을 오름차순으로 정렬해준다.
2. 최소공배수를 arr의 마지막 원소(가장 큰 원소)로 가정한다.
3. arr의 모든 원소가 가정한 최소공배수로 나눠질때까지 반복한다.
4. 모두 가정한 최소공배수로 나눠진다면 최소공배수를 반환한다.
5. 모두 가정한 최소공배수로 나눠지지 않는다면 arr의 마지막 원소(가장 큰 원소)를 최소공배수에 더해주고 4부터 반복한다.

## 풀이한 코드

```js
const solution = (arr) => {
  const numbers = arr.slice().sort((a, b) => a - b);

  let leastCommonMultiple = numbers[numbers.length - 1];

  while (true) {
    if (numbers.every((number) => leastCommonMultiple % number === 0)) {
      return leastCommonMultiple;
    }

    leastCommonMultiple += numbers[numbers.length - 1];
  }
};
```

## 코드 개선

[유클리드 호제법](https://ko.wikipedia.org/wiki/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C_%ED%98%B8%EC%A0%9C%EB%B2%95)을 이용해서 훨씬 빠르게 풀이할 수 있었다. 자연수 a, b에 대해 a를 b로 나눈 나머지를 r이라면, a와 b의 최대공약수는 b와 r의 최대공약수와 같다는 점을 이용한다. 이 과정을 반복해서 최대공약수를 구할 수 있다.

또, 하나의 풀이법으로 다음 식이 중요했다.

```
최소공배수 = (a * b) / a와 b의 최대 공약수
```

이 식을 통해서 정수 배열 arr의 앞에서부터 최소공배수를 구하고, 다음 수와 최소공배수를 구하고를 반복해서 답을 도출할 수 있었다.

```js
const solution = (arr) => {
  return arr.reduce((a, b) => (a * b) / euclidean(a, b));
};

const euclidean = (a, b) => {
  return a % b ? euclidean(b, a % b) : b;
};
```
