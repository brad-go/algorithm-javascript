const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, M] = fs.readFileSync(filePath).toString().trim().split(' ').map(Number); // prettier-ignore

const solution = (N, M) => {
  const progression = [];
  const outputs = [];

  const dfs = (index) => {
    if (index === M) {
      outputs.push(progression.join(" "));
      return;
    }

    for (let i = 0; i < N; i++) {
      progression[index] = i + 1;
      dfs(index + 1);
    }
  };

  dfs(0);

  return outputs.join("\n");
};

console.log(solution(N, M));
