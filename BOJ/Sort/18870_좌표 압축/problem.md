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

#### 시간 초과

```js
const [n, input] = require("fs")
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(input) {
  const nums = input.split(" ").map((v) => +v);
  const set = new Set(nums);
  const unique = [...set];

  const sorted = unique.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < sorted.length; j++) {
      if (nums[i] === sorted[j]) {
        nums[i] = j;
      }
    }
  }
  console.log(nums.join(" "));
}

Solution(input);
```

메모리 초과문제인거라 생각해서 메모리를 줄이는 쪽으로 생각해봤는데, 이번에는 시간 초과가 발생했다.

### 해결

```js
const [n, input] = require("fs")
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(n, input) {
  const nums = input.split(" ").map((v) => +v);
  const set = new Set(nums);
  const unique = [...set].sort((a, b) => a - b);

  const numbers = {};
  unique.forEach((num, idx) => (numbers[num] = idx));

  for (let i = 0; i < n; i++) {
    nums[i] = numbers[nums[i]];
  }

  console.log(nums.join(" "));
}

Solution(n, input);
```

문제 푸는데 정말 오래걸렸다. 메모리 초과, 시간 초과 때문에 고생했는데, 문제에서 제시된 수의 범위가 너무 커서였다. 좌표를 압축한다는게 어떤 의미인건지.. ㅠ 풀이는 다음과 같다.

내가 해석한 문제는 이렇다. 배열의 각 원소값들의 순서를 나타내라. 즉, **순위**를 매기는 것과 같았다.

- 받아온 수들을 쪼개서 배열에 담기
- 중복된 숫자 없이, 오름차순으로 정렬

여기서 원본 배열을 놔두고 **새 배열**을 얻어야 했다. 그리고 순위를 매길 것이므로 오름차순으로 정렬해주었다.

- 배열의 인덱스는 정렬된 수들의 크기 비교 결과이다.
- numbers란 객체에 키값으로 수를 value로 인덱스 번호(정렬 결과)를 넣는다.

이 과정이 각 수들에게 순위를 부여하는 과정이었다.

- 다시 처음의 정렬 전의 배열을 순회하면서 각 수를 객체의 키 값으로 넣어서 value를 얻어 저장한다.

#### 좌표 압축 기법

찾아본 결과 좌표 압축 기법은 다음과 같다.

- 모든 구간이 아니라, 중요한 구간이나, 숫자만 들고있는 기법.
- 순위가 중요한 알고리즘에서 입력값의 개수 < 입력값의 범위일때 사용한다.
- 값보다는 값의 순위만 중요하기 때문에, 값을 임의로 변경해도 되는 것!

</div>
</details>
