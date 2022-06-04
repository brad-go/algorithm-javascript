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
