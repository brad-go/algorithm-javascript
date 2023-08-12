const filePath = process.platform === "linux" ? "dev/stdin" : "./input2.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n'); // prettier-ignore
const K = +input[0];
const numbers = input[1].split(" ").map(Number);

const solution = (K, numbers) => {
  const tree = Array.from({ length: K }, () => []);

  inorderTraversal(numbers, tree, 0, 0, numbers.length);

  return tree.map((row) => row.join(" ")).join("\n");
};

const inorderTraversal = (numbers, tree, depth, start, end) => {
  if (start >= end) {
    return;
  }

  const mid = Math.floor((start + end) / 2);

  tree[depth].push(numbers[mid]);

  inorderTraversal(numbers, tree, depth + 1, start, mid);
  inorderTraversal(numbers, tree, depth + 1, mid + 1, end);
};

console.log(solution(K, numbers));
