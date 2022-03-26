# 스택 수열 - 1874

[문제 링크](https://www.acmicpc.net/problem/1874)

### 성능 요약

메모리: 128MB, 시간 2초

### 문제

스택 (stack)은 기본적인 자료구조 중 하나로, 컴퓨터 프로그램을 작성할 때 자주 이용되는 개념이다. 스택은 자료를 넣는 (push) 입구와 자료를 뽑는 (pop) 입구가 같아 제일 나중에 들어간 자료가 제일 먼저 나오는 (LIFO, Last in First out) 특성을 가지고 있다.

1부터 n까지의 수를 스택에 넣었다가 뽑아 늘어놓음으로써, 하나의 수열을 만들 수 있다. 이때, 스택에 push하는 순서는 반드시 오름차순을 지키도록 한다고 하자. 임의의 수열이 주어졌을 때 스택을 이용해 그 수열을 만들 수 있는지 없는지, 있다면 어떤 순서로 push와 pop 연산을 수행해야 하는지를 알아낼 수 있다. 이를 계산하는 프로그램을 작성하라.

### 입력

첫 줄에 n (1 ≤ n ≤ 100,000)이 주어진다. 둘째 줄부터 n개의 줄에는 수열을 이루는 1이상 n이하의 정수가 하나씩 순서대로 주어진다. 물론 같은 정수가 두 번 나오는 일은 없다.

### 출력

입력된 수열을 만들기 위해 필요한 연산을 한 줄에 한 개씩 출력한다. push연산은 +로, pop 연산은 -로 표현하도록 한다. 불가능한 경우 NO를 출력한다.

### 예제 입력 1

```
8
4
3
6
8
7
5
2
1
```

### 예제 출력 1

```
+
+
+
+
-
-
+
+
-
+
+
-
-
-
-
-
```

### 예제 입력 2

```
5
1
2
5
3
4
```

### 예제 출력 2

```
NO
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

```js
const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

function Solution(n, input) {
  const numbers = [...input];
  const sorted = numbers.sort((a, b) => a - b);

  let operation = "";
  const stack = [];

  for (let i = 0; i < n; i++) {
    while (sorted[0] <= input[i] && stack[stack.length - 1] !== input[i]) {
      stack.push(sorted.shift());
      operation += "+\n";
    }

    if (stack[stack.length - 1] === input[i]) {
      stack.pop();
      operation += "-\n";
    } else {
      operation = "NO";
      break;
    }
  }
  console.log(operation.trim());
}

Solution(n, input);
```

- 수열(`input`)을 오름차순으로 정렬한다. (`sorted` 배열)
- 수열(`input`)의 길이만큼 반복문을 돈다.
- while문을 돌면서 stack에 정렬한 배열의 첫번째를 떼서 넣어준다.
  - 조건1: 정렬한 배열(`sorted`)의 첫번째 인덱스가 원래 수열의 i번째 인덱스보다 작거나 같을 때까지
  - 조건2: 스택의 마지막 인덱스가 원래 수열의 i번째 인덱스와 다를 때까지
- stack의 마지막 인덱스가 수열의 i번째 인덱스가 같다면 스택에서 꺼낸다.
- 위 조건들에 해당하지 않고, stack의 마지막 인덱스가 수열의 i번째 인덱스와 다르다면 수열을 만들 수 없다.

</div>
</details>
