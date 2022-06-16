const [n, ...input] = require("fs")
  .readFileSync("./input3.txt")
  .toString()
  .trim()
  .split("\n");
const N = Number(n);
const distances = input[0].split(" ").map((v) => BigInt(v));
const oilPrices = input[1].split(" ").map((v) => BigInt(v));

const solution = (N, distances, oilPrices) => {
  const refuel = (current, visited) => {
    let price = 0n;

    for (let i = current; i < N - 1; i++) {
      if (oilPrices[current] > oilPrices[i]) break;

      visited[i] = true;

      price += distances[i] * oilPrices[current];
    }

    return price;
  };

  const visited = new Array(N).fill(0);
  let answer = 0n;

  for (let i = 0; i < N - 1; i++) {
    if (visited[i]) continue;

    const price = refuel(i, visited);
    answer += price;
  }

  console.log(String(answer));
};

solution(N, distances, oilPrices);
