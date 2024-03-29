# LIS (최장 증가 부분 수열)

## LIS(Longest Increasing Subsequence) 알고리즘이란?

어떠한 수열이 주어질 때, 그 수열에서 일부 원소를 뽑아내어 새로 만든 수열을 ‘부분 수열'이라고 하며, 이 수열이 오름차순을 유지하면 ‘증가하는 부분 수열'이 된다.

**LIS**(**Longest Increasing Sequence**)는 특정 값들이 저장되어 있는 배열 형태에서 **순차적으로 증가하는 부분 수열 중 가장 길이가 긴 것**을 의미한다. 즉, 말 그대로 최장 증가 부분 수열이다.

예를 들어 아래와 같은 배열이 있다.

| Index  | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| arr[i] | 4   | 2   | 1   | 3   | 5   | 8   | 6   | 7   |

여기서 가장 긴 증가하는 부분 수열, 즉 LIS는 어떤 걸 의미할까? 우선 각 숫자가 이전의 수들보다 크다면, 그 순서가 가장 큰 경우를 구해보자. 그 배열을 LIS라고 해보자.

우선 `i = 0`인 `arr[0] = 4`일 때, 자기 자신만 존재해도 수열을 만들 수 있고, 혼자서라도 LIS의 일부가 될 수 있으니 **1로 시작**할 수 있다.

`arr[1] = 2` → 2는 이전의 4보다 작다. 따라서 LIS는 1이다.

`arr[2] = 1` → 1은 이전의 2보다 작다. 따라서 LIS는 1이다.

`arr[3] = 3` → 3은 이전의 2보다 혹은 1보다 크니까 LIS는 2이다.

`arr[4] = 5` → 5는 4보다 크니까 LIS는 2, 또는 2, 3보다 크니까 LIS는 3, 또는 1, 3보다 크니까 LIS는 3이다. 해당 원소를 기준으로 가장 큰 것을 골라 LIS는 3이다.

`arr[5] = 8` → 8은 4, 5보다 크니까 LIS는 3, 또는 2, 3, 5보다 크니까 LIS는 4, 또는 1, 3, 5보다 크니까 LIS는 4다. 해당 원소를 기준으로 가장 큰 것을 골라 LIS는 4다.

`arr[6] = 6` → 6은 4, 5보다 크니까 LIS는 3, 또는 2, 3, 5보다 크니까 LIS는 4, 또는 1, 3, 5보다 크니까 LIS는 4다. 해당 원소를 기준으로 가장 큰 것을 골라 LIS는 4다.

`arr[7] = 7` → 7은 4, 5, 6보다 크니까 LIS는 4, 또는 2, 3, 5, 6보다 크니까 LIS는 5, 또는 1, 3, 5, 6보다 크니까 LIS는 5다. 해당 원소를 기준으로 가장 큰 것을 골라 LIS는 5다.

이제 아래를 확인해보자.

| Index  | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| arr[i] | 4   | 2   | 1   | 3   | 5   | 8   | 6   | 7   |
| LIS[i] | 1   | 1   | 1   | 2   | 3   | 4   | 4   | 5   |

위 예제에서 가장 긴 부분 수열, 즉 LIS는 `[2, 3, 5, 6, 7]`이다. 위 예제를 통해 알게 된 최장 증가 부분 수열(LIS)에 대한 개념을 다시 정리해보자.

> **원소가 n개인 배열의 일부 원소를 골라내서 만든 부분 수열 중, 각 원소가 이전 원소보다 크다는 조건을 만족하고, 그 길이가 최대인 부분 수열을 최장 증가 부분 수열이라고 한다.**

눈치 챘을지 모르겠지만, 위 예제를 통해서 LIS는 부분적으로 여러개가 존재할 수 있다는 것을 알 수 있다. 위 예제에서 LIS는 `[1, 3, 5, 6, 7]`도 될 수 있다. 이와 같이 LIS는 반드시 하나로 결정되지 않는다. 하지만 **최대 길이 그 자체는 하나의 숫자로 정해진다**.

그러므로 **문제에서도 답**으로 **LIS의 길이를 출력**하도록 하거나, **수열을 구한다면 답이 여러 개가 되도록 출제**된다.

<br />

## 풀이 알고리즘

