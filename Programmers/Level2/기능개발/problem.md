# 기능개발

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/42586

## 문제 분류

: 스택, 큐

## 풀이 과정

앞에 있는 작업이 끝나야 뒤에 있는 작업도 배포할 수 있으므로, 선입선출방식으로 풀이해야했고, 큐와 비슷한 방식으로 풀이를 생각했다.

1. 각 작업의 진행정도와 속도를 하나의 객체로 묶어준다.
2. 배포가 안된 작업이 남아있을 때까지 3-5를 반복한다.
3. 일을 진행시킨다. (각 작업의 속도에 따라 하루치 진행 정도를 증가시킨다)
4. 작업이 남아있을 때까지 첫번째 작업이 완료되어있는지 확인하면서 완료된 작업들을 꺼내고 개수를 센다.
5. 완료된 작업의 수를 counts배열에 넣는다.
6. counts배열 반환

## Solution

```js
function solution(progresses, speeds) {
  const works = progresses.reduce((acc, cur, idx) => {
    acc[idx] = { progress: cur, speed: speeds[idx], done: false };
    return acc;
  }, []);

  const progressWorks = (works) => {
    works.map((work) => {
      if (work.done) return;
      work.progress += work.speed;
      if (work.progress >= 100) work.done = true;
    });
  };

  const counts = [];

  while (works.length) {
    progressWorks(works);

    let distributed = false;
    let count = 0;

    while (works.length && works[0].done) {
      works.shift();
      distributed = true;
      count++;
    }

    if (distributed) counts.push(count);
  }

  return counts;
}
```

## 코드 개선

속도가 4-5배 정도는 빠르다. 위에 풀이가 각 작업을 날마다 순차적으로 진행시키고 말 그대로 풀이했다면,
이 코드는 작업의 남은 날짜를 계산한다.

1.

```js
function solution(progresses, speeds) {
  const answer = [0];
  // 각 작업의 작업완료까지 남은 날짜를 계산한다.
  const days = progresses.map((progress, index) => Math.ceil((100 - progress) / speeds[index])); // prettier-ignore
  let maxDay = days[0]; // 첫번째 배포날짜

  // 남은 작업이 없을 때까지
  for (let i = 0, j = 0; i < days.length; i++) {
    if (days[i] <= maxDay) {
      // 첫번째 작업보다 남은 날짜가 적다면 한번에 배포된다.
      answer[j] += 1;
      continue;
    }

    maxDay = days[i]; // 남은 첫번째 작업 초기화
    answer[++j] = 1; // 배포 개수 초기화
  }

  return answer;
}
```
