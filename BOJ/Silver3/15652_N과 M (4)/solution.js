const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";
const [N, M] = fs.readFileSync(filePath).toString().trim().split(" ").map(Number); // prettier-ignore

const solution = (N, M) => {
  const progressions = [];
  const output = [];

  const getProgressions = (index, start) => {
    if (index === M) {
      output.push(progressions.join(" "));
      return;
    }

    for (let i = start; i < N; i++) {
      progressions[index] = i + 1;
      getProgressions(index + 1, i);
    }
  };

  getProgressions(0, 0);

  return output.join("\n");
};

console.log(solution(N, M));
