# 신나는 함수 실행 - 9184번

[문제 링크](https://www.acmicpc.net/problem/9184)

### 성능 요약

메모리: 128MB, 시간 0.25초

### 문제

재귀 호출만 생각하면 신이 난다! 아닌가요?

다음과 같은 재귀함수 w(a, b, c)가 있다.

```
if a <= 0 or b <= 0 or c <= 0, then w(a, b, c) returns:
    1

if a > 20 or b > 20 or c > 20, then w(a, b, c) returns:
    w(20, 20, 20)

if a < b and b < c, then w(a, b, c) returns:
    w(a, b, c-1) + w(a, b-1, c-1) - w(a, b-1, c)

otherwise it returns:
    w(a-1, b, c) + w(a-1, b-1, c) + w(a-1, b, c-1) - w(a-1, b-1, c-1)
```

위의 함수를 구현하는 것은 매우 쉽다. 하지만, 그대로 구현하면 값을 구하는데 매우 오랜 시간이 걸린다. (예를 들면, a=15, b=15, c=15)

a, b, c가 주어졌을 때, w(a, b, c)를 출력하는 프로그램을 작성하시오.

### 입력

입력은 세 정수 a, b, c로 이루어져 있으며, 한 줄에 하나씩 주어진다. 입력의 마지막은 -1 -1 -1로 나타내며, 세 정수가 모두 -1인 경우는 입력의 마지막을 제외하면 없다.

### 출력

입력으로 주어진 각각의 a, b, c에 대해서, w(a, b, c)를 출력한다.

### 제한

-50 <= a, b, c <= 50

### 예제 입력

```
1 1 1
2 2 2
10 4 6
50 50 50
-1 7 18
-1 -1 -1
```

### 예제 출력

```
w(1, 1, 1) = 2
w(2, 2, 2) = 4
w(10, 4, 6) = 523
w(50, 50, 50) = 1048576
w(-1, 7, 18) = 1
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### Solution

```js
const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(input) {
  input.pop();

  const dp = new Array(21);
  for (let i = 0; i < 21; i++) {
    dp[i] = new Array(21);
    for (let j = 0; j < 21; j++) {
      dp[i][j] = new Array(21).fill(0);
    }
  }

  const w = (a, b, c) => {
    if (a <= 0 || b <= 0 || c <= 0) return 1;
    if (a > 20 || b > 20 || c > 20) return (dp[20][20][20] = w(20, 20, 20));

    if (dp[a][b][c]) return dp[a][b][c];

    if (a < b && b < c) {
      return (dp[a][b][c] =
        w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c));
    }

    return (dp[a][b][c] =
      w(a - 1, b, c) +
      w(a - 1, b - 1, c) +
      w(a - 1, b, c - 1) -
      w(a - 1, b - 1, c - 1));
  };

  for (line of input) {
    const [a, b, c] = line.split(" ").map((v) => +v);

    console.log(`w(${a}, ${b}, ${c}) = ${w(a, b, c)}`);
  }
}

Solution(input);
```

생각보다 쉽게 풀 수 있었다. 문제에서 제시한 코드를 그대로 사용할 수 있었는데 반환값을 전부 각 a,b,c에 맞는 dp배열의 인덱스를 반환해주면서 저장해준다.

핵심은 다음과 같다.

#### 1. 3차원 배열 생성하기

```js
const dp = new Array(21);
for (let i = 0; i < 21; i++) {
  dp[i] = new Array(21);
  for (let j = 0; j < 21; j++) {
    dp[i][j] = new Array(21).fill(0);
  }
}
```

문제를 해결하기 위해 나는 3차원의 dp배열을 생성했다. 이를 통해 각각 a, b, c에 경우에 따른 해를 집어넣어줄 것이다.

#### 2. dp 배열 반환하기

```js
if (a <= 0 || b <= 0 || c <= 0) return 1;
if (a > 20 || b > 20 || c > 20) return w(20, 20, 20);
if (a < b && b < c) {
  return (dp[a][b][c] = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c));
}

return (dp[a][b][c] =
  w(a - 1, b, c) +
  w(a - 1, b - 1, c) +
  w(a - 1, b, c - 1) -
  w(a - 1, b - 1, c - 1));
```

a, b, c의 조건에 따라 dp배열을 채우며 반환한다. 피보나치 수열에서 문제를 해결한 방법과 동일하게 하향식 방식으로 문제를 풀 수 있다.
0보다 같거나 작고 20보다 크다면 dp 배열을 반환할 필요가 없고 1을 반환하거나 식을 다시 대입한다.

#### 3. 핵심 풀이 코드

```js
if (dp[a][b][c]) return dp[a][b][c];
```

이 문제의 핵심 풀이 코드이다. 이를 통해서 우리는 앞서 했던 연산을 다시 할 필요가 없어진다. 0으로 채워놓은 dp 배열의 인덱스들이 `w함수`를 호출함으로 채워진다.
채워진 값은 0이 아닐 것이고, 앞서 구한 값은 dp 배열에서 찾아낼 수 있다. 그렇다면 재귀 함수를 통해 다시 값을 찾아내려갈 필요없이 위 값으로 대체할 수 있다.

</div>
</details>
