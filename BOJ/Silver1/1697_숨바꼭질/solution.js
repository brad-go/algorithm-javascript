const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, K] = fs.readFileSync(filePath).toString().trim().split(" ").map(Number); // prettier-ignore

const solution = (N, K) => {
  if (N >= K) return N - K;

  const bfs = (start, target) => {
    const BOUNDARY = { max: 100_000, min: 0 };
    const queue = [[start, 0]];
    const visited = new Array(BOUNDARY.max + 1).fill(false);

    visited[start] = true;

    while (queue.length) {
      const [position, time] = queue.shift();

      for (const next of [position + 1, position - 1, position * 2]) {
        if (next > BOUNDARY.max || next < BOUNDARY.min || visited[next])
          continue;

        if (next === target) return time + 1;

        visited[next] = true;
        queue.push([next, time + 1]);
      }
    }
  };

  return bfs(N, K);
};

console.log(solution(N, K));
