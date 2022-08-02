// prettier-ignore
const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n');
const [N, Q] = input[0].split(" ").map(Number);
const edges = input.slice(1, N).map((edge) => edge.split(" ").map(Number));
const QUESTION = input.slice(N).map((quest) => quest.split(" ").map(Number));

function solution(N, Q, edges, QUESTION) {
  const graph = Array.from(Array(N + 1), () => []);

  edges.forEach((edge) => {
    const [from, to, usado] = edge;

    graph[from].push({ linked: to, usado });
    graph[to].push({ linked: from, usado });
  });

  QUESTION.forEach((question) => {
    const [K, V] = question;
    const queue = [V];
    const visited = new Array(N + 1).fill(false);

    let recommended = 0;
    visited[V] = true;

    while (queue.length) {
      const vertex = queue.shift();

      for (let video of graph[vertex]) {
        const { linked, usado } = video;

        if (visited[linked] || usado < K) continue;

        visited[linked] = true;
        recommended++;
        queue.push(linked);
      }
    }
    console.log(recommended);
  });
}

solution(N, Q, edges, QUESTION);
