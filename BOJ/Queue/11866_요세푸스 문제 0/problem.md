# 요세푸스 문제 0 - 11866

[문제 링크](https://www.acmicpc.net/problem/11866)

### 성능 요약

메모리: 512MB, 시간 2초

### 문제

요세푸스 문제는 다음과 같다.

1번부터 N번까지 N명의 사람이 원을 이루면서 앉아있고, 양의 정수 K(≤ N)가 주어진다. 이제 순서대로 K번째 사람을 제거한다. 한 사람이 제거되면 남은 사람들로 이루어진 원을 따라 이 과정을 계속해 나간다. 이 과정은 N명의 사람이 모두 제거될 때까지 계속된다. 원에서 사람들이 제거되는 순서를 (N, K)-요세푸스 순열이라고 한다. 예를 들어 (7, 3)-요세푸스 순열은 <3, 6, 2, 7, 5, 1, 4>이다.

N과 K가 주어지면 (N, K)-요세푸스 순열을 구하는 프로그램을 작성하시오.

### 입력

첫째 줄에 N과 K가 빈 칸을 사이에 두고 순서대로 주어진다. (1 ≤ K ≤ N ≤ 1,000)

### 출력

예제와 같이 요세푸스 순열을 출력한다.

### 예제 입력

```
7 3
```

### 예제 출력

```
<3, 6, 2, 7, 5, 1, 4>
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### Solution

```js
const [N, K] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map((v) => +v);

function Solution(N, K) {
  const queue = new Array(N).fill().map((v, idx) => idx + 1);
  const result = [];

  while (queue.length > 0) {
    for (let i = 0; i < K - 1; i++) {
      const deq = queue.shift();
      queue.push(deq);
    }
    const cur = queue.shift();
    result.push(cur);
  }
  console.log(`<${result.join(", ")}>`);
}

Solution(N, K);
```

요세푸스 문제를 잘 이해하지 못해서 실패를 했었지만, 이전까지 문제들보다 메모리나 시간이 넉넉해서
내장 메서드만을 이용해서 쉽게 풀 수 있었다.

- queue를 7까지 수를 채운 배열로 만든다.
- K - 1번까지 queue의 앞에서 빼내준 후에 뒤에 넣어준다.
- K번째 수를 제거하고 result 배열에 넣어준다.
- 위 과정을 queue의 길이가 0이 될때까지 while문에서 반복한다.

</div>
</details>
