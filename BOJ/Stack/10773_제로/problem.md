# 제로 - 10773

[문제 링크](https://www.acmicpc.net/problem/10773)

### 성능 요약

메모리: 256MB, 시간 1초

### 문제

나코더 기장 재민이는 동아리 회식을 준비하기 위해서 장부를 관리하는 중이다.

재현이는 재민이를 도와서 돈을 관리하는 중인데, 애석하게도 항상 정신없는 재현이는 돈을 실수로 잘못 부르는 사고를 치기 일쑤였다.

재현이는 잘못된 수를 부를 때마다 0을 외쳐서, 가장 최근에 재민이가 쓴 수를 지우게 시킨다.

재민이는 이렇게 모든 수를 받아 적은 후 그 수의 합을 알고 싶어 한다. 재민이를 도와주자!

### 입력

첫 번째 줄에 정수 K가 주어진다. (1 ≤ K ≤ 100,000)

이후 K개의 줄에 정수가 1개씩 주어진다. 정수는 0에서 1,000,000 사이의 값을 가지며, 정수가 "0" 일 경우에는 가장 최근에 쓴 수를 지우고, 아닐 경우 해당 수를 쓴다.

정수가 "0"일 경우에 지울 수 있는 수가 있음을 보장할 수 있다.

### 출력

재민이가 최종적으로 적어 낸 수의 합을 출력한다. 최종적으로 적어낸 수의 합은 2의 31제곱 -1보다 작거나 같은 정수이다.

### 예제 입력 1

```
4
3
0
4
0
```

### 예제 출력 1

```
0
```

### 예제 입력 2

```
10
1
3
5
4
0
0
7
0
0
6
```

### 예제 출력 2

```
7
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
  const commands = [...input];

  const getNumberFromString = (string) => {
    return Number(string.replace(/[^0-9]/g, ""));
  };

  const stack = [];
  let result = "";

  commands.forEach((command) => {
    if (command.includes("push")) {
      stack.push(getNumberFromString(command));
    }
    if (command.includes("pop")) {
      if (stack.length === 0) result += "-1\n";
      else result += `${stack.pop()}\n`;
    }
    if (command.includes("size")) result += `${stack.length}\n`;
    if (command.includes("empty")) {
      result += `${stack.length === 0 ? 1 : 0}\n`;
    }
    if (command.includes("top")) {
      if (stack.length === 0) result += "-1\n";
      else result += `${stack[stack.length - 1]}\n`;
    }
  });

  console.log(result.trim());
}

Solution(n, input);
```

- 내장메서드 `includes`를 통해 해당 문자열이 포함되었는지 확인
- `result` 문자열에 추가해서 한 번에 출력
- 정규식을 이용해서 문자열 대체

문제를 풀긴했지만, 코드가 지저분해서 아쉽다. 더 깔끔한 방법으로 해결할 수 있을 것 같은데...

### Solution 2

```js
// 생략...
function Solution(n, input) {
  const commands = [...input];

  const stack = [];
  const result = [];

  for (let i = 0; i < n; i++) {
    switch (commands[i]) {
      case "pop":
        result.push(stack.pop() || -1);
        break;
      case "size":
        result.push(stack.length);
        break;
      case "empty":
        result.push(stack.length ? 0 : 1);
        break;
      case "top":
        result.push(stack[stack.length - 1] || -1);
        break;
      default:
        stack.push(commands[i].split(" ")[1]);
    }
  }

  console.log(result.join("\n"));
}

Solution(n, input);
```

더 나은 방법이 없을까 생각하다가 if 문을 switch문으로 변경해서 해결했다. 훨씬 코드가 깔끔하고 보기 좋아졌다.

### Solution 3

```js
function Solution(input) {
  const commands = [...input];

  const stack = [];

  const execution = {
    pop: () => stack.pop() || -1,
    size: () => stack.length,
    empty: () => (stack.length === 0 ? 1 : 0),
    top: () => stack[stack.length - 1] || -1,
    push: (item) => {
      stack.push(item.split(" ")[1]);
      return "";
    },
  };

  const result = commands.reduce(
    (acc, cur) =>
      acc + (execution[cur] ? `${execution[cur]()}\n` : execution.push(cur)),
    ""
  );

  console.log(result.trim());
}

Solution(input);
```

더 좋은 방법을 찾다가 내가 원하던 방법을 발견했다. 객체를 이용하는 방법이었는데, 이렇게 하면 조건문 없이 깔끔하게 해결할 수 있었다.

```js
const result = commands.reduce(
  (acc, cur) =>
    acc + (execution[cur] ? `${execution[cur]()}\n` : execution.push(cur)),
  ""
);
```

- push만 다르게 들어오기 때문에 예외처리를 해주었다. (execution[cur]에서 push n 이 들어와서 false가 된다)

```js
push: (item) => {
    stack.push(item.split(" ")[1]);
    return "";
  },
```

return 처리를 해주지 않으면 undefined가 같이 들어가게 되므로 `return '';`처리를 해준다.

</div>
</details>
