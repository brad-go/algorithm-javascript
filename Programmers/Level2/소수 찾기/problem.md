# 소수 찾기

## 문제 분류

: 완전 탐색

## 문제 설명

한자리 숫자가 적힌 종이 조각이 흩어져있습니다. 흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는지 알아내려 합니다.

각 종이 조각에 적힌 숫자가 적힌 문자열 numbers가 주어졌을 때, 종이 조각으로 만들 수 있는 소수가 몇 개인지 return 하도록 solution 함수를 완성해주세요.

## 제한 사항

- numbers는 길이 1 이상 7 이하인 문자열입니다.
- numbers는 0~9까지 숫자만으로 이루어져 있습니다.
- "013"은 0, 1, 3 숫자가 적힌 종이 조각이 흩어져있다는 의미입니다.

## 입출력 예

| numbers | return |
| ------- | ------ |
| "17"    | 3      |
| "011"   | 2      |

## 입출력 예 설명

### 입출력 예 #1

[1, 7]으로는 소수 [7, 17, 71]를 만들 수 있습니다.

### 입출력 예 #2

[0, 1, 1]으로는 소수 [11, 101]를 만들 수 있습니다.

11과 011은 같은 숫자로 취급합니다.

<details><summary><b>문제 풀이</b></summary><div markdown="1">

문제를 보고 해결 방법은 간단하게 떠올랐다.

1. 소수임을 판별하는 함수
2. 각 수를 쪼개고 조합해서 소수인지 체크하는 함수

이 두가지 기능을 가진 함수만 있으면 이 문제를 해결할 수 있다고 생각했다.

우선 소수임을 판별하기 위한 함수 isPrime을 만들었다. 에라토스 테네스의 체를 이용해서 문제를 풀이하고 싶었는데, 방법이 떠오르지 않아서 간단하게 구현했다.

```js
const isPrime = (num) => {
  if (num < 2) return false;

  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }

  return true;
};
```

그 다음 순열을 통해서 순서에 상관없이 모든 수를 체크하도록 만들었다.

```js
// 선택한 수라면 건너뛰기 위해 selected 배열을 이용해준다.
const selected = new Array(numbers.length).fill(false);
// 재귀 함수 perm이 종료될 때, 소수를 저장할 배열
const nums = [];

const perm = (cnt, max) => {
  // max에 도달하면
  if (cnt === max) {
    // ...
  }

  for (let i = 0; i < numbers.length; i++) {
    if (selected[i]) continue;

    selected[i] = true;
    nums[cnt] = numbers[i];
    perm(cnt + 1, max);
    selected[i] = false;
  }
};
```

그리고 이제 반복문을 통해 max(자릿 수)를 지정해주고, 소수를 저장해주었다.

```js
if (cnt === max) {
  const num = Number(nums.join(""));
  if (isPrime(num) && primeNums.indexOf(num) === -1) primeNums.push(num);
  return;
}

// ...

for (let i = 1; i <= numbers.length; i++) {
  perm(0, i);
}
```

#### 전체 코드

```js
function Solution(numbers) {
  // 소수 판별함수
  const isPrime = (num) => {
    if (num < 2) return false;

    for (let i = 2; i < num; i++) {
      if (num % i === 0) return false;
    }

    return true;
  };

  const primeNums = [];
  const selected = new Array(numbers.length).fill(false);
  const nums = [];

  const perm = (cnt, max) => {
    if (cnt === max) {
      const num = Number(nums.join(""));
      if (isPrime(num) && primeNums.indexOf(num) === -1) primeNums.push(num);
      return;
    }

    for (let i = 0; i < numbers.length; i++) {
      if (selected[i]) continue;

      selected[i] = true;
      nums[cnt] = numbers[i];
      perm(cnt + 1, max);
      selected[i] = false;
    }
  };

  for (let i = 1; i <= numbers.length; i++) {
    perm(0, i);
  }

  console.log(primeNums.length);
}
```

</div></details>
