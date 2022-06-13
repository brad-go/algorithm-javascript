# 회의실 개선 - 11399

[문제 링크](https://www.acmicpc.net/problem/11399)

## 문제 풀이

모두가 대기 시간 + 인출하는 시간의 합이 최소가 되려면 인출하는 시간이 짧은 사람을 앞에 세워야 한다.

### 풀이 설명

1. 돈을 뽑는데 필요한 시간이 적은 사람들 순서로 정렬하기
2. 각자 자신까지 순서만큼의 돈을 뽑는데 걸리는 시간을 더한 값 구하기
3. 이 더한 값을 정답에 계속 더하기

### 전체 코드

```js
const [N, ...input] = require("fs")
  .readFileSync("dev/stdin")
  .toString()
  .trim()
  .split(/\s+/)
  .map(Number);

const solution = (N, withdrawalTimes) => {
  withdrawalTimes.sort((a, b) => a - b);

  let answer = 0;

  for (let i = 0; i < N; i++) {
    let current = withdrawalTimes[i];
    for (let j = 0; j < i; j++) {
      const prev = withdrawalTimes[j];
      current += prev;
    }
    answer += current;
  }

  console.log(answer);
};

solution(N, input);
```

### 코드 개선

코드를 조금 더 개선하면 다음과 같다. 위 코드는 직관적으로 바로 풀어버려서 반복문을 중첩해서 사용했지만, 생각을 조금 더 해보니 반복문을 두 번 사용할 필요가 없었다. 어차피 필요한 값은 이미 더해진 값이기 때문이다.

reduce를 사용해서 풀었지만 for문으로 해도 무관하다.

```js
const [N, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s+/)
  .map(Number);

const solution = (N, withdrawalTimes) => {
  withdrawalTimes.sort((a, b) => a - b);

  let answer = 0;

  withdrawalTimes.reduce((acc, cur) => {
    const sum = acc + cur;
    answer += sum;
    return sum;
  }, 0);

  console.log(answer);
};

solution(N, input);
```

혹은 다음과 같이도 구현할 수 있다. 이 코드가 이해가 안될 수도 있는데, 앞의 인출 시간이 대기 시간으로 계속해서 뒤의 사람이 걸리는 시간에 더해진다. 즉, 각 대기 + 인출 시간의 합마다 N-i번 만큼 반복되서 더해진다.

```js
const solution = (N, withdrawalTimes) => {
  withdrawalTimes.sort((a, b) => a - b);

  let answer = 0;

  for (let i = 0; i < N; i++) {
    answer += withdrawalTimes[i] * (N - i);
  }

  console.log(answer);
};

solution(N, input);
```
