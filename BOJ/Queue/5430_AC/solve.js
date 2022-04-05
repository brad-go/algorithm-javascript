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

    let reverse = false;
    let isError = false;

    for (let j = 0; j < p.length; j++) {
      if (p[j] === "R") reverse = !reverse;
      if (p[j] === "D") {
        if (!arr.length) {
          isError = true;
          break;
        }

        if (reverse) arr.pop();
        else arr.shift();
      }
    }

    if (isError) answer.push("error");
    else answer.push(JSON.stringify(reverse ? arr.reverse() : arr));
  }
  console.log(answer.join("\n"));
}

Solution(T, input);
