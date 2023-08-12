# 9934. 완전 이진 트리

## 문제 링크

https://www.acmicpc.net/problem/9934

## 문제 분류

: 재귀, 트리

## 소요 시간

: 40분

## 풀이 방법

1. 길이가 K인 이차원 배열 tree를 생성한다.
2. 아래를 반복하면서 tree를 채운다.
3. 현재 배열의 중앙을 root로 지정하고 해당 값을 tree의 index에 push한다.
4. root를 기준으로 왼쪽과 오른쪽 배열의 길이가 0보다 크다면 3부터 다시 실행.

## 풀이 코드

```js
const solution = (K, numbers) => {
  const tree = Array.from(Array(K), () => []);
  let answer = "";

  findTree(numbers, tree, 0);

  tree.forEach((row) => (answer += `${row.join(" ")}\n`));

  return answer.trim();
};

const findTree = (subTree, tree, index) => {
  const rootIndex = Math.floor(subTree.length / 2);
  const root = subTree[rootIndex];
  const leftTree = subTree.slice(0, rootIndex);
  const rightTree = subTree.slice(rootIndex + 1);

  tree[index].push(root);

  if (leftTree.length > 0) {
    findTree(leftTree, tree, index + 1);
  }

  if (rightTree.length > 0) {
    findTree(rightTree, tree, index + 1);
  }
};
```

## 코드 개선

slice를 통해 좌우의 sub tree를 생성하지 않고 index를 이용해서 문제를 풀이할 수 있다.

```js
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
```
