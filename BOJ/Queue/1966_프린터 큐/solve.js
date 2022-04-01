const [T, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(T, input) {
  for (let i = 0; i < T; i++) {
    const [N, M] = input
      .shift()
      .split(" ")
      .map((v) => +v);
    const importance = input
      .shift()
      .split(" ")
      .map((v) => +v);

    const queue = [];
    for (let i = 0; i < N; i++) queue.push([i, importance[i]]);

    if (queue.length < 2) {
      console.log(1);
      continue;
    }

    const result = [];

    while (queue.length > 0) {
      const cur = queue.shift();
      const isInsignificant = queue.some((num) => num[1] > cur[1]);

      if (isInsignificant) {
        queue.push(cur);
        continue;
      }

      result.push(cur[0]);
    }

    const answer = result.findIndex((num) => num === M) + 1;
    console.log(answer);
  }
}

Solution(T, input);
