// prettier-ignore
const [nc, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, C] = nc.split(" ").map(Number);
const lines = input.map((line) => line.split(" ").map(Number));

class Vertex {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
}

function solution(N, C, lines) {
  const vertices = [];
  const graph = Array.from(Array(N), () => []);

  lines.forEach((line, idx) => {
    const [x, y] = line;
    vertices.push(new Vertex(idx, x, y));
  });

  vertices.forEach((vertex, idx) => {
    for (let i = 0; i < N; i++) {
      const cost = getCost(vertex, vertices[i]);
      if (cost <= C) continue;

      graph[idx].push({ linkedVertex: vertices[i], cost });
    }
  });

  const queue = [vertices[0]];
  const visited = new Array(N).fill(false);
  visited[vertices[0].id] = true;

  let totalCost = 0;

  while (queue.length) {
    const vertex = queue.shift();

    for (let v of graph[vertex.id]) {
      const { linkedVertex, cost } = v;

      if (visited[linkedVertex.id]) continue;

      totalCost += cost;
      queue.push(linkedVertex);
    }
  }

  if (visited.some((visit) => visit === 0)) return -1;
  return totalCost;
}

const getCost = (pointX, pointY) => {
  const { x: xi, y: yi } = pointX;
  const { x: xj, y: yj } = pointY;

  return Math.pow(xi - xj, 2) + Math.pow(yi - yj, 2);
};

console.log(solution(N, C, lines));