### 1. 완전 탐색

단순하게 생각하면 그 배열 내에서 각 위치의 데이터를 기준으로 하나하나 다 비교하며 길이가 얼마나 되는지 확인하는 것이다. 즉, 배열 내 모든 증가 수열을 모두 파악하여 그 길이를 비교하는 방법을 수행하는 방식이다.

- 각 인덱스에서 시작해서 제일 증가하는 부분 수열을 찾아 **반복 + 재귀문**을 사용하여 푸는 방식
- 각 인덱스에서 시작해, 재귀를 통해 다시 호출하므로 전체 시간복잡도가 `O(2^N)`이 된다.

```tsx
const input = [4, 2, 1, 3, 5, 8, 6, 7];

function Solution(arr) {
  const N = arr.length;
  const LIS = new Array(N).fill(1); // LIS 길이 값을 저장하는 배열
  let MAX_LIS = 1; // LIS 길이 중 가장 긴 값을 저장

  // 완전 탐색 함수
  const searchExhaustive = (arr, idx) => {
    if (idx === 0) return 1; // 맨 처음 길이가 1일 때는 자기 자신만으로 LIS 구성, 1반환
    let value = 1; // 1에서 시작

    for (let i = idx - 1; i >= 0; i--) {
      // 현재 위치보다 이전 값들이 작다면 LIS의 대상이 될 수 있으니, 해당 위치 기준으로 재귀를 통해 지속 탐색 수행
      if (arr[i] < arr[idx])
        value = Math.max(value, searchExhaustive(arr, i) + 1);
    }

    return value;
  };

  // 각 인덱스마다 완전 탐색 실행하기
  for (let i = 0; i < N; i++) {
    LIS[i] = Math.max(LIS[i], searchExhaustive(arr, i));
    MAX_LIS = Math.max(MAX_LIS, LIS[i]); // 현재 까지의 최장 길이로 업데이트
  }

  // 최장 길이 출력
  console.log(`LIS 길이: ${MAX_LIS}`); // 5

  // 각 인덱스별 LIS 길이값 출력
  console.log(`각 인덱스의 LIS 길이: ${LIS}`); // 1, 1, 1, 2, 3, 4, 4, 5
}

Solution(input);
```

<br />

### 2. DP

위의 완전 탐색 방식은 재귀를 통해 동일한 작은 문제가 반복되고 있고, 그 아래 작은 문제의 최적결과가 있다면 그대로 사용할 수 있다. 따라서 DP의 2가지 조건인 **Overlapping Subproblems**(중복 되는 부분 문제)와 **Optimal Structure**(최적 부분 구조)가 모두 충족되어 DP를 통해 해결할 수 있다.

문제를 정의하면 다음과 같다.

- **정의**: **길이 N의 배열에서 LIS의 길이 구하기**

DP를 해결하기 위해서는 **변수가 될 상태 값에 대해 이해하는 것이 중요**하다. 전체 배열은 N이지만, 작은 문제로 나누어서 생각한다면 배열의 길이가 1인 것부터 시작해서 그 최적값을 구해 전체 배열의 결과를 구할 수 있을 것이다. 따라서 **길이 그 자체가 상태값**이 된다.

상태가 1차원이므로 작은 문제들의 결과값, 즉 **DP의 결과를 저장할 1차원 배열**을 만들 수 있다. 그 크기는 기존 배열과 같게 생성하면 된다.

기저 상태는 어떻게 될까? 배열의 길이가 1일 때이다. 즉 N=1, index로는 0일 때, 그 자체만으로 LIS가 되므로 그 상태 지정을 할 수 있다.

- **기저 상태: LIS[0] = 1**

DP 문제를 해결하기 위해 가장 중요한 점화식을 알아보자. LIS의 특성에 따라 다음과 같은 점화식을 구할 수 있다.

- **점화식: LIS[i] = LIS[j] + 1 (단, j < i && arr[j] < arr[i])**

기존 배열이 `arr[]`일 때, 다음 2가지 조건을 충족해야 한다.

1. 현재 위치(i)보다 이전 위치(j)와 비교한다.
2. 현재 위치(i)의 값(`arr[i]`)보다 이전 위치(j)의 값 (`arr[j]`)가 더 작아야 한다.

