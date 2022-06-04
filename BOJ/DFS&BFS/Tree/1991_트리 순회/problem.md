# 트리의 지름 - 1991

[문제 링크](https://www.acmicpc.net/problem/1991)

### 성능 요약

메모리: 128MB, 시간 2초

### 문제

이진 트리를 입력받아 전위 순회(preorder traversal), 중위 순회(inorder traversal), 후위 순회(postorder traversal)한 결과를 출력하는 프로그램을 작성하시오.

![이진 트리](https://www.acmicpc.net/JudgeOnline/upload/201007/trtr.png)

예를 들어 위와 같은 이진 트리가 입력되면,

전위 순회한 결과 : ABDCEFG // (루트) (왼쪽 자식) (오른쪽 자식)
중위 순회한 결과 : DBAECFG // (왼쪽 자식) (루트) (오른쪽 자식)
후위 순회한 결과 : DBEGFCA // (왼쪽 자식) (오른쪽 자식) (루트)
가 된다.

### 입력

첫째 줄에는 이진 트리의 노드의 개수 N(1 ≤ N ≤ 26)이 주어진다. 둘째 줄부터 N개의 줄에 걸쳐 각 노드와 그의 왼쪽 자식 노드, 오른쪽 자식 노드가 주어진다. 노드의 이름은 A부터 차례대로 알파벳 대문자로 매겨지며, 항상 A가 루트 노드가 된다. 자식 노드가 없는 경우에는 .으로 표현한다.

### 출력

첫째 줄에 전위 순회, 둘째 줄에 중위 순회, 셋째 줄에 후위 순회한 결과를 출력한다. 각 줄에 N개의 알파벳을 공백 없이 출력하면 된다.

### 예제 입력 1

```
7
A B C
B D .
C E F
E . .
F . G
D . .
G . .
```

### 예제 출력 1

```
ABDCEFG
DBAECFG
DBEGFCA
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

트리를 직접 구현해서 문제를 풀었다. 더 간단한 방법이 있을 것 같았지만, 트리의 개념을 공부한대로 제대로 풀어보고 싶었다.

### 트리노드 구현

value와 left, right 값을 가진다.

```js
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
```

### 트리 구현

직접 트리를 구현하는 것에 있어서 조금 애를 먹었다. 각 노드의 값과 left, right가 순서대로 들어오는데, 트리에 어떻게
집어넣을 수 있는가가 문제였다. 그래서 다음과 같이 insert와 insertNode를 이용해서 root부터 시작해 각 값을 비교해서 같은 값이라면
노드를 연결하는 방식으로 트리를 구성했다.

순회하는 함수는 재귀 함수를 이용해서 구현했는데, 원래 문자열로 이용해서 반환값을 내려고 했는데, 생각처럼 되지 않았다. 이유를 찾아봐야겠다.

```js
class Tree {
  constructor() {
    this.root = null;
  }

  // 노드를 만드는 함수
  makeNode(value, left, right) {
    const node = new TreeNode(value);
    const leftNode = left !== "." ? new TreeNode(left) : null;
    const rightNode = right !== "." ? new TreeNode(right) : null;

    node.left = leftNode;
    node.right = rightNode;

    return node;
  }

  // 트리에 적절한 위치를 찾아 노드를 삽입
  insert(node) {
    if (!this.root) this.root = node;
    else this.insertNode(this.root, node);
  }

  insertNode(node, current) {
    if (!node) return;

    if (node.left && node.left.value === current.value) node.left = current;
    else if (node.right && node.right.value === current.value)
      node.right = current;
    else {
      this.insertNode(node.left, current);
      this.insertNode(node.right, current);
    }
  }

  // 중위 순회
  inorderTraverse() {
    const traverse = [];
    this.inorderTraverseNode(this.root, traverse);
    return traverse.join("");
  }

  inorderTraverseNode(node, traverse) {
    if (node !== null) {
      this.inorderTraverseNode(node.left, traverse);
      traverse.push(node.value);
      this.inorderTraverseNode(node.right, traverse);
    }
  }

  // 전위 순회
  preorderTraverse() {
    const traverse = [];
    this.preorderTraverseNode(this.root, traverse);
    return traverse.join("");
  }

  preorderTraverseNode(node, traverse) {
    if (node !== null) {
      traverse.push(node.value);
      this.preorderTraverseNode(node.left, traverse);
      this.preorderTraverseNode(node.right, traverse);
    }
  }

  // 후위 순회
  postorderTraverse() {
    const traverse = [];
    this.postorderTraverseNode(this.root, traverse);
    return traverse.join("");
  }

  postorderTraverseNode(node, traverse) {
    if (node !== null) {
      this.postorderTraverseNode(node.left, traverse);
      this.postorderTraverseNode(node.right, traverse);
      traverse.push(node.value);
    }
  }
}
```

### 전체 코드

```js
const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
    this.compare = (a, b) => {
      if (a === b) return 0;
      return a < b ? -1 : 1;
    };
  }

  makeNode(value, left, right) {
    const node = new TreeNode(value);
    const leftNode = left !== "." ? new TreeNode(left) : null;
    const rightNode = right !== "." ? new TreeNode(right) : null;

    node.left = leftNode;
    node.right = rightNode;

    return node;
  }

  insert(node) {
    if (!this.root) this.root = node;
    else this.insertNode(this.root, node);
  }

  insertNode(node, current) {
    if (!node) return;

    if (node.left && node.left.value === current.value) node.left = current;
    else if (node.right && node.right.value === current.value)
      node.right = current;
    else {
      this.insertNode(node.left, current);
      this.insertNode(node.right, current);
    }
  }

  inorderTraverse() {
    const traverse = [];
    this.inorderTraverseNode(this.root, traverse);
    return traverse.join("");
  }

  inorderTraverseNode(node, traverse) {
    if (node !== null) {
      this.inorderTraverseNode(node.left, traverse);
      traverse.push(node.value);
      this.inorderTraverseNode(node.right, traverse);
    }
  }

  preorderTraverse() {
    const traverse = [];
    this.preorderTraverseNode(this.root, traverse);
    return traverse.join("");
  }

  preorderTraverseNode(node, traverse) {
    if (node !== null) {
      traverse.push(node.value);
      this.preorderTraverseNode(node.left, traverse);
      this.preorderTraverseNode(node.right, traverse);
    }
  }

  postorderTraverse() {
    const traverse = [];
    this.postorderTraverseNode(this.root, traverse);
    return traverse.join("");
  }

  postorderTraverseNode(node, traverse) {
    if (node !== null) {
      this.postorderTraverseNode(node.left, traverse);
      this.postorderTraverseNode(node.right, traverse);
      traverse.push(node.value);
    }
  }
}

const tree = new Tree();

input.forEach((nodeInfo) => {
  const [value, left, right] = nodeInfo.split(" ");

  const node = tree.makeNode(value, left, right);
  tree.insert(node);
});

function Solution(tree) {
  console.log(tree.preorderTraverse());
  console.log(tree.inorderTraverse());
  console.log(tree.postorderTraverse());
}

Solution(tree);
```

</div>
</details>
