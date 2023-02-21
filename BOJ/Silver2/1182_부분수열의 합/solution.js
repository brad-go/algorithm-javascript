const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, S] = input[0].split(" ").map(Number);
const numbers = input[1].split(" ").map(Number);

const solution = (N, S, numbers) => {
  let answer = 0;

  const dfs = (sum, index) => {
    if (index === N) {
      answer += sum === S ? 1 : 0;
      return;
    }

    dfs(sum, index + 1);
    dfs(sum + numbers[index], index + 1);
  };

  dfs(0, 0);

  return S === 0 ? answer - 1 : answer;
};

console.log(solution(N, S, numbers));
