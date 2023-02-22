const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input4.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M, V] = input[0].split(" ").map(Number);
const edges = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (N, M, V, edges) => {
  const graph = Array.from(Array(N + 1), () => []);
  const visited = new Array(N + 1).fill(false);
  const results = { dfs: [], bfs: [] };

  edges.forEach(([vertexA, vertexB]) => {
    graph[vertexA].push(vertexB);
    graph[vertexB].push(vertexA);
  });

  graph.forEach((vertices) => vertices.sort((a, b) => a - b));

  dfs(graph, visited, V, results);

  visited.fill(false);

  bfs(graph, visited, V, results);

  return `${results.dfs.join(" ")}\n${results.bfs.join(" ")}`;
};

const dfs = (graph, visited, index, results) => {
  if (visited[index]) return;

  visited[index] = true;
  results.dfs.push(index);

  for (const next of graph[index]) {
    if (visited[next]) continue;

    dfs(graph, visited, next, results);
  }
};

const bfs = (graph, visited, index, results) => {
  const queue = [index];

  visited[index] = true;

  while (queue.length) {
    const vertex = queue.shift();

    results.bfs.push(vertex);

    for (const next of graph[vertex]) {
      if (visited[next]) continue;

      visited[next] = true;
      queue.push(next);
    }
  }
};

console.log(solution(N, M, V, edges));
