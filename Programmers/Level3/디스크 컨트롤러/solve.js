const jobs = require('fs').readFileSync('./input.txt').toString().trim().split('\n').map((str) => str.split(' ').map(Number)); // prettier-ignore

const solution = (jobs) => {
  let totalTime = 0;
  let currentTime = 0;

  const queue = [];

  const process = () => {
    const [requestTime, requireTime] = queue.shift();

    totalTime += currentTime - requestTime + requireTime;
    currentTime += requireTime;
  };

  jobs.sort((a, b) => a[0] - b[0]);

  jobs.forEach(([requestTime, requireTime]) => {
    while (currentTime < requestTime) {
      if (!queue.length) {
        currentTime = requestTime;
        break;
      }

      process();
    }

    queue.push([requestTime, requireTime]);
    queue.sort((a, b) => a[1] - b[1]);
  });

  while (queue.length > 0) {
    process();
  }

  return Math.floor(totalTime / jobs.length);
};

console.log(solution(jobs));
