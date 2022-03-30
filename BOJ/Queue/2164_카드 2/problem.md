# 카드 2 - 2164

[문제 링크](https://www.acmicpc.net/problem/2164)

### 성능 요약

메모리: 128MB, 시간 2초

### 문제

N장의 카드가 있다. 각각의 카드는 차례로 1부터 N까지의 번호가 붙어 있으며, 1번 카드가 제일 위에, N번 카드가 제일 아래인 상태로 순서대로 카드가 놓여 있다.

이제 다음과 같은 동작을 카드가 한 장 남을 때까지 반복하게 된다. 우선, 제일 위에 있는 카드를 바닥에 버린다. 그 다음, 제일 위에 있는 카드를 제일 아래에 있는 카드 밑으로 옮긴다.

예를 들어 N=4인 경우를 생각해 보자. 카드는 제일 위에서부터 1234 의 순서로 놓여있다. 1을 버리면 234가 남는다. 여기서 2를 제일 아래로 옮기면 342가 된다. 3을 버리면 42가 되고, 4를 밑으로 옮기면 24가 된다. 마지막으로 2를 버리고 나면, 남는 카드는 4가 된다.

N이 주어졌을 때, 제일 마지막에 남게 되는 카드를 구하는 프로그램을 작성하시오.

### 입력

첫째 줄에 정수 N(1 ≤ N ≤ 500,000)이 주어진다.

### 출력

첫째 줄에 남게 되는 카드의 번호를 출력한다.

### 예제 입력

```
6
```

### 예제 출력

```
4
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

```js
const input = Number(require("fs").readFileSync("dev/stdin").toString().trim());

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

  deQueue() {
    if (!this.length) return;
    const outcome = this.head.item;
    this.head = this.head.next;
    this.length--;
    return outcome;
  }

  enQueue(item) {
    const node = new Node(item);
    if (!this.head) {
      this.head = node;
      this.head.next = this.tail;
    } else this.tail.next = node;

    this.tail = node;
    this.length++;
  }
}

function Solution(input) {
  const deck = new Queue();

  for (let i = 0; i < input; i++) {
    deck.enQueue(i + 1);
  }

  while (deck.length > 1) {
    deck.deQueue();
    if (deck.length > 1) {
      const top = deck.deQueue();
      deck.enQueue(top);
    }
  }
  console.log(deck.head.item);
}

Solution(input);
```

#### deQueue, enQueue 구현하기

- 시간초과 문제 때문에, 이전 큐 2 문제와 같은 방식으로 큐를 직접 구현해야 했다.

```js
deQueue() {
    if (!this.length) return;
    const outcome = this.head.item;
    this.head = this.head.next;
    this.length--;
    return outcome;
  }

enQueue(item) {
  const node = new Node(item);
  if (!this.head) {
    this.head = node;
    this.head.next = this.tail;
  } else this.tail.next = node;

  this.tail = node;
  this.length++;
}
```

- 큐에 넣고 빼는 하는 deQueue, enQueue를 직접 구현했다.
- deQueue를 구현하는데 어려움을 겪었는데
  - deQueue를 진행하면 `this.tail`이 node가 되는 것이 아니라 `this.tail.item`이 node가 들어가서 문제가 있었다.
  - dequeue과정에서 `outcome`을 `this.head.item`을 꺼내오는 방식으로 해결했다.

#### 카드 덱 구현

```js
const deck = new Queue();

for (let i = 0; i < input; i++) {
  deck.enQueue(i + 1);
}
```

- 카드 덱을 큐라고 생각하고 구현했다.
- enQueue를 통해서 덱에 카드(수)를 input만큼 채워준다.

#### 동작 구현

```js
while (deck.length > 1) {
  deck.deQueue();
  if (deck.length > 1) {
    const top = deck.deQueue();
    deck.enQueue(top);
  }
}
console.log(deck.head.item);
```

- 덱이 한장 남을 때까지 동작을 반복한다.
- deQueue로 카드를 한장 버리고
- 덱이 한장보다 많다면 제일 위에 카드를 빼내서 아래로 넣어준다.
- 한장이 남는다면 제일 위에 있는 카드를 출력한다.

</div>
</details>
