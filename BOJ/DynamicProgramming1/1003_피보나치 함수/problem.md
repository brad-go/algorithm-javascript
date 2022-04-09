# 피보나치 함수 - 1003

[문제 링크](https://www.acmicpc.net/problem/1003)

### 성능 요약

메모리: 128MB, 시간 0.25초

### 문제

다음 소스는 N번째 피보나치 수를 구하는 C++ 함수이다.

```c++
int fibonacci(int n) {
    if (n == 0) {
        printf("0");
        return 0;
    } else if (n == 1) {
        printf("1");
        return 1;
    } else {
        return fibonacci(n‐1) + fibonacci(n‐2);
    }
}
```

fibonacci(3)을 호출하면 다음과 같은 일이 일어난다.

fibonacci(3)은 fibonacci(2)와 fibonacci(1) (첫 번째 호출)을 호출한다.
fibonacci(2)는 fibonacci(1) (두 번째 호출)과 fibonacci(0)을 호출한다.
두 번째 호출한 fibonacci(1)은 1을 출력하고 1을 리턴한다.
fibonacci(0)은 0을 출력하고, 0을 리턴한다.
fibonacci(2)는 fibonacci(1)과 fibonacci(0)의 결과를 얻고, 1을 리턴한다.
첫 번째 호출한 fibonacci(1)은 1을 출력하고, 1을 리턴한다.
fibonacci(3)은 fibonacci(2)와 fibonacci(1)의 결과를 얻고, 2를 리턴한다.
1은 2번 출력되고, 0은 1번 출력된다. N이 주어졌을 때, fibonacci(N)을 호출했을 때, 0과 1이 각각 몇 번 출력되는지 구하는 프로그램을 작성하시오.

### 입력

첫째 줄에 테스트 케이스의 개수 T가 주어진다.

각 테스트 케이스는 한 줄로 이루어져 있고, N이 주어진다. N은 40보다 작거나 같은 자연수 또는 0이다.

### 출력

각 테스트 케이스마다 0이 출력되는 횟수와 1이 출력되는 횟수를 공백으로 구분해서 출력한다.

### 예제 입력 1

```
3
0
1
3
```

### 예제 출력 1

```
1 0
0 1
1 2
```

### 예제 입력 2

```
2
6
22
```

### 예제 출력 2

```
5 8
10946 17711
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### 실패

```js
const [T, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => +v);

function Solution(input) {
  const fibonacci = (n, answer) => {
    if (n === 0) {
      answer[0]++;
      return;
    } else if (n === 1) {
      answer[1]++;
      return;
    } else {
      return fibonacci(n - 1, answer) + fibonacci(n - 2, answer);
    }
  };

  for (let n of input) {
    const answer = [0, 0];

    fibonacci(n, answer);
    console.log(answer.join(" "));
  }
}

Solution(input);
```

역시나 했지만, 시간초과가 났다. 어떻게 풀어야 할까..?

### Solution 1 - 하향식

```js
function Solution(input) {
  for (let n of input) {
    const dp = new Array(n + 1).fill(-1);
    dp[0] = 0;
    dp[1] = 1;

    const fibonacci = (n) => {
      if (dp[n] === -1) {
        dp[n] = fibonacci(n - 1) + fibonacci(n - 2);
      }
      return dp[n];
    };

    fibonacci(n);

    if (n === 0) dp.reverse();
    console.log(dp[dp.length - 2], dp[dp.length - 1]);
  }
}

Solution(input);
```

다이나믹 프로그래밍에 대한 개념을 조금 공부하고 도전해봤다. 하향식 방식으로 문제 풀이에 접근했다. 제대로 이해하지 못했서 조금 다르게 풀이했다.
피보나치 함수를 돌리고 나면 맨 마지막 두수가 0과 1이 호출된 횟수와 같았기 때문에, 그들을 출력하는 방식으로 풀이했다.

- 주어진 테스트 케이스 만큼 반복한다.
- 주어진 수만큼 -1로 채운 배열을 생성한다.
- 첫번째와 두번째 인덱스를 0과 1로 채워준다.
- 피보나치 함수를 하향식 다이나믹 프로그래밍 기법을 이용해 구현한다.
  - 기본적으로 dp배열의 n번째 인덱스를 반환한다.
  - 만약 -1이라면(채워져 있지 않다면) 피보나치 수열의 패턴을 이용해 이전 두수를 더한 값을 채워준다.
  - 이렇게 하게 되면 이미 구한 재귀 함수의 값은 더 이상 체크할 필요가 없어진다.

</div>
</details>
