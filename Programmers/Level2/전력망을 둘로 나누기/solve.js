const input = require("fs").readFileSync("./input.txt").toString().trim().split("\n"); // prettier-ignore
const n = +input[0];
const wires = input.slice(1).map((str) => str.split(" ").map(Number));

const solution = (n, wires) => {
  const network = wires.reduce((acc, [v1, v2]) => {
    acc[v1] = [...(acc[v1] || []), v2];
    acc[v2] = [...(acc[v2] || []), v1];
    return acc;
  }, {});

  let answer = 100;

  wires.forEach(([v1, v2]) => {
    const diff = Math.abs(
      searchNetwork(network, v1, v2) - searchNetwork(network, v2, v1)
    );

    answer = Math.min(diff, answer);
  });

  return answer;
};

const searchNetwork = (network, root, exception) => {
  const queue = [root];
  const visited = [];

  visited[root] = true;

  let count = 0;

  while (queue.length) {
    const current = queue.pop();

    network[current].forEach((next) => {
      if (next === exception || visited[next]) {
        return;
      }

      visited[next] = true;
      queue.push(next);
    });

    count++;
  }

  return count;
};

console.log(solution(n, wires));
