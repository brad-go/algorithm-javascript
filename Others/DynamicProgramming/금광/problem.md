# 금광

[문제 링크](https://www.youtube.com/watch?v=5Lu34WIx2Us)

### 성능 요약

메모리: 128MB, 시간: 1초

### 문제

크기가 n x m인 금광이 있다. 금광은 1 x 1 크기의 칸으로 나누어져 있으며, 각 칸은 특정한 크기의 금이 들어있다.

채굴자는 첫 번째 열부터 출발하여 금을 캐기 시작한다. 맨 처음에는 첫 번째 열의 어느 행에서든 출발할 수 있다. 이후에 m - 1번에 걸쳐서 매번 오른쪽 위, 오른쪽, 오른쪽 아래 3가지 중 하나의 위치로 이동해야 한다. 결과적으로 채굴자가 얻을 수 있는 금의 최대 크기를 출력하는 프로그램을 작성하시오.

| 1열   | 2열   | 3열   | 4열   |
| ----- | ----- | ----- | ----- |
| 1     | 3     | 3     | 2     |
| **2** | 1     | 4     | 1     |
| 0     | **6** | **4** | **7** |

-> 얻을 수 있는 금의 최대 크기: 19

### 입력

첫째 줄에 테스트 케이스 T가 입력된다 (1 <= T <= 1000)

매 테스트 케이스 첫째 줄에 n과 m이 공백으로 구분되어 입력된다. (1 <= n, m <= 20) 둘째 줄에 n x m개의 위치에 매장된 금의 개수가 공백으로 구분되어 입력된다. (1 <= 각 위치에 매장된 금의 개수 <= 100)

### 출력

테스트 케이스마다 채굴자가 얻을 수 있는 금의 최대 크기를 출력한다. 각 테스트 케이스는 줄 바꿈을 이용해 구분한다.

### 예제 입력

```
2
3 4
1 3 3 2 2 1 4 1 0 6 4 7
4 4
1 3 1 5 2 2 4 1 5 0 2 3 0 6 1 2
```

### 예제 출력

```
19
16
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### Solution 1

```js
const [t, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(t, input) {
  for (let i = 0; i < t; i++) {
    const [n, m] = input
      .shift()
      .split(" ")
      .map((v) => +v);
    const golds = input
      .shift()
      .split(" ")
      .map((v) => +v);

    // 각 금광의 위치에 맞게 골드들을 채워줌
    const goldMine = new Array(n).fill(0);

    for (let j = 0; j < n; j++) {
      goldMine[j] = [];
      for (let k = j * 4; k < j * 4 + 4; k++) {
        goldMine[j].push(golds[k]);
      }
    }

    const dp = Array.from(Array(n), () => Array(m).fill(0));

    // 첫번재 열을 채워줌
    for (let j = 0; j < n; j++) {
      dp[j][0] = goldMine[j][0];
    }

    for (let j = 1; j < m; j++) {
      for (let k = 0; k < n; k++) {
        let top = 0;
        let bottom = 0;

        if (k - 1 >= 0) top = dp[k - 1][j - 1] || 0;
        if (k + 1 < n) bottom = dp[k + 1][j - 1] || 0;

        const max = Math.max(top, dp[k][j - 1] || 0, bottom);
        dp[k][j] = max + goldMine[k][j];
      }
    }

    let max = dp[0][m - 1];
    for (let j = 1; j < n; j++) {
      if (max < dp[j][m - 1]) max = dp[j][m - 1];
    }
    console.log(max);
  }
}

Solution(t, input);
```

드디어 점화식을 제대로 세우고 내 힘으로 다이나믹 프로그래밍 문제를 풀 수 있었다.

- 각각의 테스트 케이스에 맞춰 n, m, golds를 입력받는다.
- goldMine이라는 골드들을 담은 금광을 나타내는 이차원 배열을 생성한다.
- 각 최적의 해를 담을 dp 배열도 2차원 배열로 생성한다.

- 핵심은 다음과 같다.

1. **이전 열의 왼쪽 위, 왼쪽, 왼쪽 아래 중 가장 큰 수**를 구한다.
2. 조회할 때마다 이전 열의 인덱스가 비어있는지 체크한다.
3. 구한 큰 수와 현재 금광 인덱스의 금의 크기를 더해서 dp배열의 인덱스를 채운다.
4. **반복문을 진행할 때 열 기준으로 먼저 진**행할 수 있도록 한다!!

- 그리고 가장 큰 수를 출력한다.

#### 점화식

```js
dp[i][j] =
  goldMine[i][j] + Math.max(dp[i - 1][j - 1], dp[i][j - 1], dp[i + 1][j - 1]);
```

### Solution 2

```js
function Solution(t, input) {
  for (let tc = 0; tc < t; tc++) {
    const [n, m] = input
      .shift()
      .split(" ")
      .map((v) => +v);
    const golds = input
      .shift()
      .split(" ")
      .map((v) => +v);

    const dp = new Array(n);
    for (let i = 0; i < n; i++) {
      dp[i] = new Array(m).fill().map((_, idx) => golds[idx + i * 4]);
    }

    for (let i = 1; i < m; i++) {
      for (let j = 0; j < n; j++) {
        let leftUp = 0;
        let leftDown = 0;
        let left = dp[j][i - 1];

        if (j !== 0) leftUp = dp[j - 1][i - 1];
        if (j !== n - 1) leftDown = dp[j + 1][i - 1];

        dp[j][i] = dp[j][i] + Math.max(leftUp, left, leftDown);
      }
    }

    let result = 0;

    for (let i = 0; i < n; i++) {
      result = Math.max(result, dp[i][m - 1]);
    }
    console.log(result);
  }
}

Solution(t, input);
```

같은 풀이 방식인데 정답 코드를 보니 조금 더 깔끔하다.
dp배열 자체에 금광의 각 위치에 해당하는 골드들을 미리 대입해 두어서 따로 금광 배열을 생성할 필요가 없었다.

</div>
</details>
