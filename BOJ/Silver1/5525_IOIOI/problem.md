# 5525. IOIOI

## 문제 링크

https://www.acmicpc.net/problem/5525

## 문제 분류

: 문자열

## 소요 시간

: 2시간

## 풀이 방법

반복문이나 스택을 이용하면 쉽게 풀 수 있을거라 생각했는데, 꽤 어려운 문제였다.

첫번째는 중첩 반복문을 이용해서 모든 문자열을 탐색하는 방법을 사용했는데, 50점을 맞았다.
두번째는 반복문을 이용하고 slice를 이용해 주어진 Pn과 비교해서 카운트하는 방식으로 풀이했는데, 50점을 맞았다.

100점을 맞으려면 실행 시간을 줄여야만 했다. 문제를 풀이하다보니 특별한 규칙을 찾을 수 있었다.

```
P(n)은 P(n - 1)이 2개, P(n - 2)이 3개, ... P(1)이 n개로 이루어진다.
```

예를 들어, 다음과 같다.

```
P(3) = IOIOIOI // P(2)가 두 개, P(1)이 3개
P(2) = IOIOI // P(1)이 세 개
P(1) = IOI
```

이 규칙을 활용하면 1,000,000이나 되는 문자열의 비교를 줄일 수 있다.

1. P(N)의 길이를 구한다.
2. M - P(N)의 길이 + 1까지 문자를 확인하면서 아래를 수행한다. (마지막으로 P(N)이 될 수 있는 길이까지만 탐색)
3. 현재 문자가 'O'라면 건너뛴다.
4. 현재 문자가 'I'라면 문자열이 'IOIOI...IOI'로 반복될 때까지 스택에 합친다.
5. 스택의 길이가 P(N)의 길이보다 길다면 스택에 문자열 P(N)이 들어있는 개수만큼 더한다.
6. 해당 길이만큼 건너뛰고 다시 탐색한다.

## 풀이 코드

```js
const solution = (N, M, S) => {
  // P(N)의 길이 구하기
  const P_LEN = N * 2 + 1;

  // 문자열 S에 들어있는 문자열 P(N)의 개수
  let count = 0;

  // 마지막으로 P(N)이 될 수 있는 길이까지 탐색
  for (let i = 0; i < M - P_LEN + 1; i++) {
    if (S[i] === "O") continue;

    let stack = "";
    let j = 0;

    // j가 증가하다보면 S[i + j]가 undefined가 나올 수 있으므로 체크
    // j의 길이가 문자열 S의 길이보다 작을 때까지
    while (S[i + j] && j < M) {
      // IOIOIO.. 의 순서대로 나오지 않는다면 탈출
      if (
        (j % 2 === 0 && S[i + j] === "O") ||
        (j % 2 === 1 && S[i + j] === "I")
      )
        break;

      // 스택에 더하기
      stack += S[i + j];
      j++;
    }

    // P(N)의 길이보다 작지만 IOI일 수 있다. 더하지 않도록 검사
    // 스택의 문자열이 P(N)보다 길거나 같다면 스택의 길이를 통해 P(N)이 몇개 들어있는지 구하기
    // 스택의 문자열이 몇 IOI인지 구한 후에 입력받은 N만큼 빼주고 1을 더해준다.
    // 해당값 - N에 1을 더한 값을 구하면 P(N)이 몇 개 들어있는지 구할 수 있다.
    count +=
      P_LEN <= stack.length ? Math.floor((stack.length - 1) / 2) - N + 1 : 0;

    // 해당 문자열 길이만큼 건너뛰기
    // 해당 문자열 길이동안 이미 P(N)이 얼마나 포함되었는지 세었기 때문에 확인할 필요가 없다.
    i += j - 1;
  }

  return count;
};
```

## 코드 개선

위와 같은 방식으로 작은 IOI가 몇개 들어있는지 판단하지만, 훨씬 간결하게 풀이할 수 있었다. IOI가 존재한다면 문자열을 2칸씩 뛰어넘고 다시 조건을 탐색하는 방식으로 문제를 풀이할 수 있다.

```js
const solution = (N, M, S) => {
  let answer = 0;
  // IOI 패턴의 개수. 즉 P(N)이 몇 N인지 나타내는 변수
  let count = 0;

  for (let i = 1; i < M - 1; i++) {
    // 현재문자를 기준으로 P(1)이라면
    if (S[i - 1] === "I" && S[i] === "O" && S[i + 1] === "I") {
      // count 증가
      count++;

      // 입력받은 N과 같다면
      if (count === N) {
        // count를 줄인다. 다음에 확인한 문자가 IOI라면 조건에 부합하기 때문에
        count--;
        // P(n)을 찾았으니 개수 증가
        answer++;
      }

      // 두개씩 문자열 건너뛰기
      i++;
    } else {
      count = 0;
    }
  }

  return answer;
};
```
