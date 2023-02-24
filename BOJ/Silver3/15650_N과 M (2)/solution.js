const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, M] = fs.readFileSync(filePath).toString().trim().split(" ").map(Number); // prettier-ignore

const solution = (N, M) => {
  const visited = new Array(N).fill(0);
  const progression = [];
  const outputs = [];

  const dfs = (index, start) => {
    if (index === M) {
      outputs.push(progression.join(" "));
      return;
    }

    for (let i = start; i < N; i++) {
      if (visited[i]) continue;

      visited[i] = 1;
      progression[index] = i + 1;

      dfs(index + 1, i);

      visited[i] = 0;
    }
  };

  dfs(0, 0);

  return outputs.join("\n");
};

console.log(solution(N, M));
