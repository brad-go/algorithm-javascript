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
  const answer = cases.map(({ N, preorder, inorder }) => {
    const root = buildTree(preorder, inorder, 0, N - 1, { index: 0 });
    const result = getPostorderResult(root);

    return result.join(" ");
  });

  return answer.join("\n");
};

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

const buildTree = (preorder, inorder, startIndex, endIndex, pivot) => {
  if (startIndex > endIndex) return null;

  const root = new Node(preorder[pivot.index]);
  const rootIndex = findIndex(inorder, startIndex, endIndex, root.value);

  pivot.index++;
  root.left = buildTree(preorder, inorder, startIndex, rootIndex - 1, pivot);
  root.right = buildTree(preorder, inorder, rootIndex + 1, endIndex, pivot);

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
