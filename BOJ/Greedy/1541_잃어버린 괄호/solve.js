const input = require("fs").readFileSync("./input4.txt").toString().trim();

const solution = (input) => {
  const operator = input.split(/\d/).filter((v) => v !== "");
  const numbers = input.split(/\D/).map(Number);

  let answer = numbers.shift();
  let inParenthesis = false;

  for (let i = 0; i < numbers.length; i++) {
    if (operator[i] === "-") inParenthesis = true;

    if (inParenthesis) {
      answer -= numbers[i];
      continue;
    }

    answer += numbers[i];
  }

  console.log(answer);
};

solution(input);
