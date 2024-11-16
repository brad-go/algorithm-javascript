# 15953. 상금 헌터

## 문제 링크

https://www.acmicpc.net/problem/15953

## 문제 분류

: 수학, 구현, 사칙 연산, 많은 조건 분기

## 소요 시간

: 20분

## 풀이 방법

1. 1회 대회, 2회 대회 순위의 가정을 차례로 입력받는다.
2. 각 가정 하에 순위에 맞는 대회 상금을 구한다.
3. 더한 후 출력한다.

## 풀이 코드

```js
const solution = (t, ranks) => {
  const prices = ranks.reduce((acc, cur) => {
    const firstPrice = getPriceOfFirstCompetition(cur[0]);
    const secondPrice = getPriceOfSecondCompetition(cur[1]);

    return (acc += `${firstPrice + secondPrice}\n`);
  }, "");

  return prices.trim();
};

const getPriceOfFirstCompetition = (rank) => {
  if (rank == 1) {
    return 5000000;
  } else if (rank >= 2 && rank <= 3) {
    return 3000000;
  } else if (rank >= 4 && rank <= 6) {
    return 2000000;
  } else if (rank >= 7 && rank <= 10) {
    return 500000;
  } else if (rank >= 11 && rank <= 15) {
    return 300000;
  } else if (rank >= 16 && rank <= 21) {
    return 100000;
  } else {
    return 0;
  }
};

const getPriceOfSecondCompetition = (rank) => {
  if (rank == 1) {
    return 5120000;
  } else if (rank >= 2 && rank <= 3) {
    return 2560000;
  } else if (rank >= 4 && rank <= 7) {
    return 1280000;
  } else if (rank >= 8 && rank <= 15) {
    return 640000;
  } else if (rank >= 16 && rank <= 31) {
    return 320000;
  } else {
    return 0;
  }
};
```

## 코드 개선

순위에 대한 상금을 배열을 통해서 코드를 간결하게 만들 수 있었다. 그러나 속도는 더 느리다.

```js
const solution = (t, ranks) => {
  const firstWinners = [1, 3, 6, 10, 15, 21];
  const secondWinners = [1, 3, 7, 15, 31];
  const firstPrizes = [500, 300, 200, 50, 30, 10];
  const secondPrizes = [512, 256, 128, 64, 32];

  const prices = ranks.reduce((acc, cur) => {
    const firstPrize = getPrizeForParticipant(
      firstWinners,
      firstPrizes,
      cur[0]
    );
    const secondPrize = getPrizeForParticipant(
      secondWinners,
      secondPrizes,
      cur[1]
    );
    const totalPrize = (firstPrize + secondPrize) * 10000;

    return (acc += `${totalPrize}\n`);
  }, "");

  return prices.trim();
};

const getPrizeForParticipant = (winners, prizes, rank) => {
  if (rank == 0) {
    return 0;
  }

  let prize = 0;

  for (let i = 0; i < winners.length; i++) {
    if (rank <= winners[i]) {
      prize = prizes[i];
      break;
    }
  }

  return prize;
};
```
