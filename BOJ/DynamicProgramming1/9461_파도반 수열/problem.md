# 파도반 수열 - 9461번

[문제 링크](https://www.acmicpc.net/problem/9461)

### 성능 요약

메모리: 128MB, 시간 1초

### 문제

![img](https://www.acmicpc.net/upload/images/pandovan.png)

위 그림과 같이 삼각형이 나선 모양으로 놓여져 있다. 첫 삼각형은 정삼각형으로 변의 길이는 1이다. 그 다음에는 다음과 같은 과정으로 정삼각형을 계속 추가한다. 나선에서 가장 긴 변의 길이를 k라 했을 때, 그 변에 길이가 k인 정삼각형을 추가한다.

파도반 수열 P(N)은 나선에 있는 정삼각형의 변의 길이이다. P(1)부터 P(10)까지 첫 10개 숫자는 1, 1, 1, 2, 2, 3, 4, 5, 7, 9이다.

N이 주어졌을 때, P(N)을 구하는 프로그램을 작성하시오.

### 입력

첫 번째 줄에 자연수 N이 주어진다. (1 ≤ N ≤ 1,000,000)

### 출력

첫째 줄에 테스트 케이스의 개수 T가 주어진다. 각 테스트 케이스는 한 줄로 이루어져 있고, N이 주어진다. (1 ≤ N ≤ 100)

### 제한

각 테스트 케이스마다 P(N)을 출력한다.

### 예제 입력

```
2
6
12
```

### 예제 출력

```
3
16
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

점화식만 찾으면 아주 쉬운 문제였다. 피보나치 수열과 비슷한 느낌이었다. 일단 규칙을 찾기 위해 수를 쭉 써내려 가보니까 두가지 식이 보였다.

```js
f(n) = f(n-2) + f(n-3)
```

```js
f(n) = f(n-1) + f(n-5)
```

나는 첫번째 점화식을 통해 문제를 해결했다. 상향식 풀이법으로 dp배열을 만들고 우선 0, 1, 2에 대해 값을 대입해주었다. 그리고 점화식을 그대로 적용해서 문제를 풀 수 있었다.

### Solution

```js
const [t, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

function Solution(input) {
  input.forEach((n) => {
    const dp = new Array(n + 1).fill(0);

    dp[0] = 0;
    dp[1] = 1;
    dp[2] = 1;

    for (let i = 3; i <= n; i++) {
      dp[i] = dp[i - 2] + dp[i - 3];
    }

    console.log(dp[n]);
  });
}

Solution(input);
```

</div>
</details>
