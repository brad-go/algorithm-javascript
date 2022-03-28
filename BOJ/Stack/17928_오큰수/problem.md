# 오큰수 - 17298

[문제 링크](https://www.acmicpc.net/problem/17298)

### 성능 요약

메모리: 512MB, 시간 1초

### 문제

크기가 N인 수열 A = A1, A2, ..., AN이 있다. 수열의 각 원소 Ai에 대해서 오큰수 NGE(i)를 구하려고 한다. Ai의 오큰수는 오른쪽에 있으면서 Ai보다 큰 수 중에서 가장 왼쪽에 있는 수를 의미한다. 그러한 수가 없는 경우에 오큰수는 -1이다.

예를 들어, A = [3, 5, 2, 7]인 경우 NGE(1) = 5, NGE(2) = 7, NGE(3) = 7, NGE(4) = -1이다. A = [9, 5, 4, 8]인 경우에는 NGE(1) = -1, NGE(2) = 8, NGE(3) = 8, NGE(4) = -1이다.

### 입력

첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000,000)이 주어진다. 둘째 줄에 수열 A의 원소 A1, A2, ..., AN (1 ≤ Ai ≤ 1,000,000)이 주어진다.

### 출력

총 N개의 수 NGE(1), NGE(2), ..., NGE(N)을 공백으로 구분해 출력한다.

### 예제 입력 1

```
4
3 5 2 7
```

### 예제 출력 1

```
5 7 7 -1
```

### 예제 입력 2

```
4
9 5 4 8
```

### 예제 출력 2

```
-1 8 8 -1
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

#### 실패 - 메모리 초과

```js
const [n, input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출

function Solution(n, input) {
  const numbers = input.split(" ").map((v) => +v);

  const isBiggiest = (num) => {
    const comparison = numbers.findIndex((compare) => compare > num);
    return comparison === -1 ? true : false;
  };

  let result = "";
  numbers.forEach((num) => {
    if (isBiggiest(num)) {
      result += "-1 ";
      return;
    }

    const idx = numbers.indexOf(num);
    const arr = numbers.slice(idx + 1);
    const ngm = arr.find((n) => n > num);

    if (!ngm) {
      result += "-1 ";
      return;
    }
    result += `${ngm} `;
  });
  console.log(result.trim());
}

Solution(n, input);
```

##### 풀이

- 수열의 각 인덱스를 반복문을 통해 돈다.
- 가장 큰 수 인지 확인하고 가장 큰 수라면 오큰수가 존재하지 않으므로 result에 -1을 추가
- 해당 인덱스의 번호를 찾아서 해당 인덱스 이후의 수만으로 배열을 만든다.
- 이 배열에서 가장 현재 인덱스의 수보다 가장 먼저오는 큰 수를 찾는다.
- 없다면 result에 -1추가, 있다면 result에 찾은 수를 추가

##### 느낀점

- 문제를 보고 너무 쉽다고 생각했고, 그냥 한 번에 정답이 출력되었다. 다른 input으로 바꿔봐도 마찬가지였다.
- 그러나 괜히 스택으로 풀 수 있는 어려운 문제라고 설명이 써있는게 아니었다.
- **메모리 초과**로 실패

#### Solution

```js
function Solution(n, input) {
  const numbers = input.split(" ").map((v) => +v);
  const stack = [];
  const result = new Array(Number(n)).fill(-1);

  for (let i = 0; i < n; i++) {
    while (stack.length && numbers[i] > numbers[stack[stack.length - 1]]) {
      result[stack.pop()] = numbers[i];
    }
    stack.push(i);
  }
  console.log(result.join(" "));
}

Solution(n, input);
```

- 수열의 길이만큼 -1로 채운 새로운 배열(result)을 만든다.
- 수열의 길이만큼 반복문을 돈다.
- 스택에 현재 인덱스 번호를 넣는다.
- 스택에 수가 있고, 수열의 현재 인덱스가 이전 인덱스보다 크다면 -1로 채워진 result 배열의 스택에서 꺼낸 인덱스에 현재 인덱스를 넣는다.

</div>
</details>
