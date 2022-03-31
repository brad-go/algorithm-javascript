const [N, K] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map((v) => +v);

function Solution(N, K) {
  const people = new Array(N).fill().map((v, idx) => idx + 1);
  const result = [];

  while (people.length > 2) {
    for (let i = 0; i < K - 1; i++) {
      const cur = people.shift();
      people.push(cur);
    }
    const pop = people.shift();
    result.push(pop);
  }

  people.forEach((num) => result.push(num));
  console.log(`<${result.join(", ")}>`);
}

Solution(N, K);
