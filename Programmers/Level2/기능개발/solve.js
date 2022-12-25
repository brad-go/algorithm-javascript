const [progresses, speeds] = require('fs').readFileSync('./input.txt').toString().trim().split('\n').map((str) => str.split(' ').map(Number)); // prettier-ignore

const solution = (progresses, speeds) => {
  const developDays = progresses.map((progress, index) => {
    return Math.ceil((100 - progress) / speeds[index]);
  });

  const answer = [];
  const stack = [developDays[0]];

  for (let i = 1; i < developDays.length + 1; i++) {
    if (developDays[i] <= stack[0]) {
      stack.push(developDays[i]);
      continue;
    }

    let count = 0;

    while (stack.length > 0) {
      stack.pop();
      count++;
    }

    answer.push(count);
    stack[0] = developDays[i];
  }

  return answer;
};

console.log(solution(progresses, speeds));
