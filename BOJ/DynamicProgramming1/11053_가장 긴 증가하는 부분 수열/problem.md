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

### Solution

가장 긴 증가하는 부분 수열이란 것부터 제대로 이해가 필요했다. 수를 하나씩 뽑아내 수열로 만들었을 때,
오름차순으로 이루어진 수열이며 가장 긴 수열이다.

우선 길이가 n인 dp배열을 생성해주고, 1로 채워준다.

```js
const dp = new Array(n).fill(1);
```

예를 몇가지 수열들과 그 수열의 각 숫자까지의 해당하는 가장 긴 수열을 표로 그려본다면 다음과 같다.

| NUM | 10  | 20  | 10  | 30  | 20  | 50  |
| --- | --- | --- | --- | --- | --- | --- |
| LIS | 1   | 2   | 1   | 3   | 2   | 4   |

| NUM | 1   | 2   | 8   | 2   | 4   | 8   |
| --- | --- | --- | --- | --- | --- | --- |
| LIS | 1   | 2   | 3   | 2   | 3   | 4   |

| NUM | 40  | 1   | 5   | 10  | 90  |
| --- | --- | --- | --- | --- | --- |
| LIS | 1   | 1   | 2   | 3   | 4   |

처음에는 dp 배열에 각 수들이 저장되 나가고 이용되는 방식으로 풀어야 한다고 생각했고, 그래서 가장 긴 수열을 표현할 dp 배열의 인덱스 값이 늘어났다가 줄어드는 것이 이해가 되지 않았다.

이 문제를 풀기 위한 원리를 다음과 같다.

입력받은 수열의 길이만큼 반복문을 돌아주는데, 첫번째는 dp 배열을 1로 채웠고, 비교할 필요가 없으므로 1부터 시작한다.

```js
for (let i = 1; i < n; i++) {
  // ...
}
```

그리고 각 반복문을 돌때마다, 현재값과 `values` 배열을 생성해준다.

```js
for (let i = 1; i < n; i++) {
  const cur = arr[i];
  const values = [1];

  // ...
}
```

이 `values`의 역할이 조금 이해하기 어려울 수 있는데, 해**당 수를 포함한 가장 긴 수열의 길이를 담을 배열이라고 생각하면 될 것 같다**.

그리고 한 번 반복이 될때마다 내부에서 한 번 더 반복하는데, i까지 반복한다. 즉, 그 수 까지만 반복한다. 그리고 현재 수(arr[i])와 비교할 이전 수(arr[j]; prev)를 선언해준다. 결과적으로 **현재 수 전까지의 수들과 크기를 비교해줘야 한다**.

```js
for (let i = 1; i < n; i++) {
  const cur = arr[i];
  const values = [1];

  for (let j = 0; j < i; j++) {
    const prev = arr[j];

    // 현재 수와 이전 수들을 비교해준다.
    if (cur > prev) values.push(dp[j] + 1);
  }
}
```

비교하는 부분이 이해가 잘되지 않을 수 있다.

- 이미 dp배열은 1로 가득 차 있다는 것을 잊지 말자.
- j가 i보다 작다는 것도 기억하자

그리고 현재 수가 비교하는 수 보다 클때만, values 배열에 `dp[j] + 1`이란 수를 넣어줌으로써 해당 수를 포함한 가장 긴 수열을 나타낼 수 있다.

그리고 이 중에서 가장 큰 수를 dp배열의 현재 인덱스에 넣어준다.

```js
for (let i = 1; i < n; i++) {
  //...
  dp[i] = Math.max(...values);
}
```

이렇게 넣어주면 연속된 수였던 인덱스라면 크기 비교를 통해 증가되어 있을 것이다. 그리고 이 값을 가지고와서 values의 각 값을 증가시킨다. 전체 코드는 다음과 같다.

#### 코드

```js
const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n, arr) {
  const dp = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    const cur = arr[i];
    const values = [1];

    for (let j = 0; j < i; j++) {
      const prev = arr[j];

      if (cur > prev) values.push(dp[j] + 1);
    }

    dp[i] = Math.max(...values);
  }
  console.log(Math.max(...dp));
}

Solution(n, input);
```

</div>
</details>
