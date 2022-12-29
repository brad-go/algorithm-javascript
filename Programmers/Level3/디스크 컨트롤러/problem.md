# 디스크 컨트롤러

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/42627#

## 문제 분류

: 힙

## 풀이 과정

힙을 통해 구현하려고 했지만, 해결할 수 없었다. 그래서 직관적으로 큐를 사용해서 문제 풀이를 시도했다.

1. 작업들(jobs)의 요청시간이 정렬되어 들어오지 않으므로 요청 시간을 기준으로 정렬하기
2. 각 작업들에 대해서 다음의 과정을 수행한다.
3. 다음 작업이 끝나기전에 들어온 작업들이 있는 동안 아래를 반복한다.
   3-1. 큐에 들어있는 작업이 없다면 현재 시간을 요청 시간으로 늘려준다.
   3-2. 큐에 작업이 있다면 맨 앞에 작업을 꺼낸다.
   3-3. 각 작업의 요청부터 종료까지 걸린 시간을 총 소요시간에 더해준다.
   3-4. 현재 시간을 작업 소요 시간만큼 진행시킨다.
4. 작업을 큐에 넣어준다.
5. 큐를 소요 시간 기준으로 정렬해준다.
6. 모든 작업에 대해 위 과정을 수행한 후에 큐에 작업이 남아있다면, 작업이 모두 끝날 때까지 3번의 과정을 반복한다.
7. 총 소요 시간 나누기 작업의 수를 반환한다.

```js
const solution = (jobs) => {
  // 작업 큐
  const queue = [];
  // 총 소요 시간
  let totalTime = 0;
  // 현재 시간
  let currentTime = 0;

  // jobs를 요청 시간 기준으로 정렬해주기
  jobs.sort((a, b) => a[0] - b[0]);

  jobs.forEach(([requestTime, requireTime]) => {
    // 다음 작업이 끝나기 전에 들어온 작업들이 있는 동안
    while (currentTime < requestTime) {
      // 큐에 들어있는 작업이 없다면 현재 시간만 늘려주기
      if (!queue.length) {
        currentTime = requestTime;
        continue;
      }

      const [currentRequestTime, currentRequireTime] = queue.shift();

      // 평균을 구하기 위해 각각의 작업의 요청부터 종료가지 걸린 시간 더해주기
      totalTime += currentTime - currentRequestTime + currentRequireTime;
      // 현재 총 소요 시간
      currentTime += currentRequireTime;
    }

    // 작업 큐에 넣어주기
    queue.push([requestTime, requireTime]);

    // 큐를 소요시간이 짧은 순서대로 정렬해주기
    queue.sort((a, b) => a[1] - b[1]);
  });

  // 큐에 작업이 남아있을 경우
  while (queue.length > 0) {
    const [requestTime, requireTime] = queue.shift();

    totalTime += currentTime - requestTime + requireTime;
    currentTime += requireTime;
  }

  return Math.floor(totalTime / jobs.length);
};
```

## 코드 개선

```js
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
```
