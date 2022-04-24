# 1로 만들기 - 1463

[문제 링크](https://www.acmicpc.net/problem/1463)

### 성능 요약

메모리: 128MB, 시간 0.15초

### 문제

정수 X에 사용할 수 있는 연산은 다음과 같이 세 가지 이다.

X가 3으로 나누어 떨어지면, 3으로 나눈다.
X가 2로 나누어 떨어지면, 2로 나눈다.
1을 뺀다.
정수 N이 주어졌을 때, 위와 같은 연산 세 개를 적절히 사용해서 1을 만들려고 한다. 연산을 사용하는 횟수의 최솟값을 출력하시오.

### 입력

첫째 줄에 1보다 크거나 같고, 106보다 작거나 같은 정수 N이 주어진다.

### 출력

첫째 줄에 연산을 하는 횟수의 최솟값을 출력한다.

### 예제 입력 1

```
2
```

### 예제 출력 1

```
1
```

### 예제 입력 2

```
10
```

### 예제 출력 2

```
3
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### Solution

```js
const input = Number(
  require("fs").readFileSync("./input2.txt").toString().trim()
);

function Solution(x) {
  const dp = new Array(x + 1).fill(0);

  for (let i = 2; i < x + 1; i++) {
    dp[i] = dp[i - 1] + 1;
    if (i % 3 === 0) dp[i] = Math.min(dp[i], dp[i / 3] + 1);
    if (i % 2 === 0) dp[i] = Math.min(dp[i], dp[i / 2] + 1);
  }

  console.log(dp[x]);
}

Solution(input);
```

나열해보면 다음과 같은 식을 구할 수 있다.

```js
dp[n] = dp[n - 1] + 1;
```

3이나 2로 나누어 떨어질 때는 다음과 같다.

```js
// 3으로 나누어 떨어질 때
dp[n] = Math.min(dp[n - 1] + 1, dp[n / 3] + 1);

// 2로 나누어 떨어질 때
dp[n] = Math.min(dp[n - 1] + 1, dp[n / 2] + 1);
```

그러나 아직 통과하지 못한 코드 중에 반례를 찾지 못한 게 있다.

```js
const input = Number(
  require("fs").readFileSync("./input2.txt").toString().trim()
);

function Solution(x) {
  const dp = new Array(x + 1).fill(0);

  for (let i = 2; i < x + 1; i++) {
    if (i % 3 === 0) dp[i] = Math.min(dp[i - 1] + 1, dp[i / 3] + 1);
    else if (i % 2 === 0) dp[i] = Math.min(dp[i - 1] + 1, dp[i / 2] + 1);
    else dp[i] = dp[i - 1] + 1;
  }

  console.log(dp[x]);
}

Solution(input);
```

분명 100까지는 답이 같게 나오는데, 이유가 뭘까... ㅠㅜ

</div>
</details>
