# 트리 - 4803

[문제 링크](https://www.acmicpc.net/problem/4803)

### 성능 요약

메모리: 256MB, 시간 1초

### 문제

그래프는 정점과 간선으로 이루어져 있다. 두 정점 사이에 경로가 있다면, 두 정점은 연결되어 있다고 한다. 연결 요소는 모든 정점이 서로 연결되어 있는 정점의 부분집합이다. 그래프는 하나 또는 그 이상의 연결 요소로 이루어져 있다.

트리는 사이클이 없는 연결 요소이다. 트리에는 여러 성질이 있다. 예를 들어, 트리는 정점이 n개, 간선이 n-1개 있다. 또, 임의의 두 정점에 대해서 경로가 유일하다.

그래프가 주어졌을 때, 트리의 개수를 세는 프로그램을 작성하시오.

### 입력

입력은 여러 개의 테스트 케이스로 이루어져 있다. 각 테스트 케이스의 첫째 줄에는 n ≤ 500과 m ≤ n(n-1)/2을 만족하는 정점의 개수 n과 간선의 개수 m이 주어진다. 다음 m개의 줄에는 간선을 나타내는 두 개의 정수가 주어진다. 같은 간선은 여러 번 주어지지 않는다. 정점은 1번부터 n번까지 번호가 매겨져 있다. 입력의 마지막 줄에는 0이 두 개 주어진다.

### 출력

입력으로 주어진 그래프에 트리가 없다면 "No trees."를, 한 개라면 "There is one tree."를, T개(T > 1)라면 "A forest of T trees."를 테스트 케이스 번호와 함께 출력한다.

### 예제 입력 1

```
6 3
1 2
2 3
3 4
6 5
1 2
2 3
3 4
4 5
5 6
6 6
1 2
2 3
1 3
4 5
5 6
6 4
0 0
```

### 예제 출력 1

```
Case 1: A forest of 3 trees.
Case 2: There is one tree.
Case 3: No trees.
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

트리에 대한 설명이 나와있지만, 이해하지 못해서 조금 헤맸다. 정점이 하나만 있어도 트리다!
입력을 받는 것은 그래프 입력받기와 똑같았다.

```js
for (let i = idx; i < idx + m; i++) {
  const [from, to] = input[i].split(" ").map(Number);
  graph[from].push(to);
  graph[to].push(from);
}
```

그리고 정점 1번부터 n번까지 방문하지 않은 정점이라면 트리인지 확인하기 위해 탐색을 시작한다. 트리라면 cnt 개수를 증가시키고 그 개수에 따라 출력을 다르게 해준다.

```js
let cnt = 0;
for (let i = 1; i <= n; i++) {
  if (!visited[i] && DFS(i, 0)) cnt++;
}
```

트리인지 판별하기 위한 함수는 다음과 같다. 아래와 같이 탐색을 진행하게 되면 연결된 정점들에 대한 하나의 부분집합을 트리인지 아닌지 체크할 수 있다.

```js
const DFS = (v, parent) => {
  if (visited[v]) return false;

  // 트리인지 판별하는 값
  let result = true;
  // 방문 처리
  visited[v] = true;

  // 정점 v에 연결된 모든 정점들에게 반복
  for (let child of graph[v]) {
    // 다음 정점이 현재 정점(부모 노드)과 다르다면 다음 정점이 트리인지 판별하기
    if (child !== parent) result &= DFS(child, v);
  }

  return result;
};
```

#### 전체 코드

```js
const input = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(input) {
  let answer = "";
  let idx = 0;
  let caseNum = 1;

  while (idx < input.length - 1) {
    const [n, m] = input[idx].split(" ").map(Number);
    idx++;

    const graph = new Array(n + 1).fill().map(() => []);
    const visited = new Array(n + 1);

    const DFS = (v, parent) => {
      if (visited[v]) return false;

      let result = true;
      visited[v] = true;

      for (let child of graph[v]) {
        if (child !== parent) result &= DFS(child, v);
      }

      return result;
    };

    for (let i = idx; i < idx + m; i++) {
      const [from, to] = input[i].split(" ").map(Number);
      graph[from].push(to);
      graph[to].push(from);
    }

    let cnt = 0;
    for (let i = 1; i <= n; i++) {
      if (!visited[i] && DFS(i, 0)) cnt++;
    }

    answer += `Case ${caseNum++}: `;

    if (cnt === 0) answer += `No trees.\n`;
    else if (cnt === 1) answer += `There is one tree.\n`;
    else answer += `A forest of ${cnt} trees.\n`;

    idx += m;
  }
  console.log(answer);
}

Solution(input);
```

</div>
</details>
