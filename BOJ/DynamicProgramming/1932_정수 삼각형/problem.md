# 정수 삼각형 - 1932번

[문제 링크](https://www.acmicpc.net/problem/1932)

### 성능 요약

메모리: 128MB, 시간 2초

### 문제

```
        7
      3   8
    8   1   0
  2   7   4   4
4   5   2   6   5
```

위 그림은 크기가 5인 정수 삼각형의 한 모습이다.

맨 위층 7부터 시작해서 아래에 있는 수 중 하나를 선택하여 아래층으로 내려올 때, 이제까지 선택된 수의 합이 최대가 되는 경로를 구하는 프로그램을 작성하라. 아래층에 있는 수는 현재 층에서 선택된 수의 대각선 왼쪽 또는 대각선 오른쪽에 있는 것 중에서만 선택할 수 있다.

삼각형의 크기는 1 이상 500 이하이다. 삼각형을 이루고 있는 각 수는 모두 정수이며, 범위는 0 이상 9999 이하이다.

### 입력

첫째 줄에 삼각형의 크기 n(1 ≤ n ≤ 500)이 주어지고, 둘째 줄부터 n+1번째 줄까지 정수 삼각형이 주어진다.

### 출력

첫째 줄에 합이 최대가 되는 경로에 있는 수의 합을 출력한다.

### 예제 입력

```
5
7
3 8
8 1 0
2 7 4 4
4 5 2 6 5
```

### 예제 출력

```
30
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### Solution

```js
const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(n, input) {
  const dp = new Array(n);

  for (let i = 0; i < n; i++) {
    dp[i] = input[i].split(" ").map((v) => +v);
  }

  for (let i = 1; i < n; i++) {
    const len = dp[i].length;

    for (let j = 0; j < len; j++) {
      if (j === 0) dp[i][j] += dp[i - 1][j];
      if (j === len - 1) dp[i][j] += dp[i - 1][j - 1];

      if (1 <= j && j < len - 1) {
        dp[i][j] += Math.max(dp[i - 1][j - 1], dp[i - 1][j]);
      }
    }
  }

  const answer = Math.max(...dp[dp.length - 1]);
  console.log(answer);
}

Solution(n, input);
```

입력을 받아 2차원 배열로 dp 배열의 인덱스를 채워주었다. 손으로 써내려가면서 문제를 각 인덱스마다 합을 구해보았다. 왼쪽 대각선 및 오른쪽 대각선만 선택이 가능하다는 것이 트리 구조를 연상케 했다. 각 노드들은 자신의 직계 자식들에게 영향을 미칠 수 있었다.
삼각형 테두리 해당하는 `dp[i][0]`들은 자신의 윗부분에 해당하는 인덱스와 자신만을 더하면됐다.

```js
if (j === 0) dp[i][j] += dp[i - 1][j];
```

그러나 이대로 돌려보니 맨 왼쪽만 값이 들어갔다. 그렇다. 오른쪽 테두리에 위치한 인덱스들은 자신의 윗 인덱스에 왼쪽에 위치한 인덱스의 값과 자신을 더해야했다.

```js
if (j === dp[i].length - 1) dp[i][j] += dp[i - 1][j - 1];
```

내부에 위치한 인덱스들은 각각 두가지 수가 들어올 수 있었다. 왼쪽 위와 오른쪽 위(이차원 배열에서는 바로 위) 인덱스와 자신을 더한 값 중 큰 값을 넣어줘야 했다.

```js
if (j >= 1 && dp[i].length - 1 > j) {
  dp[i][j] += Math.max(dp[i - 1][j - 1], dp[i - 1][j]);
}
```

### Solution 2

```js
function Solution(n, input) {
  const dp = new Array(n);

  for (let i = 0; i < n; i++) {
    dp[i] = input[i].split(" ").map((v) => +v);
  }

  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[i][j] += Math.max(dp[i + 1][j], dp[i + 1][j + 1]);
    }
  }

  console.log(dp[0][0]);
}

Solution(n, input);
```

혹시 더 좋은 코드가 있을까 찾아보았는데, 이 코드가 더 깔끔하고 간결한 것 같다. 위에서 아래가 아니라 아래에서 위로 더해 나가는 방식인데, 이렇게 하게 되면 따로 조건 분기문이 필요하지 않고 간단해진다. 마지막에 출력도 다른 연산이 필요하지 않게 된다.
시간이나 메모리에서 효율이 조금이나마 차이가 날 것 같았는데, 오히려 시간은 원래 코드가 빨랐고, 메모리 측면에서 아주 작은 이점이 있었다.
하지만 둘다 정말 얼마 차이가 나지 않고 더해져 나가는 과정을 보여줄 필요가 있다면 원래 코드를 아니라면 이 코드를 사용하는게 좋을 것 같다.

#### 참고

[현수 세상](https://leylaoriduck.tistory.com/530)

</div>
</details>
