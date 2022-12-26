# 전력망을 둘로 나누기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/86971

## 문제 분류

: 완전 탐색

## 풀이 과정

트리와 BFS를 통해 문제를 풀이 할 수 있었다. 트리의 각 하위 노드의 개수를 세는 것이 중요했던 것 같다.

1. 주어진 wires를 통해 연결된 송신탑을 표현할 네트워크(트리) 생성하기
2. wires를 다시 반복하면서 송신탑들을 하나씩 없다고 가정하고 트리가 가진 각 노드의 하위 노드 개수 세주기(자신 포함) - BFS 이용
3. 2를 통해 두 네트워크가 가진 하위 송신탑들의 개수를 세고, 차이값을 계산한다.
4. answer를 주어진 최댓값(100)으로 설정하고, 3에서 구한 차잇값과 비교해 더 작은 값으로 갱신해준다.

```js
const solution = (n, wires) => {
  // 트리 구조로 만들어주기
  const network = wires.reduce((acc, [v1, v2]) => {
    acc[v1] = [...(acc[v1] || []), v2];
    acc[v2] = [...(acc[v2] || []), v1];
    return acc;
  }, {});

  // 최대 송신탑 개수
  let answer = 100;

  // 연결된 송신탑들을 하나씩 끊어가며, 끊어진 두 개의 네트워크가 가진 송신탑의 개수 차 구하기
  wires.forEach(([v1, v2]) => {
    // 두 네트워크 간의 송신탑 개수 차이
    const diff = Math.abs(
      searchNetwork(network, v1, v2) - searchNetwork(network, v2, v1)
    );
    answer = answer > diff ? diff : answer;
  });

  return answer;
};

// 네트워크를 탐색하며 현재 노드가 가진 하위 노드의 수 세기
const searchNetwork = (network, root, exception) => {
  const queue = [root];
  const visited = [];

  visited[root] = true;

  // 현재 노드가 가진 송신탑의 개수
  let count = 0;

  while (queue.length) {
    const current = queue.pop();

    network[current].forEach((next) => {
      // 연결된 노드가 잘라낼 노드이거나 방문한 노드라면 건너뛰기
      if (next === exception || visited[next]) {
        return;
      }

      // 다음 노드 탐색하기
      visited[next] = true;
      queue.push(next);
    });

    count++;
  }

  return count;
};
```
