# LCS - 9251번

[문제 링크](https://www.acmicpc.net/problem/9251)

### 성능 요약

메모리: 256MB, 시간 1초

### 문제

LCS(Longest Common Subsequence, 최장 공통 부분 수열)문제는 두 수열이 주어졌을 때, 모두의 부분 수열이 되는 수열 중 가장 긴 것을 찾는 문제이다.

예를 들어, ACAYKP와 CAPCAK의 LCS는 ACAK가 된다.

### 입력

첫째 줄과 둘째 줄에 두 문자열이 주어진다. 문자열은 알파벳 대문자로만 이루어져 있으며, 최대 1000글자로 이루어져 있다.

### 출력

첫째 줄에 입력으로 주어진 두 문자열의 LCS의 길이를 출력한다.

### 예제 입력

```
ACAYKP
CAPCAK
```

### 예제 출력

```
4
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

LCS 알고리즘 그대로인 문제였다.

LCS 2차원 배열을 첫번째 문자열 + 1, 두번째 문자열 + 1의 길이로 생성하고, 0으로 채워준다.

```js
const LCS = Array.from(Array(n + 1), () => Array(m + 1).fill(0));
```

반복문을 돌면서 한쪽 문자열을 기준으로 다른 문자열을 탐색한다.

```js
// 첫번째 문자열의 한 문자가 두번째 문자열에 존재하지 않는다면
LCS[i][j] = Math.max(LCS[i - 1][j], LCS[i][j - 1]);

//첫번째 문자열의 한 문자가 두번째 문자열에 존재한다면
if (curChar === compareChar) LCS[i][j] = LCS[i - 1][j - 1] + 1;
```

### 코드

```js
const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(input) {
  const chars = input.map((str) => str.split(""));
  const n = chars[0].length;
  const m = chars[1].length;

  const LCS = Array.from(Array(n + 1), () => Array(m + 1).fill(0));

  for (let i = 1; i < n + 1; i++) {
    const curChar = chars[0][i - 1];

    for (let j = 1; j < m + 1; j++) {
      const compareChar = chars[1][j - 1];
      LCS[i][j] = Math.max(LCS[i - 1][j], LCS[i][j - 1]);

      if (curChar === compareChar) LCS[i][j] = LCS[i - 1][j - 1] + 1;
    }
  }

  console.log(LCS[n][m]);
}

Solution(input);
```

</div>
</details>
