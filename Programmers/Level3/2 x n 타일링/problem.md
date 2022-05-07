# 2 x n 타일링

## 문제 분류

: 다이나믹 프로그래밍

## 문제 설명

가로 길이가 2이고 세로의 길이가 1인 직사각형모양의 타일이 있습니다. 이 직사각형 타일을 이용하여 세로의 길이가 2이고 가로의 길이가 n인 바닥을 가득 채우려고 합니다. 타일을 채울 때는 다음과 같이 2가지 방법이 있습니다.

- 타일을 가로로 배치 하는 경우
- 타일을 세로로 배치 하는 경우

예를들어서 n이 7인 직사각형은 다음과 같이 채울 수 있습니다.

![타일 1](https://i.imgur.com/29ANX0f.png)

직사각형의 가로의 길이 n이 매개변수로 주어질 때, 이 직사각형을 채우는 방법의 수를 return 하는 solution 함수를 완성해주세요.

## 제한사항

- 가로의 길이 n은 60,000이하의 자연수 입니다.
- 경우의 수가 많아 질 수 있으므로, 경우의 수를 1,000,000,007으로 나눈 나머지를 return해주세요.

## 입출력 예

| n   | result |
| --- | ------ |
| 4   | 5      |

## 입출력 예 설명

### 입출력 예 #1

다음과 같이 5가지 방법이 있다.

![타일 2](https://i.imgur.com/keiKrD3.png)
![타일 3](https://i.imgur.com/O9GdTE0.png)
![타일 4](https://i.imgur.com/IZBmc6M.png)
![타일 5](https://i.imgur.com/29LWVzK.png)
![타일 6](https://i.imgur.com/z64JbNf.png)

<details><summary><b>문제 풀이</b></summary><div markdown="1">

어떻게 풀어야 하나 막막했는데, dp 방식으로 푸니까 아주 쉽게 풀 수 있었다.
피보 나치 수열과 같은 방법으로 문제를 해결할 수 있었다.

### Solution

```js
const devideNumber = 1000000007;
const dp = new Array(n).fill(0);
dp[0] = 1;
dp[1] = 2;

for (let i = 2; i < n; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % devideNumber;
}

const answer = dp[n - 1];
return answer;
```

이를 재귀 방식으로 구현해서도 통과할까 하고, 다음과 같이 작성했었는데, 모두 시간 초과가 나서 통과하지 못햇했다.

```js
const getWays = (num) => {
  if (num < 3) return num;

  return (getWays(num - 1) + getWays(num - 2)) % devideNumber;
};

const answer = getWays(n);
return answer;
```

</div></details>
