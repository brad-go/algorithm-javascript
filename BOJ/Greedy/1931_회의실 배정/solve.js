const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
const hours = input.slice(1).map((hours) => hours.split(" ").map(Number));

const solution = (N, hours) => {
  const meetingHours = hours.sort((a, b) => a[0] - b[0]);
  let answer = 0;

  const countMeetingNumbers = (idx, end, count) => {
    for (let i = idx; i < N; i++) {
      const [nextStart, nextEnd] = meetingHours[i];

      if (end <= nextStart) {
        answer = Math.max(answer, count + 1);
        countMeetingNumbers(i, nextEnd, count + 1);
      }
    }
  };

  for (let i = 0; i < N; i++) {
    const [start, end] = meetingHours[i];
    countMeetingNumbers(i, end, 1);
  }

  console.log(answer);
};

solution(N, hours);