#### 풀이 방식

1. 수열의 길이와 같은 LIS배열을 선언하고 1로 초기화한다.
2. 수열을 처음부터 끝까지 순서대로 1개씩 탐색한다. ( 현재 위치 = i )
   - 현재 위치(i)보다 이전에 있는 원소(j) 중에서 현재보다 작은지 체크한다.
   - 현재 원소보다 작다면, `LIS[j] + 1과 LIS[i]`의 크기를 비교해서 큰 것을 할당해준다. 현재 위치에서 각 원소(`arr[j]`)를 포함할 수 있는지 체크하고, 가능하면 길이는 늘어난다.
   - 이전 원소(j)번째 인덱스에서 끝나는 최장 증가 부분 수열의 마지막에 `arr[i]`를 추가했을 때의 LIS 길이와 추가하지 안고, 기존의 `LIS[i]`값 둘 중에 더 큰 값으로 `LIS[i]`값을 업데이트 한다.
3. dp 배열의 원소에서 가장 큰 값을 출력한다.

```tsx
const input = [4, 2, 1, 3, 5, 8, 6, 7];

function Solution(arr) {
  const N = arr.length;

  const LIS = new Array(N).fill(1);

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) LIS[i] = Math.max(LIS[i], LIS[j] + 1);
    }
  }

  console.log(Math.max(...LIS));
}

Solution(input);
```

<details><summary><b>수열까지 구할 수 있는 코드</b></summary><div markdown="1">

<br />

```tsx
function Solution(arr) {
  const N = arr.length;

  const LIS = new Array(N);
  const V = new Array(N);

  const dp = () => {
    let max_lis = 0;
    let last = 0;

    for (let i = 0; i < LIS.length; i++) {
      LIS[i] = 1;
      V[i] = -1;

      for (let j = i - 1; j >= 0; j--) {
        if (arr[j] < arr[i] && LIS[j] >= LIS[i]) {
          LIS[i] = LIS[j] + 1;
          V[i] = j;
        }
        if (max_lis < LIS[i]) {
          max_lis = LIS[i];
          last = i;
        }
      }
    }
    return last;
  };

  const result = dp();
  console.log(`LIS 길이: ${LIS[result]}`);

  let LIS_LENGTH = "";
  for (let i = 0; i < LIS.length; i++) {
    LIS_LENGTH += LIS[i] + ", ";
  }
  console.log(`각 index의 LIS 값: ${LIS_LENGTH}`);

  let lis = "";
  const getLIS = (idx) => {
    if (V[idx] === -1) {
      lis += arr[idx] + " ";
      return;
    }
    getLIS(V[idx]);
    lis += arr[idx] + " ";
  };
  getLIS(result);

  console.log(`LIS 배열 출력: ${lis}`);
}

Solution(input);
```

</div></details><br />

위 코드에서 볼 수 있듯이 2중 반복문을 통해서 LIS를 구해 나가고 있다. 따라서 이와 같은 풀이 방식은 시간 복잡도가 `O(N^2)`가 된다. 완전 탐색보다는 낫지만, 여전히 높은 시간복잡도가 요구된다.

<br />

### 3. 이분 탐색

여전히 높은 시간복잡도를 가지고 있는 풀이 방법을 개선하기 위해 **이분 탐색**을 사용할 수 있다. 이 해결법으로 `O(nlogn)`의 시간복잡도를 가질 수 있다. 즉, 원래의 `O(N^2)`의 알고리즘에서 이전의 원소들을 탐색하는 과정(`O(N)`)을 이분 탐색(`O(logn)`)을 이용해서 시간을 더 줄여주는 것이다.

여기서의 아이디어는 다음과 같다.

1. 추가 배열을 만들고 기존 배열을 탐색하며 큰 수는 추가 배열에 이어 붙인다.
2. 추가 배열의 마지막에 추가된 값보다 작은 값은 **이분 탐색**을 통해 적절한 자리를 찾아 교환한다.

**핵심 아이디어**는 LIS를 만들기 위해서 만드는 과정에서 **LIS의 마지막 원소가 가능한 작을 수록 더 긴 LIS를 생성할 수 있다**는 것이다. 그러므로 원소가 들어올 때, 만약 **현재 생성된 LIS의 원소보다 작은 경우, LIS에 들어갈 위치를 찾은 후(O(logn)) 원소를 대체**한다.

