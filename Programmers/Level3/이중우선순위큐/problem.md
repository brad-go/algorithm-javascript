# 이중우선순위큐

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/42628

## 문제 분류

: 힙

## 풀이 과정

1. 주어진 명령어에 대한 연산을 수행할 수 있는 큐 클래스를 생성한다.
2. 주어진 명령(operations)의 작업들을 차례대로 수행해준다.
3. queue에서 최댓값, 최솟값을 찾아 반환한다.

```js
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue(item) {
    if (!this.items.length) {
      return;
    }

    // -1이라면 최솟값을 찾아 제거, 1이라면 최댓값을 찾아 제거
    if (item === -1) {
      const min = Math.min(...this.items);
      this.items = this.items.filter((item) => item !== min);
    } else {
      const max = Math.max(...this.items);
      this.items = this.items.filter((item) => item !== max);
    }
  }
}

const solution = (operations) => {
  const queue = new Queue();
  // 명령어 I, D에 따른 연산
  const operate = {
    I: (value) => queue.enqueue(value),
    D: (value) => queue.dequeue(value),
  };

  operations.forEach((operation) => {
    // 명령어와 값을 분리
    const [command, value] = operation.split(" ");
    operate[command](Number(value));
  });

  const min = queue.items.length ? Math.min(...queue.items) : 0;
  const max = queue.items.length ? Math.max(...queue.items) : 0;

  return [max, min];
};
```

## 코드 개선

굳이 클래스를 생성하지 않고 splice 메서드를 사용해서 해결할 수 있었다.

```js
const solution = (operations) => {
  const queue = [];

  operations.forEach((operation) => {
    const [command, value] = operation.split(" ");

    if (command === "I") {
      queue.push(Number(value));
      return;
    }

    if (!queue.length) return;

    const val = (Number(value) < 0 ? Math.min : Math.max)(...queue);
    const deleteIndex = queue.findIndex((item) => item === val);

    queue.splice(deleteIndex, 1);
  });

  return queue.length ? [Math.max(...queue), Math.min(...queue)] : [0, 0];
};
```
