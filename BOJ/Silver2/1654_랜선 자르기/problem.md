# 1654. 랜선 자르기

## 문제 링크

https://www.acmicpc.net/problem/1654

## 문제 분류

: 이분 탐색

## 소요 시간

: 1시간

## 풀이 방법

문제를 풀이하기 위해서는 랜선을 몇 cm로 자를지 찾아야했다. K와 N의 범위가 커서 완전탐색을 할 수 없었고, 이분 탐색을 통해서
찾는 것이 적합하다고 생각했다.

1. 이분탐색을 위해 입력받은 랜선들을 오름차순으로 정렬하기
2. 잘라서 만들 랜선의 길이의 최솟값은 1, 최댓값은 입력받은 랜선들 중 가장 긴 것으로 한다. N이 1일 경우를 생각하면 K의 개수와 상관없이 가장 긴 랜선을 반환하면 된다.
3. 최솟값과 최댓값의 범위 내에서 이분 탐색을 진행한다.
4. 매 탐색마다 잘라서 만들 랜선의 길이(mid)로 하면 몇 개의 랜선이 만들어지는지 체크한다.
5. N보다 랜선 개수가 클 경우 더 긴 길이로 잘라보고, 아닐 경우 더 짧은 길이로 잘라보며 이분 탐색을 진행한다.

## 풀이 코드

```js
const solution = (K, N, lines) => {
  // 이분 탐색을 위해 정렬해주기
  lines.sort();

  // 잘라서 만들 랜선의 최소 길이를 1, 최대 길이를 입력받은 랜선 중 가장 긴 것으로 한다.
  // 예를 들어, k가 여럿인데 n이 1일 경우 입력받은 랜선의 길이 중 가장 긴 것을 반환하면 되기 때문에
  let min = 1;
  let max = Math.max(...lines);

  // 이분 탐색 진행
  while (min <= max) {
    const mid = Math.floor((min + max) / 2);
    // 현재 자를 길이를 기준으로 몇 개의 랜선이 만들어지는지 체크
    const cuttedLinesCount = getCuttedLinesCount(lines, mid);

    // 원하는 랜선 개수보다 크거나 같을 경우 더 긴 길이로 잘라보기
    if (cuttedLinesCount >= N) {
      min = mid + 1;
      // 원하는 랜선 개수보다 적을 경우 더 짧은 길이로 잘라보기
    } else {
      max = mid - 1;
    }
  }

  return max;
};

const getCuttedLinesCount = (lines, cutLength) => {
  return lines.reduce((acc, cur) => acc + Math.floor(cur / cutLength), 0);
};
```
