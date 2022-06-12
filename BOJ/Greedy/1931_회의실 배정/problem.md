# 회의실 개선 - 1931

[문제 링크](https://www.acmicpc.net/problem/1931)

## 문제 풀이

재귀 함수로 그래프 탐색을 하듯이 풀이했는데, 실패했다. 입력이 100,000까지인데, 시간복잡도가 O(n^2)이 되는 방식으로 문제를 풀이했기 때문이었다.

중요한 포인트는 정렬이었다. 원래는 정렬을 시작 시간을 기준으로 정렬하고 문제를 풀이했었는데, 끝나는 시간을 기준으로 정렬을 하니 O(n)의 시간 복잡도로 문제를 풀이할 수 있었다.

### 풀이 설명

1. 입력받은 회의들을 끝나는 시간을 기준으로 오름차순으로 정렬한다. 만약 끝나는 시간이 같다면 시작 시간을 기준으로 정렬한다.
2. 가장 이른 시간에 끝나는 회의를 첫 회의로 잡아준다.
3. 다음 회의부터 반복문을 돌면서 현재 회의 끝나는 시간과 다음 회의의 시작 시간을 비교한다.
4. 다음 회의의 시작 시간이 현재 회의가 끝나는 시간보다 크거나 같다면 회의실을 사용할 수 있는 회의에 추가하고, 다음 회의를 현재 회의로 만든 후 다음 반복문을 진행한다.

### 전체 코드

```js
const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");
const N = +input[0];
const hours = input.slice(1).map((hours) => hours.split(" ").map(Number));

const solution = (N, hours) => {
  // 끝나는 시간 기준 정렬
  const meetingHours = hours.sort((a, b) => {
    // 끝나는 시간이 같으면 시작 시간 기준으로 정렬
    if (a[1] === b[1]) return a[0] - b[0];
    return a[1] - b[1];
  });

  let meeting = meetingHours[0];
  let count = 1;

  for (let i = 1; i < N; i++) {
    const [start, end] = meeting;
    const [nextStart, nextEnd] = meetingHours[i];

    if (end <= nextStart) {
      meeting = meetingHours[i];
      count++;
    }
  }

  console.log(count);
};

solution(N, hours);
```

### 코드 개선

코드를 조금 더 개선하면 다음과 같다.

```js
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
  const meetingHours = meetings.sort((a, b) => {
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
```
