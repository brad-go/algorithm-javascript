const [queue1, queue2] = require('fs').readFileSync('./input3.txt').toString().trim().split('\n').map((v) => v.split(' ').map(Number)); // prettier-ignore

const solution = (queue1, queue2) => {
  let pointer1 = 0;
  let pointer2 = queue1.length;

  const queue = [...queue1, ...queue2];
  const queueSum = queue.reduce((total, element) => total + element, 0);
  const target = queueSum / 2;
  const maxCount = queue1.length * 3;

  let queue1Sum = sum(queue1);

  for (let count = 0; count < maxCount; count++) {
    if (queue1Sum === target) {
      return count;
    }

    if (queue1Sum > target) {
      queue1Sum -= queue[pointer1++];
    } else {
      queue1Sum += queue[pointer2++];
    }
  }

  return -1;
};

const sum = (array) => array.reduce((total, element) => total + element, 0);

console.log(solution(queue1, queue2));
