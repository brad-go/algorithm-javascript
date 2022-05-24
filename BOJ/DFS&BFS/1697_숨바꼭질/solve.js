const [N, K] = require("fs")
  .readFileSync("./input3.txt")
  .toString()
  .trim()
  .split(" ")
  .map((v) => +v);

function Solution(START, END) {
  const bfs = (START, END) => {
    const MAX_POS = 100000;
    const q = [[START, 0]];
    const visited = Array(MAX_POS + 1).fill(false);

    while (q.length) {
      const [pos, time] = q.shift();

      if (visited[pos]) continue;
      visited[pos] = true;

      if (pos === END) {
        console.log(time);
        return;
      }

      if (pos * 2 <= MAX_POS) q.push([pos * 2, time + 1]);
      if (pos + 1 <= MAX_POS) q.push([pos + 1, time + 1]);
      if (pos - 1 >= 0) q.push([pos - 1, time + 1]);
    }
  };

  bfs(START, END);
}

Solution(N, K);
