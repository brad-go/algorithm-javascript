# AC - 5430

[문제 링크](https://www.acmicpc.net/problem/5430)

### 성능 요약

메모리: 256MB, 시간 1초

### 문제

선영이는 주말에 할 일이 없어서 새로운 언어 AC를 만들었다. AC는 정수 배열에 연산을 하기 위해 만든 언어이다. 이 언어에는 두 가지 함수 R(뒤집기)과 D(버리기)가 있다.

함수 R은 배열에 있는 수의 순서를 뒤집는 함수이고, D는 첫 번째 수를 버리는 함수이다. 배열이 비어있는데 D를 사용한 경우에는 에러가 발생한다.

함수는 조합해서 한 번에 사용할 수 있다. 예를 들어, "AB"는 A를 수행한 다음에 바로 이어서 B를 수행하는 함수이다. 예를 들어, "RDD"는 배열을 뒤집은 다음 처음 두 수를 버리는 함수이다.

배열의 초기값과 수행할 함수가 주어졌을 때, 최종 결과를 구하는 프로그램을 작성하시오.

### 입력

첫째 줄에 테스트 케이스의 개수 T가 주어진다. T는 최대 100이다.

각 테스트 케이스의 첫째 줄에는 수행할 함수 p가 주어진다. p의 길이는 1보다 크거나 같고, 100,000보다 작거나 같다.

다음 줄에는 배열에 들어있는 수의 개수 n이 주어진다. (0 ≤ n ≤ 100,000)

다음 줄에는 [x1,...,xn]과 같은 형태로 배열에 들어있는 정수가 주어진다. (1 ≤ xi ≤ 100)

전체 테스트 케이스에 주어지는 p의 길이의 합과 n의 합은 70만을 넘지 않는다.

### 출력

각 테스트 케이스에 대해서, 입력으로 주어진 정수 배열에 함수를 수행한 결과를 출력한다. 만약, 에러가 발생한 경우에는 error를 출력한다.

### 예제 입력

```
4
RDD
4
[1,2,3,4]
DD
1
[42]
RRD
6
[1,1,2,3,5,8]
D
0
[]
```

### 예제 출력

```
[2,1]
error
[1,2,3,5,8]
error
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

```js
const [T, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(T, input) {
  const answer = [];

  for (let i = 0; i < T; i++) {
    const p = input.shift().split("");
    const n = input.shift();
    const arr = JSON.parse(input.shift());

    let reverse = false;
    let isError = false;

    for (let j = 0; j < p.length; j++) {
      if (p[j] === "R") reverse = !reverse;
      if (p[j] === "D") {
        if (!arr.length) {
          isError = true;
          break;
        }

        if (reverse) arr.pop();
        else arr.shift();
      }
    }

    if (isError) answer.push("error");
    else answer.push(JSON.stringify(reverse ? arr.reverse() : arr));
  }
  console.log(answer.join("\n"));
}

Solution(T, input);
```

이번 문제는 정답 비율을 보고 조금 걱정했다. 덱을 구현해야 하나 싶었다. 큐까지는 괜찮았는데, 덱을 구현할 때 순환참조(?) 하는 부분이 이해가 잘 되지 않고 구현을 무작정 따라하고 싶지 않았다.
그래서 내가 할 수 있는 방식으로 풀어봤는데, 다행히 금방 풀 수 있었다!!

- 우선 console을 찍어보다 보니 배열 때문에 JSON을 통한 파싱을 하거나 직렬화가 필요했다.
- reverse라는 변수를 만들어서 문제를 해결했는데, 원래는 'R'이 들어올 때마다 `reverse()` 메서드를 이용해서 배열 자체를 뒤집었더니 시간초과가 나서 이런 방식을 생각해봤다.
- 함수 p의 길이만큼 반복한다.
- R을 만나면 reverse 변수를 변화시킨다.
- D를 만났을 때 길이가 없다면 error 상태로 만들고 반복문 종료
- 길이가 있다면 reverse를 체크한다. reverse 가 true이면 뒤에서 부터 빼고, 아니면 앞에서 부터 빼준다.
- 에러 상태면 정답에 에러를 넣어주고, 아니라면 직렬화해서 배열을 뒤집거나 원 상태로 넣어준다.

</div>
</details>
