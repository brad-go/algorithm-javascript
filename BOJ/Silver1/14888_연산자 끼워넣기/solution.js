const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const numbers = input[1].split(" ").map(Number);
const operators = input[2].split(" ").map(Number);

const solution = (N, numbers, operators) => {
  const answers = [];
  const operate = {
    0: (num1, num2) => num1 + num2,
    1: (num1, num2) => num1 - num2,
    2: (num1, num2) => num1 * num2,
    3: (num1, num2) => {
      return num1 < 0 || num2 < 0
        ? Math.ceil(num1 / num2)
        : Math.floor(num1 / num2);
    },
  };

  const dfs = (current, index) => {
    if (index === N - 1) {
      answers.push(current);
      return;
    }

    for (let i = 0; i < 4; i++) {
      if (operators[i] === 0) continue;

      operators[i]--;
      dfs(operate[i](current, numbers[index + 1]), index + 1);
      operators[i]++;
    }
  };

  dfs(numbers[0], 0);

  return `${Math.max(...answers)}\n${Math.min(...answers)}`;
};

console.log(solution(N, numbers, operators));
