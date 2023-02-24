# 1924. 2007년

## 문제 링크

https://www.acmicpc.net/problem/1924

## 문제 분류

: 수학, 구현

## 소요 시간

: 10분

## 풀이 방법

1. 365일 중 오늘이 며칠째인지 계산한다.
2. 해당 수를 7로 나눈 나머지를 이용해 요일을 반환한다.

## 풀이 코드

```js
const solution = (x, y) => {
  const months = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  let day = 0;

  // 입력받은 달까지 날짜 수를 더하기
  for (let i = 0; i < x; i++) {
    day += months[i];
  }

  // 위 값에 입력받은 날짜 더한 후 7로 나눈 나머지를 이용해 몇 요일인지 반환
  return days[(day + y) % 7];
};
```

## 코드 개선

자바스크립트의 Date 객체를 사용하면 더 쉽게 문제를 풀이할 수 있었다. 자바스크립트의 Date의 객체의 Month는 0부터 시작하므로
아래 코드의 date는 2007년 0월 1일을 나타낼 수 없어서 사실 2006년 12 31일로 출력되지만, getFullYear나 getDay로 함수를 사용하면
제대로 된 날짜를 출력할 수 있다.

```js
const solution = (x, y) => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const date = new Date(2007, x - 1, y);

  // getDay 메서드를 통해 요일을 숫자로 반환 0은 일요일, 1은 월요일을 나타낸다.
  return days[date.getDay() % 7];
};
```
