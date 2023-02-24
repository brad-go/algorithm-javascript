const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";
const [N, M] = fs.readFileSync(filePath).toString().trim().split(' ').map(Number); // prettier-ignore

const solution = (N, M) => {
  const visited = new Array(N + 1).fill(0);
  const progression = [];
  const outputs = [];

  const getProgressions = (index) => {
    if (index === M) {
      outputs.push(progression.join(" "));
      return;
    }

    for (let i = 1; i <= N; i++) {
      if (visited[i]) continue;

      visited[i] = 1;

      progression[index] = i;
      getProgressions(index + 1, i);

      visited[i] = 0;
    }
  };

  getProgressions(0);

  return outputs.join("\n");
};

console.log(solution(N, M));
