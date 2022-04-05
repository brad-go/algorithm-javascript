const [T, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(T, input) {
  const answer = [];

  for (let i = 0; i < T; i++) {
    const p = input.shift().split("");
    const n = input.shift();
    const arr = JSON.parse(input.shift());

    for (let j = 0; j < p.length; j++) {
      if (p[j] === "R") arr.reverse();
      if (p[j] === "D") {
        if (!arr.length) {
          answer.push("error");
          break;
        } else {
          arr.shift();
        }
      }
    }

    if (arr.length) answer.push(JSON.stringify(arr));
  }
  console.log(answer.join("\n"));
}

Solution(T, input);
