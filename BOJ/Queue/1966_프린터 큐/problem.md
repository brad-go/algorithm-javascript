# 프린터 큐 - 1966

[문제 링크](https://www.acmicpc.net/problem/1966)

### 성능 요약

메모리: 128MB, 시간 2초

### 문제

여러분도 알다시피 여러분의 프린터 기기는 여러분이 인쇄하고자 하는 문서를 인쇄 명령을 받은 ‘순서대로’, 즉 먼저 요청된 것을 먼저 인쇄한다. 여러 개의 문서가 쌓인다면 Queue 자료구조에 쌓여서 FIFO - First In First Out - 에 따라 인쇄가 되게 된다. 하지만 상근이는 새로운 프린터기 내부 소프트웨어를 개발하였는데, 이 프린터기는 다음과 같은 조건에 따라 인쇄를 하게 된다.

현재 Queue의 가장 앞에 있는 문서의 ‘중요도’를 확인한다.
나머지 문서들 중 현재 문서보다 중요도가 높은 문서가 하나라도 있다면, 이 문서를 인쇄하지 않고 Queue의 가장 뒤에 재배치 한다. 그렇지 않다면 바로 인쇄를 한다.
예를 들어 Queue에 4개의 문서(A B C D)가 있고, 중요도가 2 1 4 3 라면 C를 인쇄하고, 다음으로 D를 인쇄하고 A, B를 인쇄하게 된다.

여러분이 할 일은, 현재 Queue에 있는 문서의 수와 중요도가 주어졌을 때, 어떤 한 문서가 몇 번째로 인쇄되는지 알아내는 것이다. 예를 들어 위의 예에서 C문서는 1번째로, A문서는 3번째로 인쇄되게 된다.

### 입력

첫 줄에 테스트케이스의 수가 주어진다. 각 테스트케이스는 두 줄로 이루어져 있다.

테스트케이스의 첫 번째 줄에는 문서의 개수 N(1 ≤ N ≤ 100)과, 몇 번째로 인쇄되었는지 궁금한 문서가 현재 Queue에서 몇 번째에 놓여 있는지를 나타내는 정수 M(0 ≤ M < N)이 주어진다. 이때 맨 왼쪽은 0번째라고 하자. 두 번째 줄에는 N개 문서의 중요도가 차례대로 주어진다. 중요도는 1 이상 9 이하의 정수이고, 중요도가 같은 문서가 여러 개 있을 수도 있다.

### 출력

각 테스트 케이스에 대해 문서가 몇 번째로 인쇄되는지 출력한다.

### 예제 입력

```
3
1 0
5
4 2
1 2 3 4
6 0
1 1 9 1 1 1
```

### 예제 출력

```
1
2
5
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### Solution

```js
const [T, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(T, input) {
  for (let i = 0; i < T; i++) {
    const [N, M] = input
      .shift()
      .split(" ")
      .map((v) => +v);
    const importance = input
      .shift()
      .split(" ")
      .map((v) => +v);

    const queue = [];
    for (let i = 0; i < N; i++) queue.push([i, importance[i]]);

    if (queue.length < 2) {
      console.log(1);
      continue;
    }

    const result = [];

    while (queue.length > 0) {
      const cur = queue.shift();
      const isInsignificant = queue.some((num) => num[1] > cur[1]);

      if (isInsignificant) {
        queue.push(cur);
        continue;
      }

      result.push(cur[0]);
    }

    const answer = result.findIndex((num) => num === M) + 1;
    console.log(answer);
  }
}

Solution(T, input);
```

오랜만에 한번에 통과했던 문제!! 혼자만의 생각인지 모르겠지만, 자바스크립트는 solved.ac에서 확인할 수 있는 난이도와는 달리 문제의 난이도가 조금 다른 것 같다. 이전에 풀었던 큐 문제가 훨씬 어려웠지만, 그들은 silver4 문제였다. 아무래도 메모리도 많이 소모하고 느려서 그런 것 같다... ㅠ

#### 풀이

- T(테스트 케이스 개수) 만큼 코드를 반복한다.
- input에서 각 반복 시마다 문서의 개수, 궁금한 문서가 몇번째인지, 각 문서의 중요도를 `shift()`를 통해 꺼낸다.
- 문서의 개수 만큼 반복문을 돌면서 queue에 튜플 형태로 순서와 중요도([순서, 중요도])를 넣어준다.
- 큐의 길이가 0이 될때까지 아래 로직을 반복한다.
  - deQueue(위에서 `shift()`)를 해주고 변수 cur에 담는다.
  - 별로 중요하지 않은 문서인지 확인한다. `some()`을 통해서 남은 큐의 문서 중 더 중요한 문서가 있는지 확인한다. (`boolean` 값을 반환한다)
  - 별로 중요하지 않은 문서라면 맨 뒤에 넣어주고 다음 반복을 시작한다.
  - 중요한 문서라면 result 배열에 뽑아낸 문서의 순서를 넣어준다.
- result 배열에서 `findIndex()`를 사용해 M(궁금한 문서가 몇번째에 놓여있는지)과 같은 수를 찾고, 0번째 부터이므로 1을 더해준다.

</div>
</details>
