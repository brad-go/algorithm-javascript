# 뱀과 사다리 게임 - 16927

[문제 링크](https://www.acmicpc.net/problem/16927)

### 성능 요약

메모리: 512MB, 시간 1초

### 문제

뱀과 사다리 게임을 즐겨 하는 큐브러버는 어느 날 궁금한 점이 생겼다.

주사위를 조작해 내가 원하는 수가 나오게 만들 수 있다면, 최소 몇 번만에 도착점에 도착할 수 있을까?

게임은 정육면체 주사위를 사용하며, 주사위의 각 면에는 1부터 6까지 수가 하나씩 적혀있다. 게임은 크기가 10×10이고, 총 100개의 칸으로 나누어져 있는 보드판에서 진행된다. 보드판에는 1부터 100까지 수가 하나씩 순서대로 적혀져 있다.

플레이어는 주사위를 굴려 나온 수만큼 이동해야 한다. 예를 들어, 플레이어가 i번 칸에 있고, 주사위를 굴려 나온 수가 4라면, i+4번 칸으로 이동해야 한다. 만약 주사위를 굴린 결과가 100번 칸을 넘어간다면 이동할 수 없다. 도착한 칸이 사다리면, 사다리를 타고 위로 올라간다. 뱀이 있는 칸에 도착하면, 뱀을 따라서 내려가게 된다. 즉, 사다리를 이용해 이동한 칸의 번호는 원래 있던 칸의 번호보다 크고, 뱀을 이용해 이동한 칸의 번호는 원래 있던 칸의 번호보다 작아진다.

게임의 목표는 1번 칸에서 시작해서 100번 칸에 도착하는 것이다.

게임판의 상태가 주어졌을 때, 100번 칸에 도착하기 위해 주사위를 굴려야 하는 횟수의 최솟값을 구해보자.

### 입력

첫째 줄에 게임판에 있는 사다리의 수 N(1 ≤ N ≤ 15)과 뱀의 수 M(1 ≤ M ≤ 15)이 주어진다.

둘째 줄부터 N개의 줄에는 사다리의 정보를 의미하는 x, y (x < y)가 주어진다. x번 칸에 도착하면, y번 칸으로 이동한다는 의미이다.

다음 M개의 줄에는 뱀의 정보를 의미하는 u, v (u > v)가 주어진다. u번 칸에 도착하면, v번 칸으로 이동한다는 의미이다.

1번 칸과 100번 칸은 뱀과 사다리의 시작 또는 끝이 아니다. 모든 칸은 최대 하나의 사다리 또는 뱀을 가지고 있으며, 동시에 두 가지를 모두 가지고 있는 경우는 없다. 항상 100번 칸에 도착할 수 있는 입력만 주어진다.

### 출력

100번 칸에 도착하기 위해 주사위를 최소 몇 번 굴려야 하는지 출력한다.

### 예제 입력 1

```
3 7
32 62
42 68
12 98
95 13
97 25
93 37
79 27
75 19
49 47
67 17
```

### 예제 출력 1

```
3
```

1. 5를 굴려 6으로 이동한다.
2. 6을 굴려 12로 이동한다. 이 곳은 98로 이동하는 사다리가 있기 때문에, 98로 이동한다.
3. 2를 굴려 100으로 이동한다.

### 예제 입력 2

```
4 9
8 52
6 80
26 42
2 72
51 19
39 11
37 29
81 3
59 5
79 23
53 7
43 33
77 21
```

### 예제 출력 2

```
5
```

1. 5를 굴려 6으로 이동하고, 사다리를 이용해 80으로 이동한다.
2. 6을 굴려 86으로
3. 6을 또 굴려 92로
4. 6을 또 굴려 98로 이동하고
5. 2를 굴려 100으로 이동한다.

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

시간 초과가 나는 것을 막기 위해 큐를 구현해주었다.

```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(value) {
    const node = new Node(value);

    if (!this.head) this.head = node;
    else this.tail.next = node;

    this.tail = node;
    this.length++;
  }

  dequeue() {
    if (!this.head) return null;

    const node = this.head.value;
    this.head = this.head.next;
    this.length--;

    return node;
  }
}
```

#### 풀이

1. input의 첫번째 값은 from 배열에 두 번째 값은 to 배열에 순서대로 저장해준다. 위로 가고 아래로 가는 것은 다르지만, 각각 위치에 도착하면 다른 위치로 변하는 것은 같으니까 뱀, 사다리를 구분하지 않았다.
2. 게임판을 위한 board와 방문처리르 위한 visited 배열을 선언해준다.
3. 탐색 함수 rollDice를 bfs 방식으로 작성해준다. 1차원 배열 탐색이므로 더 간단했지만, 각 탐색 시마다 from 배열에 해당하는 위치인지 체크해주고, 맞다면 to 배열에 위치한 곳으로 이동시킨다.

#### 전체 코드

```js
const [nm, ...input] = require("fs")
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

const from = [];
const to = [];

for (let i = 0; i < input.length; i++) {
  const [start, end] = input[i].split(" ").map((v) => v - 1);
  from.push(start);
  to.push(end);
}

function Solution(from, to) {
  const rollDice = (board, visited, start) => {
    const DICE = [1, 2, 3, 4, 5, 6];
    const q = new Queue();

    q.enqueue([start, 0]);
    visited[0] = 1;

    while (q.length) {
      const [pos, time] = q.dequeue();

      if (board[pos] === 100) {
        console.log(time);
        return;
      }

      for (let num = 0; num < DICE.length; num++) {
        let npos = pos + DICE[num];

        if (npos < 0 || npos >= 100 || visited[npos]) continue;
        visited[npos] = 1;

        for (let i = 0; i < input.length; i++) {
          if (npos === from[i]) npos = to[i];
        }

        q.enqueue([npos, time + 1]);
      }
    }
  };

  const board = new Array(100).fill().map((_, idx) => idx + 1);
  const visited = new Array(100).fill(0);
  rollDice(board, visited, 0);
}

Solution(from, to);
```

</div>
</details>
