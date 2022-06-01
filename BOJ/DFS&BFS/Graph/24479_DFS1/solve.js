const [nmr, ...input] = require("fs")
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

// Sol 2

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

  *iterator() {
    if (!this.length) return;

    let current = this.top;

    while (current) {
      yield current.item;
      current = current.prev;
    }
  }

  [Symbol.iterator]() {
    return this.iterator();
  }
}

function Solution(nmr, input) {
  const [N, M, R] = nmr.split(" ").map(Number);
  const graph = Array.from(Array(N + 1), () => []);
  const visited = new Array(N + 1).fill(0);
  const numbers = new Array(N + 1).fill(0);

  for (let i = 1; i < M; i++) {
    const [from, to] = input[i].split(" ").map(Number);
    graph[from].push(to);
    graph[to].push(from);
  }

  for (let i = 1; i < N + 1; i++) graph[i].sort((a, b) => b - a);

  let cnt = 1;
  const stack = new Stack();
  stack.push(R);
  visited[R] = 1;

  while (stack.length) {
    const vertex = stack.pop();
    visited[vertex] = 1;

    if (!numbers[vertex]) {
      numbers[vertex] = cnt;
      cnt++;
    }

    for (let v of graph[vertex]) {
      if (visited[v]) continue;
      stack.push(v);
    }
  }

  for (let i = 1; i < N + 1; i++) console.log(numbers[i]);
}

Solution(nmr, input);

// Sol 1

// function Solution(nmr, input) {
//   const [N, M, R] = nmr.split(" ").map(Number);
//   const graph = Array.from(Array(N + 1), () => []);
//   const visited = new Array(N + 1).fill(0);
//   const numbers = new Array(N + 1).fill(0);

//   for (let i = 1; i < M; i++) {
//     const [from, to] = input[i].split(" ").map(Number);
//     graph[from].push(to);
//     graph[to].push(from);
//   }

//   for (let i = 1; i < N + 1; i++) graph[i].sort((a, b) => a - b);

//   let cnt = 0;
//   const dfs = (vertex) => {
//     cnt++;

//     visited[vertex] = 1;
//     numbers[vertex] = cnt;

//     for (let v of graph[vertex]) {
//       if (visited[v]) continue;

//       dfs(v);
//     }
//   };

//   dfs(R);

//   for (let i = 1; i < N + 1; i++) console.log(numbers[i]);
// }

// Solution(nmr, input);

// class ArrayList {
//   constructor(size = 0) {
//     this.array = new Array(size).fill(0);
//     this.length = 0;
//   }

//   add(value) {
//     this.array[this.length] = value;
//     this.length++;
//   }

//   get(index) {
//     if (index < 0 || index > this.length) return -1;

//     return this.array[index];
//   }

//   sort() {
//     this.array.sort((a, b) => b - a);
//   }

// *iterator() {
//   if (!this.length) return;

//   let idx = 0;
//   let current = this.array[idx];

//   while (current) {
//     yield current;
//     current = this.array[++idx];
//   }
// }

// [Symbol.iterator]() {
//   return this.iterator();
// }
// }

// class Node {
//   constructor(item) {
//     this.item = item;
//     this.prev = null;
//   }
// }

// class Stack {
//   constructor() {
//     this.top = null;
//     this.length = 0;
//   }

//   push(item) {
//     const node = new Node(item);

//     if (this.length) node.prev = this.top;

//     this.top = node;
//     this.length++;
//   }

//   pop() {
//     if (!this.length) return null;

//     const node = this.top;
//     this.top = this.top.prev;
//     this.length--;

//     return node.item;
//   }
// }

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
//   const stack = new Stack();
//   visited[R] = 1;
//   stack.push(R);

//   while (stack.length) {
//     const current = stack.pop();
//     visited[current] = true;

//     if (!answer[current]) answer[current] = idx++;

//     for (let next of graph.array[current]) {
//       if (visited[next]) continue;

//       stack.push(next);
//     }
//   }

//   for (let i = 1; i < answer.length; i++) console.log(answer[i]);
// }

// Solution(N, M, R, edges);

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
