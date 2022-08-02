// prettier-ignore
const [nc, ...input] = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, C] = nc.split(" ").map(Number);
const lines = input.map((line) => line.split(" ").map(Number));

class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Edge {
  constructor(v1, v2, cost) {
    this.v1 = v1;
    this.v2 = v2;
    this.cost = cost;
  }
}

function solution(N, C, lines) {
  const vertices = [];
  const edges = [];

  lines.forEach((line) => {
    const [x, y] = line;
    vertices.push(new Vertex(x, y));
  });

  vertices.forEach((vertex, idx) => {
    for (let i = 0; i < N; i++) {
      const cost = getCost(vertex, vertices[i]);
      if (cost <= C) continue;

      edges.push(new Edge(idx, i, cost));
    }
  });

  edges.sort((a, b) => a.cost - b.cost);

  const parent = new Array(N).fill().map((_, idx) => idx);
  const answer = [];

  for (let edge of edges) {
    const { v1, v2, cost } = edge;

    if (!findParent(parent, v1, v2)) {
      answer.push(cost);
      unionParent(parent, v1, v2);
    }
  }

  return answer.length !== N - 1
    ? -1
    : answer.reduce((acc, cur) => acc + cur, 0);
}

const getCost = (pointX, pointY) => {
  const { x: xi, y: yi } = pointX;
  const { x: xj, y: yj } = pointY;

  return Math.pow(xi - xj, 2) + Math.pow(yi - yj, 2);
};

const getParent = (parent, idx) => {
  if (parent[idx] === idx) return idx;

  return (parent[idx] = getParent(parent, parent[idx]));
};

const findParent = (parent, x, y) => {
  const v1 = getParent(parent, x);
  const v2 = getParent(parent, y);

  if (v1 === v2) return true;
  return false;
};

const unionParent = (parent, x, y) => {
  const v1 = getParent(parent, x);
  const v2 = getParent(parent, y);

  if (v1 < v2) return (parent[v2] = v1);
  return (parent[v1] = v2);
};

console.log(solution(N, C, lines));
