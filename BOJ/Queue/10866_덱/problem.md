# 덱 - 10866

[문제 링크](https://www.acmicpc.net/problem/10866)

### 성능 요약

메모리: 256MB, 시간 0.5초

### 문제

정수를 저장하는 덱(Deque)를 구현한 다음, 입력으로 주어지는 명령을 처리하는 프로그램을 작성하시오.

명령은 총 여덟 가지이다.

push_front X: 정수 X를 덱의 앞에 넣는다.
push_back X: 정수 X를 덱의 뒤에 넣는다.
pop_front: 덱의 가장 앞에 있는 수를 빼고, 그 수를 출력한다. 만약, 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
pop_back: 덱의 가장 뒤에 있는 수를 빼고, 그 수를 출력한다. 만약, 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
size: 덱에 들어있는 정수의 개수를 출력한다.
empty: 덱이 비어있으면 1을, 아니면 0을 출력한다.
front: 덱의 가장 앞에 있는 정수를 출력한다. 만약 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.
back: 덱의 가장 뒤에 있는 정수를 출력한다. 만약 덱에 들어있는 정수가 없는 경우에는 -1을 출력한다.

### 입력

첫째 줄에 주어지는 명령의 수 N (1 ≤ N ≤ 10,000)이 주어진다. 둘째 줄부터 N개의 줄에는 명령이 하나씩 주어진다. 주어지는 정수는 1보다 크거나 같고, 100,000보다 작거나 같다. 문제에 나와있지 않은 명령이 주어지는 경우는 없다.

### 출력

출력해야하는 명령이 주어질 때마다, 한 줄에 하나씩 출력한다.

### 예제 입력 1

```
15
push_back 1
push_front 2
front
back
size
empty
pop_front
pop_back
pop_front
size
empty
pop_back
push_front 3
empty
front
```

### 예제 출력 1

```
2
1
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
22
front
back
pop_front
pop_back
push_front 1
front
pop_back
push_back 2
back
pop_front
push_front 10
push_front 333
front
back
pop_back
pop_back
push_back 20
push_back 1234
front
back
pop_back
pop_back
```

### 예제 출력 2

```
-1
-1
-1
-1
1
1
2
2
333
10
10
333
20
1234
1234
20
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### 실패

```js
const [n, ...input] = require("fs")
  .readFileSync("dev/stdin")
  .toString()
  .trim()
  .split("\n");

function Solution(n, commands) {
  class Node {
    constructor(item) {
      this.prev = null;
      this.item = item;
      this.next = null;
    }
  }

  class Deque {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }

    pushFront(item) {
      const node = new Node(item);
      if (!this.length) {
        this.head = node;
        this.tail = node;
      } else {
        this.head.prev = node;
        node.next = this.head;
        this.head = node;
      }

      this.length++;
    }

    pushBack(item) {
      const node = new Node(item);
      if (!this.length) {
        this.head = node;
        this.tail = node;
      } else {
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
      }

      this.length++;
    }

    popFront() {
      if (!this.length) return -1;

      const popItem = this.head.item;
      this.head = this.head.next;

      if (this.length == 1) this.head = null;
      else this.head.prev = null;

      this.length--;
      return popItem;
    }

    popBack() {
      if (!this.length) return -1;

      const popItem = this.tail.item;
      this.tail = this.tail.prev;

      if (this.length == 1) this.tail = null;
      else this.tail.prev = null;

      this.length--;
      return popItem;
    }

    size() {
      return this.length;
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

  let answer = "";
  const deque = new Deque();

  commands.forEach((commandLine) => {
    const [command, item] = commandLine.split(" ");

    switch (command) {
      case "push_front":
        deque.pushFront(item);
        break;
      case "push_back":
        deque.pushBack(item);
        break;
      case "pop_front":
        answer += `${deque.popFront()}\n`;
        break;
      case "pop_back":
        answer += `${deque.popBack()}\n`;
        break;
      case "size":
        answer += `${deque.size()}\n`;
        break;
      case "empty":
        answer += `${deque.empty()}\n`;
        break;
      case "front":
        answer += `${deque.front()}\n`;
        break;
      case "back":
        answer += `${deque.back()}\n`;
        break;
      default:
        break;
    }
  });
  console.log(answer.trim());
}

Solution(n, input);
```

제출하면 런타임에러(타입 에러)가 뜨는데 이유를 도저히 못찾겠다. vscode에서는 답이 잘 나오는데, 어떤 문제일까...

### Solution

```js
const [n, ...input] = require("fs")
  .readFileSync("dev/stdin")
  .toString()
  .trim()
  .split("\n");

function Solution(n, commands) {
  let answer = "";
  const queue = [];

  commands.forEach((line) => {
    const [command, value] = line.split(" ");

    switch (command) {
      case "push_front":
        queue.unshift(value);
        break;
      case "push_back":
        queue.push(value);
        break;
      case "pop_front":
        answer += `${queue.shift() || -1}\n`;
        break;
      case "pop_back":
        answer += `${queue.pop() || -1}\n`;
        break;
      case "size":
        answer += `${queue.length}\n`;
        break;
      case "empty":
        answer += `${queue.length ? 0 : 1}\n`;
        break;
      case "front":
        answer += `${queue.length ? queue[0] : -1}\n`;
        break;
      case "back":
        answer += `${queue.length ? queue[queue.length - 1] : -1}\n`;
        break;
    }
  });
  console.log(answer.trim());
}

Solution(n, input);
```

결국 덱을 구현하는 것을 포기하고, switch문을 통해서 해결했다. 다른 사람들이 덱을 구현한 것을 좀 찾아보고 시도해봐야 겠다.

</div>
</details>
