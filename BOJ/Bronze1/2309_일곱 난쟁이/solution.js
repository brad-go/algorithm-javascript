const filePath = process.platform == "linux" ? "/dev/stdin" : "./input.txt";
const heights = require('fs').readFileSync(filePath).toString().trim().split('\n').map(Number); // prettier-ignore

const solution = (heights) => {
  let answer = "";

  const dfs = (index, items = []) => {
    if (answer !== "") return;

    if (items.length === 7) {
      const sum = items.reduce((acc, cur) => acc + cur, 0);

      if (sum == 100) {
        answer = items.sort((a, b) => a - b).join("\n");
      }

      return;
    }

    for (let i = index; i < heights.length; i++) {
      items.push(heights[i]);

      dfs(i + 1, items);

      items.pop(heights[i]);
    }
  };

  dfs(0);

  return answer;
};

console.log(solution(heights));
