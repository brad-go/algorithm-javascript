# 1로 만들기

[문제 링크](https://www.youtube.com/watch?v=5Lu34WIx2Us)

### 성능 요약

메모리: 128MB, 시간: 1초

### 문제

정수 X가 주어졌을 때, 정수 X에 사용할 수 있는 연산은 다음과 같이 4가지다.

1. X가 5로 나누어 떨어지면, 5로 나눈다.
2. X가 3으로 나누어 떨어지면, 3으로 나눈다.
3. X가 2로 나누어 떨어지면, 2로 나눈다.
4. X에서 1을 뺀다.

정수 X가 주어졌을 때, 연산 4개를 적절히 사용해서 값을 1로 만들고자 한다. 연산을 사용하는 횟수의 최솟값을 출력한다. 예를들어 26이면 다음과 같이 계산해서 3번의 연산이 최솟값이다.

26 -> 25 -> 5 -> 1

### 입력

첫째 줄에 정수 X가 주어진다. (1 <= X <= 30,000)

### 출력

첫째 줄에 연산을 하는 횟수의 최솟값을 출력한다.

### 예제 입력

```
26
```

### 예제 출력

```
3
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### 기존 풀이

```js
const n = Number(require("fs").readFileSync("./input.txt").toString().trim());

function Solution(n) {
  let count = 0;
  while (n !== 1) {
    if (n % 5 === 1) {
      n -= 1;
      count++;
    } else if (n % 5 === 0) {
      n /= 5;
      count++;
    } else if (n % 3 === 0) {
      n /= 3;
      count++;
    } else if (n % 2 === 0) {
      n /= 2;
      count++;
    }
  }
  console.log(count);
}

Solution(n);
```

점화식을 어떻게 세워야 할지 잘 감이 오지 않았다. 그래서 최적의 경우의 수를 찾기 위해
if, else 문을 통해 위와 같은 풀이를 했다.

### 상향식 풀이

```js
const n = Number(require("fs").readFileSync("./input.txt").toString().trim());

// 상향식 풀이
function Solution(n) {
  const dp = new Array(n).fill(0);

  for (let i = 2; i < n + 1; i++) {
    dp[i] = dp[i - 1] + 1;

    if (i % 2 === 0) dp[i] = Math.min(dp[i], dp[i / 2] + 1);
    if (i % 3 === 0) dp[i] = Math.min(dp[i], dp[i / 3] + 1);
    if (i % 5 === 0) dp[i] = Math.min(dp[i], dp[i / 5] + 1);
  }

  console.log(dp);
}

Solution(n);
```

- n까지 배열을 dp배열을 만들어준다.
- 1부터 dp 배열을 채워나가는데, 1은 연산이 필요없으므로 0이다.
- dp 배열에는 각 수를 1로 만드는 최적의 연산 횟수가 채워진다.
- 매 상황마다 각 부분의 문제를 해결한 값을 이용할 수 있으므로 다이나믹 프로그래밍 기법을 이용할 수 있다.

#### 점화식

$$
a_i = min(a_i-1, a_i/2, a_i/3, a_i/5) + 1
$$

1을 빼는 연산을 제외하고는 해당 수로 나누어 떨어질 때에 한해 점화식을 적용해야 한다.

</div>
</details>
