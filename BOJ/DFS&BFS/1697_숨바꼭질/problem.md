# 숨바꼭질 - 1697

[문제 링크](https://www.acmicpc.net/problem/1697)

### 성능 요약

메모리: 128MB, 시간 2초

### 문제

수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 2\*X의 위치로 이동하게 된다.

수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.

### 입력

첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 주어진다. N과 K는 정수이다.

### 출력

수빈이가 동생을 찾는 가장 빠른 시간을 출력한다.

### 예제 입력 1

```
5 17
```

### 예제 출력 1

```
4
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">
<br />

처음에 문제를 보고 어떻게 풀어야 하나 걱정했었다. dp 방식으로 풀어야 하나 하다가, 그래프를 떠올리고 아래로 하나씩 그려보니 생각보다 쉽게 풀 수 있을 것 같았다.

BFS, 큐를 이용해서 문제를 풀이했다. 큐에 [시작 위치, 0]을 넣고 선언해주고, 큐가 비기 전까지 다음을 반복한다.

- 큐에 [위치(`pos`), 이동 시간(`t`)]을 꺼낸다.
- 이미 방문한 위치일 경우 `continue`
- 방문하지 않았을 경우
  - `pos === K`: 동생의 위치에 도달했을 경우 걸린 시간(`time`) 출력 후 `return`
  - `pos !== K`: 다음 이동 위치 중 범위 내에 위치(0 < && < 100,000)와 이동 시간(t + 1)을 큐에 삽입

시간초과가 자꾸 나서 조금 힘들었다. 큐를 구현했으면 통과했을지도 모르지만 구현하는 것보다 해결할 수 있을 것 같아서 방법을 고민했다.

#### 조건문

처음에는 조건문 없이 큐에 아래와 같이 집어넣었다.

```js
q.push([pos * 2, time + 1]);
q.push([pos + 1, time + 1]);
q.push([pos - 1, time + 1]);
```

일반적인 문제는 해결되었지만 탐색 범위가 조금만 넓어져도 문제를 해결할 수 없었다. 그래서 이 문제에서 정의한 점들의 최대 범위 이내로 조건을 설정해주고 탐색을 실행했다.

```js
if (pos * 2 <= MAX_POS) q.push([pos * 2, time + 1]);
if (pos + 1 <= MAX_POS) q.push([pos + 1, time + 1]);
if (pos - 1 >= 0) q.push([pos - 1, time + 1]);
```

#### visted 배열

이 문제를 해결하는 데, 방문 표시를 위한 visited 배열은 필요없을 것이라 생각했다. 그러나 반복되는 수가 많이 나타나기 때문에 방문처리를 해줘야 시간초과에서 벗어날 수 있었다.

#### `push()`

정말 이거 하나 때문에 시간 초과와 통과가 갈렸다.

```js
const q = [];
q.push([START, 0]);
```

이렇게 답안을 제출했더니 시간초과가 자꾸나서 아래와 같이 코드를 바꿨더니 통과되었다. push와 shift 메서드가 역시 시간을 많이 잡아먹긴 하는 것 같다.

```js
const q = [[START, 0]];
```

#### 전체 코드

```js
const [N, K] = require("fs")
  .readFileSync("./input3.txt")
  .toString()
  .trim()
  .split(" ")
  .map((v) => +v);

function Solution(START, END) {
  const bfs = (START, END) => {
    const MAX_POS = 100000;
    const visited = Array(MAX_POS + 1).fill(false);
    const q = [[START, 0]];

    while (q.length) {
      const [pos, time] = q.shift();

      if (visited[pos]) continue;
      visited[pos] = true;

      if (pos === END) {
        console.log(time);
        return;
      }

      if (pos * 2 <= MAX_POS) q.push([pos * 2, time + 1]);
      if (pos + 1 <= MAX_POS) q.push([pos + 1, time + 1]);
      if (pos - 1 >= 0) q.push([pos - 1, time + 1]);
    }
  };

  bfs(START, END);
}

Solution(N, K);
```

</div>
</details>
