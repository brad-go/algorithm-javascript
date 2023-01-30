const order = require('fs').readFileSync('./input.txt').toString().trim().split(' ').map(Number); // prettier-ignore

const solution = (order) => {
  const stack = [];

  let count = 0;
  let box = 1;

  while (count < order.length) {
    const current = order[count];

    if (current === box) {
      count++;
      box++;
      continue;
    }

    if (current === stack[stack.length - 1]) {
      stack.pop();
      count++;
      continue;
    }

    if (current < stack[stack.length - 1]) break;

    stack.push(box);
    box++;
  }

  return count;
};

console.log(solution(order));