- **장점**: 이분 탐색을 통해 빠르게 LIS의 길이를 구할 수 있다.
- **단점**: LIS 배열 그 자체는 중간에 값이 교체되기 때문에 구할 수 없을 수도 있다.

예를 들어 다음과 같은 기존 배열 `arr[]`과 추가 배열 `LIS[]`가 있다.

| Index  | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| arr[i] | 4   | 2   | 1   | 3   | 5   | 8   | 6   | 7   |
| LIS[i] |     |     |     |     |     |     |     |     |

1. 인덱스 0 탐색(arr[0])

| Index  | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| arr[i] | 4   | 2   | 1   | 3   | 5   | 8   | 6   | 7   |
| LIS[i] | 4   |     |     |     |     |     |     |     |

- arr[0]은 최초의 값이므로 바로 LIS 배열에 추가한다.
- 현재 마지막 추가된 값: 10

2. 인덱스 1 탐색(arr[1])

| Index  | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| arr[i] | 4   | 2   | 1   | 3   | 5   | 8   | 6   | 7   |
| LIS[i] | 2   |     |     |     |     |     |     |     |

- 이전 LIS 배열의 마지막 값은 4였다. arr[1] = 2로 이전 수보다 작은데, 순서 상 교체될 수 있는 위치는 `LIS[0]`이므로 교체한다.
- 현재 마지막 추가된 값: 2

3. 인덱스 2 탐색(arr[2])

| Index  | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| arr[i] | 4   | 2   | 1   | 3   | 5   | 8   | 6   | 7   |
| LIS[i] | 1   |     |     |     |     |     |     |     |

- 이전 LIS 배열의 마지막 값은 2였다. arr[2] = 1로 이전 수보다 작은데, 순서 상 교체될 수 있는 위치는 `LIS[0]`이므로 교체한다.
- 현재 마지막 추가된 값: 1

4. 인덱스 3 탐색(arr[3])

| Index  | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| arr[i] | 4   | 2   | 1   | 3   | 5   | 8   | 6   | 7   |
| LIS[i] | 1   | 3   |     |     |     |     |     |     |

- 이전 LIS 배열의 마지막 값은 1이었다. arr[3] = 3로 이전 수보다 크기 때문에 바로 LIS 배열에 추가할 수 있다.
- 현재 마지막 추가된 값: 3

5. 인덱스 4 탐색(arr[4])

| Index  | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| arr[i] | 4   | 2   | 1   | 3   | 5   | 8   | 6   | 7   |
| LIS[i] | 1   | 3   | 5   |     |     |     |     |     |

- 이전 LIS 배열의 마지막 값은 3이었다. arr[4] = 5로 이전 수보다 크기 때문에 바로 LIS 배열에 추가할 수 있다.
- 현재 마지막 추가된 값: 5

6. 인덱스 5 탐색(arr[5])

| Index  | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| arr[i] | 4   | 2   | 1   | 3   | 5   | 8   | 6   | 7   |
| LIS[i] | 1   | 3   | 5   | 8   |     |     |     |     |

- 이전 LIS 배열의 마지막 값은 5였다. arr[5] = 8로 이전 수보다 크기 때문에 바로 LIS 배열에 추가할 수 있다.
- 현재 마지막 추가된 값: 8

7. 인덱스 6 탐색(arr[6])

| Index  | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| arr[i] | 4   | 2   | 1   | 3   | 5   | 8   | 6   | 7   |
| LIS[i] | 1   | 3   | 5   | 6   |     |     |     |     |

- 이전 LIS 배열의 마지막 값은 8이었다. arr[6] = 6로 이전 수보다 작은데, 순서 상 교체될 수 있는 위치는 `LIS[3]`이므로 교체한다.
- 현재 마지막 추가된 값: 6

8. 인덱스 7 탐색(arr[7])

| Index  | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| arr[i] | 4   | 2   | 1   | 3   | 5   | 8   | 6   | 7   |
| LIS[i] | 1   | 3   | 5   | 6   | 7   |     |     |     |

