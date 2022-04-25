# 쉬운 계단 수 - 10844

[문제 링크](https://www.acmicpc.net/problem/10844)

### 성능 요약

메모리: 256MB, 시간 1초

### 문제

45656이란 수를 보자.

이 수는 인접한 모든 자리의 차이가 1이다. 이런 수를 계단 수라고 한다.

N이 주어질 때, 길이가 N인 계단 수가 총 몇 개 있는지 구해보자. 0으로 시작하는 수는 계단수가 아니다.

### 입력

첫째 줄에 N이 주어진다. N은 1보다 크거나 같고, 100보다 작거나 같은 자연수이다.

### 출력

첫째 줄에 정답을 1,000,000,000으로 나눈 나머지를 출력한다.

### 예제 입력 1

```
1
```

### 예제 출력 1

```
9
```

### 예제 입력 2

```
2
```

### 예제 출력 2

```
17
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### Fail

```js
const input = Number(
  require("fs").readFileSync("./input2.txt").toString().trim()
);

function Solution(n) {
  const BILLION = 1000000000;
  const dp = new Array(n + 1).fill(0);
  dp[1] = 9;

  for (let i = 2; i < n + 1; i++) {
    dp[i] = dp[i - 1] * 2 - (i - 1);
  }

  console.log(dp[n] % BILLION);
}

Solution(input);
```

n이 4일 때까지 구해보니 `이전 해 * 2 - i`라는 규칙이 보여서 이를 토대로 문제를 풀려고 했다.
문제 제목도 쉬운 계단 수여서 쉽게 풀 수 있는거구나~ 하고 했는데, 아무리 해도 틀렸다고 나왔다.

### Solution

</div>
</details>
