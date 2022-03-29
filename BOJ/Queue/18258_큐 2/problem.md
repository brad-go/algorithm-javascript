# 큐 2 - 18258

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

### Solution

- [JS 알고리즘 구현: 큐(Queue) 구현 vs Array 메서드(shift, splice) 사용했을때 속도 비교](https://velog.io/@grap3fruit/JS-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B5%AC%ED%98%84-%ED%81%90Queue-%EA%B5%AC%ED%98%84%ED%96%88%EC%9D%84%EB%95%8C-vs-Array-%EB%A9%94%EC%84%9C%EB%93%9Cshift-splice-%EC%82%AC%EC%9A%A9%ED%96%88%EC%9D%84%EB%95%8C-%EC%86%8D%EB%8F%84-%EB%B9%84%EA%B5%90)

위 글을 참고해서 직접 큐를 직접 구현해서 문제를 해결했다.

```js
class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(item) {
    const node = new Node(item);
    if (!this.head) {
      this.head = node;
      this.head.next = this.tail;
    } else this.tail.next = node;

    this.tail = node;
    this.length++;
  }

  size() {
    return this.length;
  }

  pop() {
    if (this.length > 2) {
      const popedItem = this.head.item;
      const newHead = this.head.next;
      this.head = newHead;
      this.length--;
      return popedItem;
    }
    if (this.length === 2) {
      const popedItem = this.head.item;
      const newHead = this.head.next;
      this.head = newHead;
      this.tail = newHead;
      this.length--;
      return popedItem;
    }
    if (this.length === 1) {
      const popedItem = this.head.item;
      this.head = null;
      this.tail = null;
      this.length--;
      return popedItem;
    }
    return -1;
  }

  empty() {
    return this.length ? 0 : 1;
  }

  front() {
    return this.length ? this.head.item : -1;
  }

  back() {
    return this.length ? this.tail.item : -1;
  }
}

function Solution(commands) {
  const queue = new Queue();
  let result = "";

  commands.forEach((commandline) => {
    const [command, value] = commandline.split(" ");
    if (command === "push") return queue[command](value);
    result += `${queue[command]()}\n`;
  });

  console.log(result.trim());
}

Solution(input);
```

- 다른 언어는 쉽게 풀 수 있던 것 같은데, 자바스크립트는 시간복잡도 O(1)을 보장하는 내장 라이브러리가 없어서 큐를 구현해야 했다.
- 실제로 위의 링크를 걸어놓은 글에서 자세히 볼 수 있고, 구현한다면 속도 차이는 엄청났다.

```js
class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}
```

- 큐에 들어갈 각 노드를 표현한 클래스
- item을 인자로 받고 큐에 linked list 방식으로 item을 받게 된다.

```js
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
```

- 큐라는 클래스를 생성한다.
- 큐의 맨 앞으로 표현한 head, 맨 뒤 tail, 큐의 길이를 표현한 length를 가진다.

```js
push(item) {
  const node = new Node(item);
  if (!this.head) {
    this.head = node;
    this.head.next = this.tail;
  } else this.tail.next = node;

  this.tail = node;
  this.length++;
}
```

- push를 할 때 위에서 만들었던 클래스를 이용해 노드를 하나 만든다.
- 큐의 head가 비어있다면 head에 노드를 넣어준다.
- tail부분에도 노드를 넣어주고, head가 있을 때 head의 next에 tail을 넣어준다.

```bash
Queue {
  head: Node { item: '1', next: Node { item: '2', next: null } },
  tail: Node { item: '2', next: null },
  length: 2
}
```

- 이러한 모습을 띠게 된다.

```js
pop() {
  if (this.length > 2) {
    const popedItem = this.head.item;
    const newHead = this.head.next;
    this.head = newHead;
    this.length--;
    return popedItem;
  }
  if (this.length === 2) {
    const popedItem = this.head.item;
    const newHead = this.head.next;
    this.head = newHead;
    this.tail = newHead;
    this.length--;
    return popedItem;
  }
  if (this.length === 1) {
    const popedItem = this.head.item;
    this.head = null;
    this.tail = null;
    this.length--;
    return popedItem;
  }
  return -1;
}
```

- pop메서드의 경우 조건에 따라 달리 해줘야 한다.
- 길이가 2이상이라면 head의 next에 있는 노드를 head로 바꿔준다.
- 길이가 2라면 head와 tail을 모두 head의 next에 있는 노드로 바꿔준다.
- 길이가 1이라면 pop을 진행하면 큐가 비어야 하므로 null로 만들어준다.
- 현재 head의 맨 앞에 위치한 item을 반환한다.
- 큐가 비어있다면 -1을 반환한다.

</div>
</details>
