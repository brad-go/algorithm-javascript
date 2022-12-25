const input = require('fs').readFileSync('./input2.txt').toString().trim().split('\n'); // prettier-ignore
const priorities = input[0].split(" ").map(Number);
const location = +input[1];

const solution = (priorities, location) => {
  const printerQueue = priorities.map((priority, index) => ({
    id: index,
    priority,
  }));

  return print(printerQueue, location, 1);
};

const print = (printerQueue, location, order) => {
  if (!printerQueue.length) {
    return order;
  }

  const current = printerQueue.shift();
  const canPrint = printerQueue.every(
    ({ priority }) => priority <= current.priority
  );

  if (!canPrint) {
    printerQueue.push(current);
    return print(printerQueue, location, order);
  }

  if (current.id === location) {
    return order;
  }

  return print(printerQueue, location, order + 1);
};

console.log(solution(priorities, location));
