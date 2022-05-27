const [nmr, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

class ArrayList {
  constructor(size = 0) {
    this.array = new Array(size).fill(0);
    this.length = 0;
  }

  add(value) {
    this.array[this.length] = value;
    this.length++;
  }

  get(index) {
    if (index < 0 || index > this.length) return -1;

    return this.array[index];
  }

  sort() {
    this.array.sort((a, b) => b - a);
  }

  *iterator() {
    if (!this.length) return;

    let idx = 0;
    let current = this.array[idx];

    while (current) {
      yield current;
      current = this.array[++idx];
    }
  }

  [Symbol.iterator]() {
    return this.iterator();
  }
}

class Node {
  constructor(item) {
    this.item = item;
    this.prev = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.length = 0;
  }

  push(item) {
    const node = new Node(item);

    if (this.length) node.prev = this.top;

    this.top = node;
    this.length++;
  }

  pop() {
    if (!this.length) return null;

    const node = this.top;
    this.top = this.top.prev;
    this.length--;

    return node.item;
  }
}

const [N, M, R] = nmr.split(" ").map(Number);
const edges = input.map((edge) => edge.split(" ").map(Number));

function Solution(N, M, R, edges) {
  const graph = new ArrayList(N + 1);

  for (let i = 1; i <= N; i++) graph.array[i] = new ArrayList();

  const visited = new Array(N + 1).fill(false);
  const answer = new Array(N + 1).fill(0);

  for (let edge of edges) {
    const [from, to] = edge;

    graph.array[from].add(to);
    graph.array[to].add(from);
  }

  for (let i = 1; i <= N; i++) graph.array[i].sort();

  let idx = 1;
  const stack = new Stack();
  visited[R] = 1;
  stack.push(R);

  while (stack.length) {
    const current = stack.pop();
    visited[current] = true;

    if (!answer[current]) answer[current] = idx++;

    for (let next of graph.array[current]) {
      if (visited[next]) continue;

      stack.push(next);
    }
  }

  for (let i = 1; i < answer.length; i++) console.log(answer[i]);
}

Solution(N, M, R, edges);

// Sol 2

// const [N, M, R] = nmr.split(" ").map(Number);
// const edges = input.map((edge) => edge.split(" ").map(Number));

// function Solution(N, M, R, edges) {
//   const graph = new ArrayList(N + 1);

//   for (let i = 1; i <= N; i++) graph.array[i] = new ArrayList();

//   const visited = new Array(N + 1).fill(false);
//   const answer = new Array(N + 1).fill(0);

//   for (let edge of edges) {
//     const [from, to] = edge;

//     graph.array[from].add(to);
//     graph.array[to].add(from);
//   }

//   for (let i = 1; i <= N; i++) graph.array[i].sort();

//   let idx = 1;
//   visited[R] = true;

//   const dfs = (current) => {
//     answer[current] = idx++;

//     for (let vertex of graph.array[current]) {
//       if (visited[vertex]) continue;

//       visited[vertex] = true;
//       dfs(vertex);
//     }
//   };

//   dfs(R);

//   for (let i = 1; i < answer.length; i++) console.log(answer[i]);
// }

// Solution(N, M, R, edges);

// Sol 1

// const [N, M, R] = nmr.split(" ").map(Number);
// const edges = input.map((edge) => edge.split(" ").map(Number));

// function Solution(N, M, R, edges) {
//   const graph = Array.from(Array(N + 1), () => []);
//   const visited = new Array(N + 1).fill(false);
//   const answer = new Array(N + 1).fill(0);

//   for (let edge of edges) {
//     const [from, to] = edge;

//     graph[from].push(to);
//     graph[to].push(from);
//   }

//   for (let i = 1; i <= N; i++) graph[i].sort((a, b) => a - b);

//   let idx = 1;
//   visited[R] = true;

//   const dfs = (current) => {
//     answer[current] = idx++;

//     for (let vertex of graph[current]) {
//       if (visited[vertex]) continue;

//       visited[vertex] = true;
//       dfs(vertex);
//     }
//   };

//   dfs(R);

//   for (let i = 1; i < answer.length; i++) console.log(answer[i]);
// }

// Solution(N, M, R, edges);
