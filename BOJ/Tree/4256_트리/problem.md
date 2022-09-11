# 트리 - 4256

[문제 링크](https://www.acmicpc.net/problem/4256)

## 문제 풀이

### 풀이 설명

전위 순회와 중위 순회, 두가지 순회 결과를 가지고 트리를 복구하는 문제였다. 전위 순회 결과의 가장 왼쪽 원소는 루트 노드를 의미한다. 그리고 중위 순회 결과에서 루트 노드를 기준으로 왼쪽 서브트리와 오른쪽 서브트리의 원소들로 나누어진다.

1. 전위 순회 결과를 통해 루트 노드를 구한다.
2. 중위 순회 결과에서 루트 노드의 인덱스 값을 구한다.
3. 기준이 되는 pivot 인덱스를 1 증가시킨다. (preorder에서 루트 노드를 구할 index)
4. 2에서 구한 인덱스를 기준으로 왼쪽 서브 트리와 오른쪽 서브 트리를 구한다.
5. 각 서브 트리에 대해 위 과정을 반복한다.
6. 루트 노드를 반환한다.
7. 후위 순회 결과를 구해 반환한다.

### 풀이한 코드

```js
// prettier-ignore
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const solution = () => {
  const cases = init();
  // 각 테스트 케이스에 대해 후위 순회 결과값을 구해 저장한다.
  const answer = cases.map(({ N, preorder, inorder }) => {
    // 트리를 복구해 루트 노드를 구한다.
    const root = buildTree(preorder, inorder, 0, N - 1, { index: 0 });
    // 후위 순회 결과를 구한다.
    const result = getPostorderResult(root);

    return result.join(" ");
  });

  return answer.join("\n");
};

// 입력값 초기화하기
const init = () => {
  const cases = [];
  const T = Number(input.shift());

  for (let i = 0; i < T; i++) {
    const N = Number(input.shift());
    const preorder = input.shift().split(" ").map(Number);
    const inorder = input.shift().split(" ").map(Number);

    cases.push({ N, inorder, preorder });
  }

  return cases;
};

// startIndex와 endIndex는 중위 순회 결과를 탐색할 범위를 나타낸다.
// pivot은 위에서 { index: 0 } 이라는 객체를 받아오는데, 이는 전위 순회 결과의
// 인덱스를 하나씩 증가시키며 루트 노드를 구할 때 사용된다.
// 전역 변수를 사용해도 되지만, 사용하기 싫어서 객체를 통해 값을 참조하도록 했다.
// 그냥 매개변수로 값을 넘겨도 되지 않나 생각할 수 있지만, 트리를 복구하는 과정이
// 재귀적으로 파고 들어가서 전위 순회의 다음 인덱스를 가리킬 수 있어야 하는데,
// 매개변수로 원시값을 넘기게 되면 왼쪽 서브트리와 오른쪽 서브트리의 루트 노드를 구할 때
// 같은 인덱스를 통해 같은 루트 노드를 구하게 되므로 문제를 풀이할 수 없다.
const buildTree = (preorder, inorder, startIndex, endIndex, pivot) => {
  // 시작 인덱스가 끝 인덱스보다 크다면 자식 노드를 가지지 않으므로 null 반환
  if (startIndex > endIndex) return null;

  // pivot 인덱스와 전위 순회 결과를 통해 루트 노드 생성
  const root = new Node(preorder[pivot.index]);
  // 왼쪽 및 오른쪽 서브 트리를 구하기 위해 중위 순회 안에서 루트 노드의 위치(인덱스) 구하기
  const rootIndex = findIndex(inorder, startIndex, endIndex, root.value);

  // pivot 인덱스를 증가시켜 다음 루트 노드를 구할 수 있게 해주기
  pivot.index++;
  // 왼쪽 및 오른쪽 서브 트리에 대해 위 과정을 재귀적으로 반복
  root.left = buildTree(preorder, inorder, startIndex, rootIndex - 1, pivot);
  root.right = buildTree(preorder, inorder, rootIndex + 1, endIndex, pivot);

  // 복구된 루트 노드 반환
  return root;
};

const findIndex = (inorder, startIndex, endIndex, target) => {
  for (let i = startIndex; i <= endIndex; i++) {
    if (inorder[i] === target) return i;
  }
};

const getPostorderResult = (root) => {
  const result = [];

  postorderTraversal(root, result);

  return result;
};

const postorderTraversal = (node, result) => {
  if (!node) return;

  postorderTraversal(node.left, result);
  postorderTraversal(node.right, result);
  result.push(node.value);
};

console.log(solution());
```
