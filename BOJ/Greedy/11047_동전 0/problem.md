# 동전 0 - 11047

[문제 링크](https://www.acmicpc.net/problem/11047)

## 문제 풀이

처음에 문제의 입력을 제대로 파악하지 못해서 다음과 같이 풀이했다. 동전의 개수가 2개 이상이라면, 나머지 동전들은 첫 동전의 배수로 이루어진다고 쓰여있었는데,

```bash
2 4
2
3
```

위의 테스트 케이스를 통과하기 코드를 짜다보니 저렇게 짜게 되었다.

### 풀이 설명

1. 가장 큰 동전 부터 확인하면서 K값보다 작은 동전 찾기
2. 작은 동전을 찾았다면 K로 나눈 몫 구하기
3. K로 나눈 나머지 구하기
4. 나머지가 0이 아니라면, 현재 동전보다 더 가치가 낮은 동전들로 나눠지는 확인하기
5. 나눠지지 않는다면 더 작은 동전으로 2번부터 다시 시작
6. 나눠진다면 정답에 현재 몫을 더해주고, K를 나머지값으로 업데이트 해주기
7. K가 0이 될때까지 2번부터 반복
8. 정답 출력

### 전체 코드

```js
const solution = (n, k, coins) => {
  let answer = 0;
  let idx = n - 1;

  while (k !== 0) {
    if (k - coins[idx] < 0) {
      idx--;
      continue;
    }

    const quotient = Math.floor(k / coins[idx]);
    const rest = k % coins[idx];

    let canDevided = false;

    if (rest !== 0) {
      for (let i = 0; i < idx; i++) {
        if (rest % coins[i] === 0) canDevided = true;
      }

      if (!canDevided) {
        idx--;
        continue;
      }
    }

    answer += quotient;
    k = rest;
  }

  console.log(answer);
};

solution(N, K, COINS);
```

### 코드 개선

문제 풀이에 맞춰 코드를 조금 더 개선하면 다음과 같다.

```js
const input = require("fs")
  .readFileSync("dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, K] = input[0].split(" ").map(Number);
const COINS = input.slice(1).map(Number);

const solution = (N, K, COINS) => {
  let answer = 0;

  for (let i = N - 1; i >= 0; i--) {
    if (K < COINS[i]) continue;

    answer += Math.floor(K / COINS[i]);
    K %= COINS[i];

    if (K === 0) break;
  }

  console.log(answer);
};

solution(N, K, COINS);
```
