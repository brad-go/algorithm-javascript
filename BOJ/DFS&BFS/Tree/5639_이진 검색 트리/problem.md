# 이진 검색 트리 - 5639

[문제 링크](https://www.acmicpc.net/problem/5639)

### 성능 요약

메모리: 256MB, 시간 1초

### 문제

이진 검색 트리는 다음과 같은 세 가지 조건을 만족하는 이진 트리이다.

노드의 왼쪽 서브트리에 있는 모든 노드의 키는 노드의 키보다 작다.
노드의 오른쪽 서브트리에 있는 모든 노드의 키는 노드의 키보다 크다.
왼쪽, 오른쪽 서브트리도 이진 검색 트리이다.

![이진 검색 트리](https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/upload/images/bsearchtree.png)

전위 순회 (루트-왼쪽-오른쪽)은 루트를 방문하고, 왼쪽 서브트리, 오른쪽 서브 트리를 순서대로 방문하면서 노드의 키를 출력한다. 후위 순회 (왼쪽-오른쪽-루트)는 왼쪽 서브트리, 오른쪽 서브트리, 루트 노드 순서대로 키를 출력한다. 예를 들어, 위의 이진 검색 트리의 전위 순회 결과는 50 30 24 5 28 45 98 52 60 이고, 후위 순회 결과는 5 28 24 45 30 60 52 98 50 이다.

이진 검색 트리를 전위 순회한 결과가 주어졌을 때, 이 트리를 후위 순회한 결과를 구하는 프로그램을 작성하시오.

### 입력

트리를 전위 순회한 결과가 주어진다. 노드에 들어있는 키의 값은 106보다 작은 양의 정수이다. 모든 값은 한 줄에 하나씩 주어지며, 노드의 수는 10,000개 이하이다. 같은 키를 가지는 노드는 없다.

### 출력

입력으로 주어진 이진 검색 트리를 후위 순회한 결과를 한 줄에 하나씩 출력한다.

### 예제 입력 1

```
50
30
24
5
28
45
98
52
60
```

### 예제 출력 1

```
5
28
24
45
30
60
52
98
50
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

이진 검색 트리를 구현해서 문제를 쉽게 풀 수 있었다.

1. 입력받은 preorder 배열의 각 값들을 하나씩 트리에 넣는다.
2. 재귀 함수를 이용해 각 노드들과 값을 비교한다.

- 작다면 left, 크다면 right
- null값이 나올때까지 반복

3. 트리가 완성되면 postorder를 재귀함수를 이용해 출력한다.

```js
const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.compare = (a, b) => {
      if (a.value === b.value) return 0;
      return a.value > b.value ? -1 : 1;
    };
  }

  insert(value) {
    const node = new TreeNode(value);

    if (!this.root) {
      this.root = node;
      return;
    }

    this.insertNode(this.root, node);
  }

  insertNode(root, node) {
    if (this.compare(root, node) < 0) {
      if (root.left === null) root.left = node;
      else this.insertNode(root.left, node);
    } else {
      if (root.right === null) root.right = node;
      else this.insertNode(root.right, node);
    }
  }

  postorder() {
    return this.postorderNode(this.root);
  }

  postorderNode(node) {
    if (!node) return;

    this.postorderNode(node.left);
    this.postorderNode(node.right);
    console.log(node.value);
  }
}

function Solution(preorder) {
  const tree = new BinarySearchTree();

  preorder.forEach((value) => tree.insert(value));

  tree.postorder();
}

Solution(input);
```

</div>
</details>
