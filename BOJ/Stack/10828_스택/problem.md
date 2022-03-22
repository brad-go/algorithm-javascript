# 스택 - 10828

[문제 링크](https://www.acmicpc.net/problem/10828)

### 성능 요약

메모리: 256MB, 시간 0.5초

### 문제

정수를 저장하는 스택을 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 다섯 가지이다.

push X: 정수 X를 스택에 넣는 연산이다.
pop: 스택에서 가장 위에 있는 정수를 빼고, 그 수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.
size: 스택에 들어있는 정수의 개수를 출력한다.
empty: 스택이 비어있으면 1, 아니면 0을 출력한다.
top: 스택의 가장 위에 있는 정수를 출력한다. 만약 스택에 들어있는 정수가 없는 경우에는 -1을 출력한다.

### 입력

첫째 줄에 주어지는 명령의 수 N (1 ≤ N ≤ 10,000)이 주어진다. 둘째 줄부터 N개의 줄에는 명령이 하나씩 주어진다. 주어지는 정수는 1보다 크거나 같고, 100,000보다 작거나 같다. 문제에 나와있지 않은 명령이 주어지는 경우는 없다.

### 출력

출력해야하는 명령이 주어질 때마다, 한 줄에 하나씩 출력한다.

### 예제 입력 1

```
14
push 1
push 2
top
size
empty
pop
pop
pop
size
empty
pop
push 3
empty
top
```

### 예제 출력 1

```
2
2
0
2
1
-1
0
1
-1
0
3
```

### 예제 입력 2

```
7
pop
top
push 123
top
pop
top
pop
```

### 예제 출력 2

```
-1
-1
123
123
-1
-1
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
