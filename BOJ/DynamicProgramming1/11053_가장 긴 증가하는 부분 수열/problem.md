# 가장 긴 증가하는 부분 수열 - 11053번

[문제 링크](https://www.acmicpc.net/problem/11053)

### 성능 요약

메모리: 256MB, 시간 1초

### 문제

수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열을 구하는 프로그램을 작성하시오.

예를 들어, 수열 A = {10, 20, 10, 30, 20, 50} 인 경우에 가장 긴 증가하는 부분 수열은 A = {10, 20, 10, 30, 20, 50} 이고, 길이는 4이다.

### 입력

첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000)이 주어진다.

둘째 줄에는 수열 A를 이루고 있는 Ai가 주어진다. (1 ≤ Ai ≤ 1,000)

### 출력

첫째 줄에 수열 A의 가장 긴 증가하는 부분 수열의 길이를 출력한다.

### 예제 입력

```
6
10 20 10 30 20 50
```

### 예제 출력

```
4
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### Fail

```js
const [n, ...input] = require("fs")
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n, arr) {
  const dp = Array.from(Array(n), () => []);
  dp[0][0] = arr[0];

  for (let i = 1; i < n; i++) {
    const prev = dp[i - 1];
    dp[i] = prev;

    // 마지막 두 번째 수보다 크고, 마지막 수보다 작다면
    if (arr[i] > prev[prev.length - 2] && arr[i] < prev[prev.length - 1]) {
      dp[i] = prev
        .filter((num) => num !== prev[prev.length - 1])
        .concat(arr[i]);
    }

    // 가진 수들보다 크다면
    if (arr[i] > prev[prev.length - 1]) dp[i] = prev.concat(arr[i]);

    console.log(dp);
  }

  console.log(dp[n - 1].length);
}

Solution(n, input);
```

중간에 가장 큰 수가 오게되면 실패하는 첫번째 문제 풀이의 반례를 찾고 고치기 위해 위와 같이 코드를 짰다.

처음에는 현재 수보다 이전 것보다 크다면 dp 배열에 넣어주고, 아니라면 dp 배열은 이전과 같은 방식으로 해서 실패했었다.

이번에는 n만큼 반복을하고 각각 배열을 만들어서 dp[i]에 넣어주는 방식인 2차원 배열을 이용한 풀이에 도전했다. 하지만 이 방식은 처음에 가장 작은수가 오지 않으면 실패한다.

</div>
</details>
