const [T, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

function Solution(input) {
  const fibonacci = (n, answer) => {
    if (n === 0) {
      answer[0]++;
      return;
    } else if (n === 1) {
      answer[1]++;
      return;
    } else {
      return fibonacci(n - 1, answer) + fibonacci(n - 2, answer);
    }
  };

  for (let n of input) {
    const answer = [0, 0];

    fibonacci(n, answer);
    console.log(answer.join(" "));
  }
}

Solution(input);