- 이전 LIS 배열의 마지막 값은 6이었다. arr[7] = 7로 이전 수보다 크기 때문에 바로 LIS 배열에 추가할 수 있다.
- 현재 마지막 추가된 값: 7

위와 같이 구한 결과 전체 LIS의 길이는 5라는 것을 알 수 있다. 하지만 위에서 단점에 대해 설명했듯이, 중간에 교체되어 LIS배열이 실제 LIS라고 볼 수 없게 된다.

#### 길이만 출력

```tsx
function Solution(arr) {
  const N = arr.length;
  const LIS = new Array(N);
  LIS[0] = arr[0]; // 최초 인덱스 0의 값은 arr[0]

  // 반복문을 이용한 이진 탐색
  const binarySearch = (arr, x) => {
    let start = 0;
    let end = arr.length - 1;

    // 현재 탐색한 위치가 찾고하자 하는 값도다 크냐 작냐에 따라 중간 idx 계산을 위한 start / end값을 업데이트
    while (start < end) {
      const mid = Math.ceil((start + end) / 2);
      if (arr[mid] === x) return mid;

      if (arr[mid] < x) start = mid + 1;
      else end = mid - 1;
    }

    // 일치값을 찾지 못했을 때, -1이 아니라 그 적절한 위치를 반환해야 함
    return start;
  };

  let idx = 0;

  for (let i = 1; i < N; i++) {
    // 기존 배열이 탐색 중 더 큰 숫자라면 뒤에 이어 붙이기
    if (LIS[idx] < arr[i]) {
      LIS[++idx] = arr[i];
      continue;
    }

    // 그렇지 않고 작다면 이진 탐색을 통해 교체 수행
    const target_idx = binarySearch(LIS, arr[i]);
    LIS[target_idx] = arr[i];
  }

  console.log("LIS 길이: " + (idx + 1));
}

Solution(input);
```

### 실제 LIS 출력하기

실제 LIS를 출력하고 싶다면 약간의 수정이 필요하다.

```tsx
function Solution(arr) {
  const N = arr.length;
  const LIS = new Array(N);
  LIS[0] = arr[0];

  // 몇번째 인덱스가 LIS에 들어가는 지 저장할 배열
  const record = new Array(N);
  record[0] = 0; // 시작 값은 무조건 0번째 인덱스

  const binarySearch = (arr, x) => {
    let start = 0;
    let end = arr.length - 1;

    while (start < end) {
      const mid = Math.ceil((start + end) / 2);
      if (arr[mid] === x) return mid;

      if (arr[mid] < x) start = mid + 1;
      else end = mid - 1;
    }

    return start;
  };

  let idx = 0;

  for (let i = 1; i < N; i++) {
    if (LIS[idx] < arr[i]) {
      LIS[++idx] = arr[i];
      // 각 수가 LIS 배열에 들어갈 때, 몇번째 인덱스에 들어가는 지를 record라는 리스트에 저장
      record[i] = idx;
      continue;
    }

    const target_idx = binarySearch(LIS, arr[i]);
    LIS[target_idx] = arr[i];
    // 각 수가 LIS 배열에 들어갈 때, 몇번째 인덱스에 들어가는 지를 record라는 리스트에 저장
    record[i] = target_idx;
  }

  console.log("LIS 길이: " + (idx + 1));

  // 실제 LIS 수열을 담을 배열
  const LIS_RESULT = [];

  // record가 다 차면 최대값으로부터 역순으로 순회하여 그 인덱스에 해당하는 값을 LIS_RESULT에 저장
  for (let i = N - 1; i >= 0; i--) {
    // 증가되어 있는 idx(4)가 record[i](몇번째 인덱스에 들어간지)와 같으면 LIS_RESULT에 기존 배열에서 찾아서 저장
    if (idx === record[i]) {
      LIS_RESULT[idx] = arr[i];
      // 해당 번째 수를 찾았으면 idx를 낮춰서 다음 거에서 찾기
      idx--;
    }
  }

  console.log("실제 LIS 출력: " + LIS_RESULT);
}

Solution(input);
```

## 참고

- [겐지충님 블로그](https://hongjw1938.tistory.com/58?category=909529)

<br />

**[⬆ Back to Top](#lis-최장-증가-부분-수열)**
<br />
