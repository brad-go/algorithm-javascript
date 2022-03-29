# 균형잡힌 세상 - 18258

[문제 링크](https://www.acmicpc.net/problem/18258)

### 성능 요약

메모리: 512MB, 시간 1초

### 문제

정수를 저장하는 큐를 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 여섯 가지이다.

push X: 정수 X를 큐에 넣는 연산이다.
pop: 큐에서 가장 앞에 있는 정수를 빼고, 그 수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
size: 큐에 들어있는 정수의 개수를 출력한다.
empty: 큐가 비어있으면 1, 아니면 0을 출력한다.
front: 큐의 가장 앞에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.
back: 큐의 가장 뒤에 있는 정수를 출력한다. 만약 큐에 들어있는 정수가 없는 경우에는 -1을 출력한다.

### 입력

첫째 줄에 주어지는 명령의 수 N (1 ≤ N ≤ 2,000,000)이 주어진다. 둘째 줄부터 N개의 줄에는 명령이 하나씩 주어진다. 주어지는 정수는 1보다 크거나 같고, 100,000보다 작거나 같다. 문제에 나와있지 않은 명령이 주어지는 경우는 없다.

### 출력

출력해야하는 명령이 주어질 때마다, 한 줄에 하나씩 출력한다.

### 예제 입력 1

```
15
push 1
push 2
front
back
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
front
```

### 예제 출력 1

```
1
2
2
0
1
2
-1
0
1
-1
0
3
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### 실패

```js
const [n, ...input] = require("fs")
  // 백준 제출 시 './input.txt'를 '/dev/stdin'으로 변경
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

// 내 제출

function Solution(n, commands) {
  const queue = [];
  const result = [];

  for (let i = 0; i < n; i++) {
    switch (commands[i]) {
      case "pop":
        result.push(queue.shift() || -1);
        break;
      case "size":
        result.push(queue.length);
        break;
      case "empty":
        result.push(queue.length ? 1 : 0);
        break;
      case "front":
        result.push(queue[0] || -1);
        break;
      case "back":
        result.push(queue[queue.length - 1] || -1);
        break;
      default:
        queue.push(commands[i].split(" ")[1]);
    }
  }

  console.log(result.join("\n"));
}

Solution(n, input);
```

- 10828 스택을 풀이했던 방식대로 객체를 이용하는 방법과 스위치문을 이용하는 방법을 사용했는데, 시간초과가 났다.
- 큐를 이용할 때, shift(), push()등을 이용할 때 연산 시간이 많이 걸리는 듯하다...

</div>
</details>
