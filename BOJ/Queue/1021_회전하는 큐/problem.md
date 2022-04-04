# 프린터 큐 - 1021

[문제 링크](https://www.acmicpc.net/problem/1021)

### 성능 요약

메모리: 128MB, 시간 2초

### 문제

지민이는 N개의 원소를 포함하고 있는 양방향 순환 큐를 가지고 있다. 지민이는 이 큐에서 몇 개의 원소를 뽑아내려고 한다.

지민이는 이 큐에서 다음과 같은 3가지 연산을 수행할 수 있다.

첫 번째 원소를 뽑아낸다. 이 연산을 수행하면, 원래 큐의 원소가 a1, ..., ak이었던 것이 a2, ..., ak와 같이 된다.
왼쪽으로 한 칸 이동시킨다. 이 연산을 수행하면, a1, ..., ak가 a2, ..., ak, a1이 된다.
오른쪽으로 한 칸 이동시킨다. 이 연산을 수행하면, a1, ..., ak가 ak, a1, ..., ak-1이 된다.
큐에 처음에 포함되어 있던 수 N이 주어진다. 그리고 지민이가 뽑아내려고 하는 원소의 위치가 주어진다. (이 위치는 가장 처음 큐에서의 위치이다.) 이때, 그 원소를 주어진 순서대로 뽑아내는데 드는 2번, 3번 연산의 최솟값을 출력하는 프로그램을 작성하시오.

### 입력

첫째 줄에 큐의 크기 N과 뽑아내려고 하는 수의 개수 M이 주어진다. N은 50보다 작거나 같은 자연수이고, M은 N보다 작거나 같은 자연수이다. 둘째 줄에는 지민이가 뽑아내려고 하는 수의 위치가 순서대로 주어진다. 위치는 1보다 크거나 같고, N보다 작거나 같은 자연수이다.

### 출력

첫째 줄에 문제의 정답을 출력한다.

### 예제 입력 1

```
10 3
1 2 3
```

### 예제 출력 1

```
0
```

### 예제 입력 2

```
10 3
2 9 5
```

### 예제 출력 2

```
8
```

### 예제 입력 3

```
32 6
27 16 30 11 6 23
```

### 예제 출력 3

```
59
```

### 예제 입력 4

```
10 10
1 6 3 2 7 9 8 4 10 5
```

### 예제 출력 4

```
14
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

```js
const input = require("fs")
  .readFileSync("./input4.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(input) {
  const [n, m] = input[0].split(" ").map((v) => +v);
  const position = input[1].split(" ").map((v) => +v);

  const queue = new Array(n).fill().map((v, i) => i + 1);

  let count = 0;

  for (let i = 0; i < position.length; i++) {
    if (queue[0] === position[i]) queue.shift();
    else {
      const mid = queue.indexOf(queue[Math.floor(queue.length / 2)]);

      while (queue[0] !== position[i]) {
        if (queue.indexOf(position[i]) <= mid) {
          const cur = queue.shift();
          queue.push(cur);
          count++;
        } else {
          const cur = queue.pop();
          queue.unshift(cur);
          count++;
        }
      }
      queue.shift();
    }
  }
  console.log(count);
}

Solution(input);
```

한번에 통과해버렸다! 너무 신나!

- 입력받은 N만큼 큐를 1부터 인덱스로 채워 배열로 만든다.
- 뽑고자 하는 순서를 배열 position으로 지정
- position의 길이만큼 반복
- 큐의 첫번째와 현재 position(뽑고자 하는 원소의 위치)이 같다면 뽑아낸다.
- 다르다면 현재 뽑고자 하는 원소의 위치와 큐의 첫번째 원소가 같을 때까지 반복한다.
- 큐의 중간 원소의 인덱스 번호를 mid라고 칭한다.
- 이 mid의 크기가 현재 뽑고자 하는 원소의 인덱스 번호보다 작거나 같다면 왼쪽으로 한 칸 이동시키고, count 증가
- mid의 크기가 현재 뽑고자 하는 원소의 인덱스 번호보다 크다면 오른쪽으로 한 칸 이동시키고, count 증가
- 같아지면 queue에서 원소를 뽑아낸다.
- count를 출력한다.

</div>
</details>
