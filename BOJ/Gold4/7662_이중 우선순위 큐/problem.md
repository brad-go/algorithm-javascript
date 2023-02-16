# 7662. 이중 우선순위 큐

## 문제 링크

https://www.acmicpc.net/problem/7662

## 문제 분류

: 우선순위 큐, 자료 구조, 해시

## 소요 시간

: 4시간

## 풀이 방법

프로그래머스에서 풀이한 적이있는 문제여서 쉽게 풀이할 수 있을거라 생각했다. 프로그래머스때와 같이 배열을 사용해 큐를 생성하고 문제를 풀이했는데, 메모리초과가 발생했다. Set이나 Map을 사용해서 풀이하려고해도 시간초과가 발생했다.

이 문제는 직접 힙을 구현해야 풀이할 수 있는 문제였던 것이다. 힙을 구현하기 위해서는 힙에 대한 선수지식이 필요하다. 해당 개념은 [여기](https://github.com/brad-go/algorithm-typescript/tree/main/src/data-structures/heap)에서 볼 수 있다.

힙의 생성자에 비교 함수를 받을 수 있도록해서 최소 힙과, 최대 힙을 생성할 수 있도록 만들고, map 객체를 이용해서 입력받은 정수 전체를 관리하고, 각 힙에서 연산에 따라 추가, 제거를 할 수 있도록 구현해야 했다.

1. 힙을 구현한다.
2. 각 테스트 케이스에 대해 아래를 수행하면서 결과를 answers 배열에 저장한다.
3. 최소힙, 최대힙, 각 요소의 유무를 판단할 map 객체를 생성한다.
4. 입력받은 연산을 수행한다.
5. I 연산이라면 map객체에 해당 값을 키로 해서 값을 증가시키고, 최대, 최소힙 모두에 값을 추가한다.
6. D 연산이라면 값이 0보다 크다면 최대힙, 작다면 최소힙에서 노드를 하나 꺼내면서 map객체에서 값에 해당하는 키의 값을 하나 줄인다. 노드를 꺼내기 전 힙에 불필요한 데이터를 제거하는 과정이 필요하다. (입력되는 값에 따라 최대힙, 최소힙에서 수행하기 때문에) 힙의 루트노드의 값이 map객체에서 0, 즉 이미 제거되었다면 힙이 빌때까지 노드를 꺼내주는 과정이 필요하다.
7. 모든 연산을 수행한 후에 힙의 불필요한 데이터를 제거하는 과정을 각 최대, 최소힙에서 모두 수행한다.
8. 최대힙의 값이 비었다면 'EMPTY'를 반환 아니라면 '최댓값 최솟값'을 반환한다.

## 풀이 코드

```js
class Heap {
  constructor(compareFunction) {
    this.heap = [];
    // 최소힙과 최대힙을 구현하기 위해 비교함수를 입력받는다.
    this.compare = compareFunction;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  peek() {
    return this.heap[0];
  }

  add(node) {
    // 힙의 맨 마지막에 새로운 노드를 집어넣는다.
    this.heap.push(node);
    // 맨 아래에서부터 비교하면서 힙을 정렬한다.
    this.#swim();
  }

  // heapify up 과정
  #swim(index = this.heap.length - 1) {
    // 가장 최근에 삽입된 노드
    const lastNode = this.heap[index];

    // 루트노드까지 올라가면서 비교
    while (index > 0) {
      const parentIndex = this.#getParentIndex(index);
      const parentNode = this.heap[parentIndex];

      // 부모 노드와 비교해서
      // 최소힙인 경우 부모 노드보다 크다면 탈출
      // 최대힙인 경우 부모 노드보다 작다면 탈출
      if (this.compare(parentNode, lastNode)) break;

      // 부모노드와 현재 노드의 위치를 교환
      this.#swap(index, parentIndex);
      // 그 위의 노드와 비교하기 위해 인덱스 수정
      index = parentIndex;
    }
  }

  poll() {
    // 힙의 길이가 1이하라면 힙의 요소를 반환하고 종료
    if (this.size() < 2) return this.heap.pop();

    // 최상위 노드
    const rootNode = this.peek();

    // 맨 뒤의 노드를 맨 위의 노드로 가져오기
    this.heap[0] = this.heap.pop();
    // 아래의 노드들과 비교하면서 힙 정렬하기
    this.#sink();

    // 최소 혹은 최댓값을 반환
    return rootNode;
  }

  // heapify down과정
  #sink(index = 0) {
    // 자식이 있을 때까지 아래로 내려가면서 정렬
    while (this.#hasLeftChild(index)) {
      const leftChildIndex = this.#getLeftChildIndex(index);
      const rightChildIndex = this.#getRightChildIndex(index);
      // 왼쪽 노드와 오른쪽 노드 중에
      // 최대힙이라면 더 큰 자식 노드의 인덱스
      // 최소힙이라면 더 작은 자식 노드의 인덱스를 선택
      const childIndex =
        this.#hasRightChild(index) &&
        this.compare(this.heap[rightChildIndex], this.heap[leftChildIndex])
          ? rightChildIndex
          : leftChildIndex;

      // 현재 노드와 자식 노드를 비교해서
      // 현재 노드가 더 크거나(최대힙) 작다면(최소힙) 탈출
      if (this.compare(this.heap[index], this.heap[childIndex])) break;

      // 현재 노드와 자식 노드의 위치를 교환
      this.#swap(index, childIndex);
      // 그 아래 노드와 비교하기 위해 인덱스 수정
      index = childIndex;
    }
  }

  #swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  #hasLeftChild(index) {
    return this.#getLeftChildIndex(index) < this.size();
  }

  #hasRightChild(index) {
    return this.#getRightChildIndex(index) < this.size();
  }

  #getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  #getLeftChildIndex(index) {
    return index * 2 + 1;
  }

  #getRightChildIndex(index) {
    return index * 2 + 2;
  }
}

let index = 0;
const T = +input[index++];
const answers = [];

// 힙의 불필요한 데이터를 제거하는 함수
const trimHeap = (heap, map) => {
  // map 객체에서 힙의 최상위 노드가 키인 값이 0이라면 이미 제거되었다는 뜻
  // 힙에서 해당 노드를 제거한다.
  while (!heap.isEmpty() && map.get(heap.peek()) === 0) {
    heap.poll();
  }
};

const solution = (operations) => {
  const maxHeap = new Heap((a, b) => a > b);
  const minHeap = new Heap((a, b) => a < b);
  // 두 힙을 관리하기 위해 요소의 유무를 판단할 map 객체가 필요
  const map = new Map();

  const methods = {
    I(value) {
      map.set(value, (map.get(value) || 0) + 1);
      maxHeap.add(value);
      minHeap.add(value);
    },
    D(value) {
      // value가 0 이상이라면 최대힙에서 아니라면 최소힙에서 연산을 수행한다.
      const heap = value > 0 ? maxHeap : minHeap;
      // 힙에 불필요한 요소가 있는지 먼저 확인하고 제거한다.
      trimHeap(heap, map);

      // 힙이 비었다면 그냥 종료
      if (heap.isEmpty()) return;

      const deleted = heap.poll();
      map.set(deleted, map.get(deleted) - 1);
    },
  };

  operations.forEach((operation) => {
    const [command, value] = operation.split(" ");

    methods[command](+value);
  });

  trimHeap(maxHeap, map);
  trimHeap(minHeap, map);

  return maxHeap.isEmpty() ? "EMPTY" : `${maxHeap.peek()} ${minHeap.peek()}`;
};

for (let i = 0; i < T; i++) {
  const k = +input[index++];
  const operations = input.slice(index, k + index);

  answers.push(solution(operations));

  index += k;
}

console.log(answers.join("\n"));
```
