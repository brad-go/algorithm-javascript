# 예상 대진표

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12985

## 문제 분류

: 재귀, 구현

## 풀이 과정

대진표를 반으로 나눠 두 개의 그룹으로 만들고 a, b가 같은 그룹에 속하는지를 n이 2가 될때까지 반복해서 몇 번째에 경기가 치뤄지는지 찾을 수 있었다.

1. n이 2라면 count를 반환한다. count는 n을 2를 밑으로 두었을 때, 지숫값부터 시작한다.
2. n을 반으로 나눈 값 half를 구한다.
3. a와 b가 half 보다 모두 작다면 half에 대해서 위 과정을 반복한다. 이 때 count를 하나 줄인다.
4. a와 b가 half 보다 모두 크다면 half에 대해서 a의 값을 a - half, b의 값을 b - half로 해서 위 과정을 반복한다. 이 때 count를 하나 줄인다.
5. a와 b가 서로 다른 그룹이라면 count를 반환한다.

## 풀이 코드

```js
const solution = (n, a, b) => {
  // count의 값은 Math.log2(n) 부터 시작한다. 가장 최악의 경우로 마지막까지 만나지 못했을 때
  return findMatchCount(n, a, b, Math.log2(n));
};

const findMatchCount = (n, a, b, count) => {
  // n을 반으로 나눠 두 개의 그룹으로 만들기
  const half = n / 2;

  // 같은 그룹에 속하면서 half보다 모두 작을 때
  if (a <= half && b <= half) {
    return solution(half, a, b, count - 1);
  }

  // 같은 그룹에 속하면서 half보다 모두 클 때
  // half 보다 크다면 다음 분기에서 a, b 모두 half보다 클 수 밖에 없으므로 제대로 된 판단이 불가능하다.
  // 그러므로 a와 b에서 half값을 빼준다.
  if (a > half && b > half) {
    return solution(half, a - half, b - half, count - 1);
  }

  // 서로 다른 그룹이라면 count를 반환한다.
  return count;
};
```

## 코드 개선

기존 코드와 같은 뢰직이지만 count를 매개변수로 받을 필요가 없었다. 값을 반환할 때 Math.log2() 함수를 통해 지숫값을 반환한다.

```js
const solution = (n, a, b) => {
  const half = n / 2;

  if (a <= half && b <= half) {
    return solution(half, a, b);
  }

  if (a > half && b > half) {
    return solution(half, a - half, b - half);
  }

  return Math.log2(n);
};
```

## 코드 개선 2

대진표에서 a와 b는 다음 라운드에 진출할 때마다 번호가 바뀌게 된다.
이때 a와 b가 서로 같다면 서로 맞붙게 되는 상황이 되는 걸 이용한 로직이다.

```js
const solution = (n, a, b) => {
  let answer = 0;

  while (a !== b) {
    a = Math.ceil(a / 2);
    b = Math.ceil(b / 2);
    answer++;
  }

  return answer;
};
```
