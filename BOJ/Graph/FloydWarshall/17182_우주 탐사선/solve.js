// prettier-ignore
const [nk, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, K] = nk.split(" ").map(Number);
const graph = input.map((line) => line.split(" ").map(Number));

function solution(N, K, graph) {
  const exploration = floydWarshall(N, graph);
  const visited = new Array(N).fill(false);
  visited[K] = true;

  const explorationTimes = backTracking(exploration, visited, K, 0, 1, []);
  return Math.min(...explorationTimes);
}

const floydWarshall = (N, graph) => {
  const d = [...graph.map((line) => [...line])];

  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (d[i][k] + d[k][j] < d[i][j]) d[i][j] = d[i][k] + d[k][j];
      }
    }
  }

  return d;
};

const backTracking = (graph, visited, vertex, time, cnt, explorationTimes) => {
  if (cnt === N) {
    explorationTimes.push(time);
    return explorationTimes;
  }

  for (let i = 0; i < graph[vertex].length; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    backTracking(graph, visited, i, time + graph[vertex][i], cnt + 1, explorationTimes); // prettier-ignore
    visited[i] = false;
  }

  return explorationTimes;
};

console.log(solution(N, K, graph));
