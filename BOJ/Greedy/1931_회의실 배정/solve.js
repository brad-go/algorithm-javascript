const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
const meetings = input.slice(1).map((hours) => {
  const [start, end] = hours.split(" ").map(Number);
  const meeting = { start, end };
  return meeting;
});

const solution = (N, meetings) => {
  // 끝나는 시간 기준 정렬
  const meetingHours = meetings.sort((a, b) => {
    // 끝나는 시간이 같으면 시작 시간 기준으로 정렬
    if (a.end === b.end) return a.start - b.start;
    return a.end - b.end;
  });

  let currentMeetingEnd = meetingHours[0].end;
  let count = 1;

  for (let i = 1; i < N; i++) {
    const { start: nextStart, end: nextEnd } = meetingHours[i];

    if (currentMeetingEnd <= nextStart) {
      currentMeetingEnd = nextEnd;
      count++;
    }
  }

  console.log(count);
};

solution(N, meetings);
