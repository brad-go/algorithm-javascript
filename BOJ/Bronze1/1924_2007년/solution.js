const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [x, y] = fs.readFileSync(filePath).toString().trim().split(' ').map(Number); // prettier-ignore

const solution = (x, y) => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const date = new Date(2007, x - 1, y);

  return days[date.getDay() % 7];
};

console.log(solution(x, y));
