const [N, K] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map((v) => +v);

function Solution(N, K) {
  const queue = new Array(N).fill().map((v, idx) => idx + 1);
  const result = [];

  while (queue.length > 0) {
    for (let i = 0; i < K - 1; i++) {
      const deq = queue.shift();
      queue.push(deq);
    }
    const cur = queue.shift();
    result.push(cur);
  }
  console.log(`<${result.join(", ")}>`);
}

Solution(N, K);
