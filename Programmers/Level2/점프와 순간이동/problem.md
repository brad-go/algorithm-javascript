# 점프와 순간이동

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12980

## 문제 분류

: 다이나믹 프로그래밍

## 풀이 과정

아이언 슈트를 통해 0부터 N까지 이동하는데, 건전지 사용량의 최솟값을 구하는 문제였다.
이동하는 방법은 두 가지다.

- 건전지를 소모해 K만큼 이동한다.
- 건전지를 소모하지 않고 현재까지 이동한 거리 \* 2만큼 순간이동한다.

이 문제를 읽고나서 그리디 아니면 dp로 풀이해야겠다고 생각했다. 순간이동을 하는 경우 현재 거리 / 2의 값을 그대로 사용하므로
dp로 풀이하기로 결정하고 bottom-up 방식으로 다음과 같이 코드를 작성했다.

```js
const solution = (N) => {
  const dp = new Array(N + 1).fill(0);
  dp[1] = 1;

  for (let i = 2; i < dp.length; i++) {
    dp[i] = Number.isInteger(i / 2) ? dp[i / 2] : dp[i - 1] + 1;
  }

  return dp[N];
};
```

정말 간단하게 코드를 작성할 수 있었다.

1. 현재 이동거리 나누기 2가 정수라면 해당 값을 현재 위치까지 이동하는 배터리 소모량으로 최신화한다.
2. 현재 이동거리 나누기 2가 정수가 아니라면 이전 거리까지 배터리 소모량에 더하기 1을 해준다.

그러나 이 문제의 효율성 테스트에서 모두 통과하지 못했다. dp로 풀었는데, 효율성에 통과하지 못하다니 접근을 잘못했나 싶었다.

## 풀이 코드

결과적으로 이 문제는 top-down 방식으로 해결할 수 있었다.

1. N이 0보다 클 때까지 아래를 반복한다.
2. N / 2가 정수라면 N을 절반으로 나눈다.
3. N / 2가 정수가 아니라면 N / 2보다 작은 가장 큰 정수로 N을 최신화하고, 배터리 사용량을 1 증가시킨다.

```js
const solution = (N) => {
  let batteryUsage = 0;

  while (N > 0) {
    const half = N / 2;

    if (Number.isInteger(half)) {
      N = half;
    } else {
      N = Math.floor(half);
      batteryUsage++;
    }
  }

  return batteryUsage;
};
```

## 코드 개선

위 코드에서 불필요한 변수 선언과 할당을 줄이고, 조건문을 없앤 로직이다.

```js
const solution = (N) => {
  let batteryUsage = 0;

  while (N > 0) {
    batteryUsage += N % 2;
    N = Math.floor(N / 2);
  }

  return batteryUsage;
};
```

## 코드 개선

N을 이진법으로 바꾼 후에 1의 개수를 반환하는 방식의 코드이다.

어떠한 수를 2로 나누고, 그 몫을 또 2로 계속해서 나누면서 나오는 나머지들의 합은
어떠한 수를 이진수로 변환한 1의 개수와 같다는 것을 이용하여 해결한 방법이다.

```js
const solution = (N) => {
  return N.toString(2).match(/1/g).length;
};
```
