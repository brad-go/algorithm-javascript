const input = require('fs').readFileSync('./input.txt').toString().trim().split('\n'); // prettier-ignore
const N = +input[0];
const road = input.slice(1, -1).map((str) => str.split(" ").map(Number));
const K = +input[input.length - 1];

const solution = (N, road, K) => {
  const villages = Array.from(Array(N + 1), () => []);
  const visited = new Array(N + 1).fill(0);
  const deliveryableVillage = new Set();

  road.forEach(([from, to, time]) => {
    villages[from].push({ to, time });
    villages[to].push({ to: from, time });
  });

  const dfs = (index, visited, total) => {
    for (const village of villages[index]) {
      const { to, time } = village;

      if (visited[to]) continue;

      visited[to] = 1;

      if (total + time <= K) {
        deliveryableVillage.add(to);
        dfs(to, visited, total + time);
      }

      visited[to] = 0;
    }
  };

  visited[1] = 1;
  deliveryableVillage.add(1);

  dfs(1, visited, 0);

  return deliveryableVillage.size;
};

console.log(solution(N, road, K));
