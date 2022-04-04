const input = require("fs")
  .readFileSync("./input4.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(input) {
  const [n, m] = input[0].split(" ").map((v) => +v);
  const position = input[1].split(" ").map((v) => +v);

  const queue = new Array(n).fill().map((v, i) => i + 1);

  let count = 0;

  for (let i = 0; i < position.length; i++) {
    if (queue[0] === position[i]) queue.shift();
    else {
      const mid = queue.indexOf(queue[Math.floor(queue.length / 2)]);

      while (queue[0] !== position[i]) {
        if (queue.indexOf(position[i]) <= mid) {
          const cur = queue.shift();
          queue.push(cur);
          count++;
        } else {
          const cur = queue.pop();
          queue.unshift(cur);
          count++;
        }
      }
      queue.shift();
    }
  }
  console.log(count);
}

Solution(input);
