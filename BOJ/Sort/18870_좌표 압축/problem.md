# 좌표 압축 - 18870

[문제 링크](https://www.acmicpc.net/problem/18870)

### 성능 요약

메모리: 512MB, 시간 2초

### 문제

수직선 위에 N개의 좌표 X1, X2, ..., XN이 있다. 이 좌표에 좌표 압축을 적용하려고 한다.

Xi를 좌표 압축한 결과 X'i의 값은 Xi > Xj를 만족하는 서로 다른 좌표의 개수와 같아야 한다.

X1, X2, ..., XN에 좌표 압축을 적용한 결과 X'1, X'2, ..., X'N를 출력해보자.

### 입력

첫째 줄에 N이 주어진다.

둘째 줄에는 공백 한 칸으로 구분된 X1, X2, ..., XN이 주어진다.공백으로 구분되어 주어진다. 나이는 1보다 크거나 같으며, 200보다 작거나 같은 정수이고, 이름은 알파벳 대소문자로 이루어져 있고, 길이가 100보다 작거나 같은 문자열이다. 입력은 가입한 순서로 주어진다.

### 출력

첫째 줄에 X'1, X'2, ..., X'N을 공백 한 칸으로 구분해서 출력한다.

### 제한

- 1 ≤ N ≤ 1,000,000
- -109 ≤ Xi ≤ 109

### 예제 입력 1

```
5
2 4 -10 4 -9
```

### 예제 출력 1

```
2 3 0 3 1
```

### 예제 입력 2

```
6
1000 999 1000 999 1000 999
```

### 예제 출력 2

```
1 0 1 0 1 0
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### 실패

#### 메모리 초과

```js
const [n, input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(n, input) {
  const nums = input.split(" ").map((v) => +v);

  let result = "";
  for (let i = 0; i < n; i++) {
    const compareResults = [];

    for (let j = 0; j < n; j++) {
      if (nums[i] > nums[j]) compareResults.push(nums[j]);
    }

    const set = new Set(compareResults);
    const unique = [...set];
    result += `${unique.length} `;
  }
  console.log(result.trim());
}

Solution(n, input);
```

- 생각보다 쉽게 풀린다 했는데, 메모리 초과가 발생했다. 어디서 메모리가 초과된건지 알 수 없다...

### 해결

</div>
</details>
