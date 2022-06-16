# 주유소 - 13305

[문제 링크](https://www.acmicpc.net/problem/13305)

## 문제 풀이

부분 점수가 있는 문제였다.

### 풀이 설명

생각한 풀이는 다음과 같다.

1. 현재 도시의 기름값보다 더 싼 기름 값을 가진 도시까지의 거리만큼 현재 도시의 기름으로 충전한다.
2. 1번을 반복하면서 정답에 더한 후 출력한다.

### 전체 코드

#### 입력 받기

입력은 17점과 58점의 입력은 같다.

```js

```

#### 17점 코드

첫번째 마을의 기름값이 제일 싼 것이 고려되지 않았고, 불필요한 코드의 중복이 있다.

```js
// prettier-ignore
const [n, ...input] = require("fs").readFileSync("./input3.txt").toString().trim().split("\n");
const N = Number(n);
const distances = input[0].split(" ").map(Number);
const oilPrices = input[1].split(" ").map(Number);

const solution = (N, distances, oilPrices) => {
  const refuel = (current, pass) => {
    let price = 0;
    for (let i = current; i < N - 1; i++) {
      price += calculatePrice(distances[i], oilPrices[current]);
      pass++;

      if (oilPrices[current] > oilPrices[i]) break;
    }
    return [price, pass];
  };

  const calculatePrice = (amount, price) => {
    const chargingPrice = amount * price;
    return chargingPrice;
  };

  let answer = 0;
  answer += calculatePrice(distances[0], oilPrices[0]);

  for (let i = 1; i < N - 1; i++) {
    const [price, pass] = refuel(i, 0);
    answer += price;
    i += pass;
  }

  console.log(answer);
};

solution(N, distances, oilPrices);
```

#### 58점 코드

첫번째 마을 값은 고려되었지만, 1,000,000,000의 수를 계산하지 못한다.

```js
// prettier-ignore
const [n, ...input] = require("fs").readFileSync("./input3.txt").toString().trim().split("\n");
const N = Number(n);
const distances = input[0].split(" ").map(Number);
const oilPrices = input[1].split(" ").map(Number);

const solution = (N, distances, oilPrices) => {
  const refuel = (current, visited) => {
    let price = 0;
    for (let i = current; i < N - 1; i++) {
      if (oilPrices[current] > oilPrices[i]) break;

      visited[i] = true;

      price += distances[i] * oilPrices[current];
    }
    return price;
  };

  const visited = new Array(N).fill(0);
  let answer = 0;

  for (let i = 0; i < N - 1; i++) {
    if (visited[i]) continue;

    const price = refuel(i, visited);
    answer += price;
  }

  console.log(answer);
};

solution(N, distances, oilPrices);
```

#### 100점 코드

큰 수를 다루기 위해 BigInt가 떠올라 사용했다. 뒤에 n이붙으므로 출력시 String으로 변환해서 n을 제거하고 출력해주었다.

```js
// prettier-ignore
const [n, ...input] = require("fs").readFileSync("./input3.txt").toString().trim().split("\n");
const N = Number(n);
const distances = input[0].split(" ").map((v) => BigInt(v));
const oilPrices = input[1].split(" ").map((v) => BigInt(v));

const solution = (N, distances, oilPrices) => {
  const refuel = (current, visited) => {
    let price = 0n;
    for (let i = current; i < N - 1; i++) {
      if (oilPrices[current] > oilPrices[i]) break;

      visited[i] = true;

      price += distances[i] * oilPrices[current];
    }
    return price;
  };

  const visited = new Array(N).fill(0);
  let answer = 0n;

  for (let i = 0; i < N - 1; i++) {
    if (visited[i]) continue;

    const price = refuel(i, visited);
    answer += price;
  }

  console.log(String(answer));
};

solution(N, distances, oilPrices);
```

### 코드 개선

"현재 도시의 기름값보다 더 싼 기름 값을 가진 도시까지의 거리만큼 현재 도시의 기름으로 충전한다."라는 로직으로 이 문제에 접근하고 풀이했었다.
이걸 코드로 조금 더 쉽게 풀면 현재 도시의 기름값보다 싼 곳인 경우에만 기름값을 변경하고, 그대로 거리가 담긴 배열을 순회하면 되었다. 방문처리 및 반복문이 중첩될 필요가 없었다. 위의 풀이들은 함수의 역할을 분리해서 작업하려다가 오히려 코드를 더 복잡하게 만들었던거였다.

- 불필요한 visited 배열 제거
- 시간 복잡도 O(N^2)에서 O(N)을 개선

```js
const [n, ...input] = require("fs")
  .readFileSync("./input3.txt")
  .toString()
  .trim()
  .split("\n");
const N = Number(n);
const distances = input[0].split(" ").map((v) => BigInt(v));
const prices = input[1].split(" ").map((v) => BigInt(v));

const solution = (N, distances, prices) => {
  let currentPrice = prices[0];
  let cost = 0n;

  for (let i = 0; i < N - 1; i++) {
    cost += currentPrice * distances[i];
    if (currentPrice > prices[i + 1]) currentPrice = prices[i + 1];
  }

  console.log(String(cost));
};

solution(N, distances, prices);
```
