const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input5.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const students = input[1].split(" ").map(Number);
const [chief, deputy] = input[2].split(" ").map(Number);

const solution = (students, chief, deputy) => {
  return students.reduce((acc, student) => {
    const rest = student - chief;
    acc += rest <= 0 ? 1 : Math.ceil(rest / deputy) + 1;
    return acc;
  }, 0);
};

console.log(solution(students, chief, deputy));
