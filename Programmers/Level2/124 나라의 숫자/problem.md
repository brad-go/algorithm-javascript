# 124 나라의 숫자

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12899

## 문제 분류

: 수학, 구현

## 풀이 과정

문제 풀이의 핵심은 3진법이었다. 3진법에서 [0, 1, 2]만을 사용하고, 124나라에서는 [1, 2, 4]라는 숫자 3개만을 사용하는데, 십진법의 수를 3진법으로 변환하는 방식을
이용해서 문제를 풀이할 수 있었다.

1. 3진법으로 표현하기 위해 3으로 나눈 나머지를 담을 배열 array를 선언한다.
2. 입력 받은 수가 0보다 클 때까지 다음을 반복한다.
3. array에 3으로 나눈 나머지를 담는다.
4. 현재 수가 3으로 나누어진다면, 현재 수에서 -1을 빼준다. (3으로 나누어떨어진다면 몫이 1이 생기기 때문에 1을 빼준다)
5. 현재 수를 3으로 나눈 후 위 과정을 반복한다.
6. array배열에 담긴 변환된 수들을 반대로 뒤집고, 0을 모두 4로 변환해서 출력한다. (3진법은 { 1, 2, 0 }, 124나라는 { 1, 2, 4 }를 사용하기 때문에)

```js
const solution = (n) => {
  const array = [];

  let number = n;

  while (number > 0) {
    const rest = number % 3;

    array.push(rest);

    if (rest === 0) {
      number = number - 1;
    }

    number = Math.floor(number / 3);
  }

  return array.reverse().join("").replaceAll("0", "4");
};
```

## 코드 개선

```js
const solution = (n) => {
  if (n === 0) {
    return "";
  }

  return solution(Math.floor((n - 1) / 3)) + [1, 2, 4][(n - 1) % 3];
};
```
