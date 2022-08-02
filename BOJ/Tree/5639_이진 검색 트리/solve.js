const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function Solution(preorder) {
  // 전위 순회 결과 배열의 시작, 끝 인덱스 삽입
  const result = [];
  const stack = [[0, preorder.length - 1]];

  while (stack.length) {
    const [start, end] = stack.pop();

    if (start > end) continue;

    // 루트보다 큰 숫자들 중 가장 앞 숫자가 오른쪽 서브 트리의 루트
    let pivot;
    for (let i = start + 1; i <= end; i++) {
      if (preorder[i] < preorder[start]) continue;
      pivot = i;
      break;
    }

    // 오른쪽 서브트리가 존재한다면
    if (pivot) {
      // 왼쪽 서브 트리의 시작 끝, 인덱스 삽입
      stack.push([start + 1, pivot - 1]);
      // 오른쪽 서브 트리의 시작, 끝 인덱스 삽입
      stack.push([pivot, end]);
    } else {
      // 루트를 제외한 나머지 숫자들 삽입
      stack.push([start + 1, end]);
    }

    // 루트 삽입
    result.unshift(input[start]);
  }

  console.log(result.join(" "));
}

Solution(input);

// class TreeNode {
//   constructor(value) {
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   }
// }

// class BinarySearchTree {
//   constructor() {
//     this.root = null;
//     this.compare = (a, b) => {
//       if (a.value === b.value) return 0;
//       return a.value > b.value ? -1 : 1;
//     };
//   }

//   insert(value) {
//     const node = new TreeNode(value);

//     if (!this.root) {
//       this.root = node;
//       return;
//     }

//     this.insertNode(this.root, node);
//   }

//   insertNode(root, node) {
//     if (this.compare(root, node) < 0) {
//       if (root.left === null) root.left = node;
//       else this.insertNode(root.left, node);
//     } else {
//       if (root.right === null) root.right = node;
//       else this.insertNode(root.right, node);
//     }
//   }

//   postorder() {
//     return this.postorderNode(this.root);
//   }

//   postorderNode(node) {
//     if (!node) return;

//     this.postorderNode(node.left);
//     this.postorderNode(node.right);
//     console.log(node.value);
//   }
// }

// function Solution(preorder) {
//   const tree = new BinarySearchTree();

//   preorder.forEach((value) => tree.insert(value));

//   tree.postorder();
// }

// Solution(input);
