# 트리의 지름 - 2263

[문제 링크](https://www.acmicpc.net/problem/2263)

### 성능 요약

메모리: 128MB, 시간 5초

### 문제

n개의 정점을 갖는 이진 트리의 정점에 1부터 n까지의 번호가 중복 없이 매겨져 있다. 이와 같은 이진 트리의 인오더와 포스트오더가 주어졌을 때, 프리오더를 구하는 프로그램을 작성하시오.

### 입력

첫째 줄에 n(1 ≤ n ≤ 100,000)이 주어진다. 다음 줄에는 인오더를 나타내는 n개의 자연수가 주어지고, 그 다음 줄에는 같은 식으로 포스트오더가 주어진다.

### 출력

첫째 줄에 프리오더를 출력한다.

### 예제 입력 1

```
3
1 2 3
1 3 2
```

### 예제 출력 1

```
2 1 3
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

inorder와 postorder를 골똘히 쳐다보다보니 로직 자체는 간단해 보였다.

1. postorder를 통해서 각 서브트리의 루트 노드를 구하기
2. 해당 서브 트리 루트 노드의 inorder 인덱스를 기준으로 좌우의 서브 트리에 반복

그러나 구현을 하는게 조금 어렵게 느껴졌는데, 각 서브트리로 계속 slice해서 값을 구할까 했지만, 트리가 크다면 계속 복사하는데, 시간이 많이 걸릴 것으로 느껴져서 인덱스를 이용하기로 했다.

각 재귀 함수의 실행마다 findIndex를 통해 인덱스를 구하려했지만, O(n)의 탐색을 계속 진행하기 때문에, 다른 방법이 필요했다. 그러다 inorder의 값에 대한 인덱스를 저장하는 배열을 하나 만들기로 결정했다.

```js
const [n, ...input] = require("fs")
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(n);
const inorder = input[0].split(" ").map(Number);
const postorder = input[1].split(" ").map(Number);

function Solution(N, inorder, postorder) {
  const answer = [];

  // 인덱스를 찾는 비용을 줄이기 위해 중위 순회 값들의 인덱스를 배열에 저장하기
  const indicies = [];
  for (let i = 0; i < N; i++) {
    indicies[inorder[i]] = i;
  }

  // 후위 순회에서 현재 서브 트리의 루트 노드 찾기
  // 중위 순회의 현재 루트 노드의 인덱스를 기준으로 왼쪽 오른쪽 서브 트리로 나누고 반복
  const findPreorder = (inStart, inEnd, postStart, postEnd) => {
    if (inStart > inEnd || postStart > postEnd) return;

    const root = postorder[postEnd];
    answer.push(root);

    const rootIdx = indicies[root];
    const leftSize = rootIdx - inStart; // 왼쪽 서브트리의 노드 개수
    const rightSize = inEnd - rootIdx; // 오른쪽 서브트리의 노드 개수

    findPreorder(inStart, rootIdx - 1, postStart, postStart + leftSize - 1);
    findPreorder(rootIdx + 1, inEnd, postEnd - rightSize, postEnd - 1);
  };

  findPreorder(0, N - 1, 0, N - 1);

  console.log(answer.join(" "));
}

Solution(N, inorder, postorder);
```

</div>
</details>
