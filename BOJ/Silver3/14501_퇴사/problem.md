# 14501. 퇴사

## 문제 링크

https://www.acmicpc.net/problem/14501

## 문제 분류

: 다이나믹 프로그래밍, 브루트포스 알고리즘

## 소요 시간

: 30분

## 풀이 방법

다이나믹 프로그래밍으로 풀 수 있을 것 같았지만, 시간제한이 2초인 것을 보고 브루트포스로 풀어야겠다고 생각했다. 나는 각 선택을 하기 위해 DFS를 통해서 하나씩 분기를 나눠가면서 선택을 하는 방식으로 문제를 풀이했다. 그리고 최종 선택에서 최댓값을 비교해 반환하게 만들었다.

1. 각 상담에 대해 DFS 탐색을 진행한다.
2. 만약 현재 날짜 + 상담 소요기간이 퇴사날짜보다 뒤라면 건너뛴다.
3. 하나의 상담을 선택하고, 현재 받을 수 있는 돈 + 해당 상담 진행 비용을 하고 해당 상담 소요기간 이후의 상담들을 확인한다.
4. 위 과정을 현재 날짜가 퇴사일이 될때까지 진행한다.

## 풀이 코드

```js
const solution = (N, advices) => {
  // 총 수익
  let answer = 0;

  const dfs = (index, sum) => {
    // 각 상담을 선택할 때마다 최고 수익을 최신화
    answer = Math.max(answer, sum);

    // 현재날짜부터 퇴사일까지
    for (let i = index; i < N; i++) {
      // 해당 날짜의 상담을 진행하는데 필요한 시간과 수입
      const [time, price] = advices[i];

      // 만약 해당 날짜 + 상담 소요기간이 퇴사일 이후까지라면 상담을 하지 못함
      if (i + time > N) continue;

      // 해당 상담을 진행하고 돈 받기. 현재 상담을 진행한 이후의 날짜부터 다시 상담을 진행
      dfs(i + time, sum + price);
    }
  };

  dfs(0, 0);

  return answer;
};
```

## 코드 개선

DP로도 이 문제를 풀이할 수 있다. 첫날부터 DP로 풀이하기에는 뒤에 날짜들을 탐색해야해서 반복문이 두 번 들어가게 된다. 그래서 나는 마지막 날부터 거꾸로 해서 DP를 채워나가는 방식으로 문제를 풀이했다.

1. DP 배열을 선언한다.
2. 마지막 상담의 소요 기간이 1일이라면 DP의 마지막 인덱스를 해당 상담의 가격으로 채워주고, 아니면 0으로 둔다. 해당 상담의 소요기간이 1일일 때, 아래 로직은 현재 날짜 + 상담 소요 기간이 퇴사일을 넘으면 이후 날짜의 상담으로 번 돈을 값으로 사용하기 때문에 처음에 채워줘야 한다.
3. 마지막 전날부터 DP 배열을 채워나간다.
4. 현재 날짜 + 상담 소요기간이 퇴사날짜를 넘으면 어차피 상담을 하지 못하므로 마지막 날부터 다음 날짜까지 상담을 해서 번 최댓값으로(dp[i + 1]) 해당 날짜 이후로 번돈(dp[i])을 최신화한다.
5. 그렇지 않다면 현재 상담을 한 이후의 날짜 이후의 번돈 더하기 현재 상담으로 벌돈(dp[i + time] + price), 마지막 날부터 다음 날까지 상담을 해서 번 돈(dp[i + 1)을 비교해 더 큰 값으로 채워준다.

```js
const solution = (N, advices) => {
  const dp = new Array(N).fill(0);
  const [lastAdiveTime, lastAdivePrice] = advices[N - 1];

  // 마지막 날짜의 값을 미리 채우기
  dp[N - 1] = lastAdiveTime === 1 ? lastAdivePrice : 0;

  // 마지막 전 날부터 첫날까지 거꾸로
  for (let i = N - 2; i >= 0; i--) {
    const [time, price] = advices[i];

    dp[i] =
      // 퇴사일 이후라면
      i + time > N
        ? // 마지막 날부터 해당 날짜 다음날까지 번 최대 수익
          dp[i + 1]
        : // 해당 상담 소요 기간 이후 날짜부터 마지막 날까지 번 최대 수익과 마지막 날부터 해당 날짜 다음날까지 번 최대 수익을 비교
          Math.max((dp[i + time] || 0) + price, dp[i + 1]);
  }

  return dp[0];
};
```

## 다른 풀이

해당 상담 소요기간 이후의 날짜를 현재 상담을 진행하고 할 수 있는 것으로 보고, 현재 상담의 가격으로 미리 채워가면서 진행하는 방식의 DP 풀이

```js
const solution = (N, advices) => {
  const dp = new Array(N).fill(0);

  for (let i = 0; i < N; i++) {
    const [duration, profit] = advices[i];

    if (i + duration > N) continue;

    dp[i] += profit;

    for (let j = i + duration; j < N; j++) {
      dp[j] = Math.max(dp[i], dp[j]);
    }
  }

  return Math.max(...dp);
};
```
