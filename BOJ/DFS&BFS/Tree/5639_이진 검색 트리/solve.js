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
