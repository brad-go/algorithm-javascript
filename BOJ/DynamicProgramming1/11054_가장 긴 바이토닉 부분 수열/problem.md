# 가장 긴 바이토닉 부분 수열 - 11054번

[문제 링크](https://www.acmicpc.net/problem/11054)

### 성능 요약

메모리: 256MB, 시간 1초

### 문제

수열 S가 어떤 수 Sk를 기준으로 S1 < S2 < ... Sk-1 < Sk > Sk+1 > ... SN-1 > SN을 만족한다면, 그 수열을 바이토닉 수열이라고 한다.

예를 들어, {10, 20, 30, 25, 20}과 {10, 20, 30, 40}, {50, 40, 25, 10} 은 바이토닉 수열이지만, {1, 2, 3, 2, 1, 2, 3, 2, 1}과 {10, 20, 30, 40, 20, 30} 은 바이토닉 수열이 아니다.

수열 A가 주어졌을 때, 그 수열의 부분 수열 중 바이토닉 수열이면서 가장 긴 수열의 길이를 구하는 프로그램을 작성하시오.

### 입력

첫째 줄에 수열 A의 크기 N이 주어지고, 둘째 줄에는 수열 A를 이루고 있는 Ai가 주어진다. (1 ≤ N ≤ 1,000, 1 ≤ Ai ≤ 1,000)

### 출력

첫째 줄에 수열 A의 부분 수열 중에서 가장 긴 바이토닉 수열의 길이를 출력한다.

### 예제 입력

```
10
1 5 2 1 4 3 4 5 2 1
```

### 예제 출력

```
7
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

이전에 푼 가장 긴 증가하는 부분 수열 문제와 굉장히 유사하지만 조금 더 어려운 문제였다. 그 문제를 이해하는데 한참 걸려서 생각한게 도움이 되었다.

### 문제 해결 아이디어

풀이 아이디어는 생각보다 간단하다. 왼쪽부터 오른쪽으로 증가하는 가장 긴 부분 수열을 구하고, 반대로 오른쪽부터 왼쪽으로 증가하는 가장 긴 부분 수열을 구한 후 더해주면 된다.
오른쪽부터 왼쪽으로 증가하는 가장 긴 부분 수열은 가장 긴 감소하는 부분 수열이라고 볼 수 있겠다.

### 풀이

우선 증가하는 부분 수열을 담을 배열과, 감소하는 부분 수열을 담을 배열 두가지 dp배열을 생성하고 1로 채워준다.

```js
const increaseDP = new Array(n).fill(1);
const decreaseDP = new Array(n).fill(1);
```

반복문을 통해 증가하는 부분 수열에 대한 배열을 채워준다.

```js
for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[i] > arr[j])
      increaseDP[i] = Math.max(increaseDP[i], increaseDP[j] + 1);
  }
}
```

반복문을 통해 감소하는 부분 수열에 대한 배열을 채워준다. 현재 인덱스와 이후 인덱스를 비교하면서 현재 인덱스의 값이 비교하는 인덱스의 값보다 큰 경우, 현재 dp인덱스와 비교하는 dp 인덱스 + 1을 비교하여 큰 값으로 dp인덱스를 저장해준다.

```js
for (let i = n - 2; i > 0; i--) {
  for (let j = i + 1; j < n; j++) {
    if (arr[i] > arr[j])
      decreaseDP[i] = Math.max(decreaseDP[i], decreaseDP[j] + 1);
  }
}
```

둘을 더해주는데, 겹치는 부분이 생기므로 1을 빼준다. 그리고 그 중 최댓값을 출력해준다.

```js
const dp = increaseDP.map((item, idx) => item + decreaseDP[idx] - 1);
console.log(Math.max(...dp));
```

### 코드

```js
const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n, arr) {
  const increaseDP = new Array(n).fill(1);
  const decreaseDP = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j])
        increaseDP[i] = Math.max(increaseDP[i], increaseDP[j] + 1);
    }
  }

  for (let i = n - 2; i > 0; i--) {
    for (let j = i + 1; j < n; j++) {
      if (arr[i] > arr[j])
        decreaseDP[i] = Math.max(decreaseDP[i], decreaseDP[j] + 1);
    }
  }

  const dp = increaseDP.map((item, idx) => item + decreaseDP[idx] - 1);
  console.log(Math.max(...dp));
}

Solution(n, input);
```

### 다른 풀이

```js
function Solution(n, arr) {
  const [increaseDP, decreaseDP] = Array.from(Array(2), () => Array(n).fill(1));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      if (arr[i] > arr[j])
        increaseDP[i] = Math.max(increaseDP[i], increaseDP[j] + 1);
      if (arr[n - 1 - i] > arr[n - 1 - i + j])
        decreaseDP[n - 1 - i] = Math.max(
          decreaseDP[n - 1 - i],
          decreaseDP[n - 1 - i + j] + 1
        );
    }
  }

  const dp = increaseDP.map((item, idx) => item + decreaseDP[idx] - 1);
  console.log(Math.max(...dp));
}

Solution(n, input);
```

코드가 더 짧지만 이해하기는 위 코드가 더 쉬운 것 같다.

</div>
</details>
