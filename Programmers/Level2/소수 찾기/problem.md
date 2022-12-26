# 소수 찾기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/42839

## 문제 분류

: 완전 탐색

## 풀이 과정

일반적인 순열 알고리즘에서 조금 변형이 필요했다. 숫자가 아닌 문자열을 다뤘기 때문인데, 이를 해결하기 위해 `flat()`과 `join()` 메서드를 사용했다.

소수를 구하는 알고리즘도 조금 더 효율적인 방식으로 할 수 있을 것 같았는데, 기억이 나지 않았다.

1. 주어진 문자열을 쪼개서 배열로 만든다.
2. 순열을 통해 만들 수 있는 수의 모든 경우의 수를 구해준다.
3. 중복 숫자를 제거해준다.
4. 소수만을 남기고 모두 제외한다.
5. 소수의 개수를 반환한다.

```js
const solution = (numbers) => {
  // 문자열을 배열로 분할해주기
  const pieces = numbers.split("");

  // 중복을 제거한 각 문자로 만들 수 있는 모든 수
  const uniqueNumbers = pieces.reduce((acc, cur, index) => {
    // 각 자릿수마다 만들 수 있는 모든 수를 구하기
    const perm = getPermutations(pieces, index + 1)
      .flat()
      .map(Number);

    // 중복 숫자 제거
    return [...new Set([...acc, ...perm])];
  }, []);

  // 소수만 남기고 제거
  const primeNumbers = uniqueNumbers.filter(isPrimeNumber);

  return primeNumbers.length;
};

const getPermutations = (array, selectNumber) => {
  const results = [];

  if (selectNumber === 1) {
    return array.map((value) => [value]);
  }

  array.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    // 문자열이 합쳐져야 하기 때문에 겹겹이 겹쳐진 배열을 flat을 통해 1차원 배열로 만들기
    const permutations = getPermutations(rest, selectNumber - 1).flat();
    // join을 통해 문자열을 합쳐서 하나의 숫자를 나타내는 문자열로 만들기
    const attached = permutations.map((permutation) =>
      [fixed, ...permutation].join("")
    );

    results.push(attached);
  });

  return results;
};

const isPrimeNumber = (number) => {
  if (number < 2) {
    return false;
  }

  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
};
```

## 코드 개선

```js
const solution = (numbers) => {
  const pieces = numbers.split("");
  const permutations = getPermutations(pieces);
  const primeNumbers = getPrimeNumbers([...permutations]);

  return primeNumbers.length;
};

const getPermutations = (array) => {
  const set = new Set();

  for (let i = 1; i <= array.length; i++) {
    permutation(array, i, "", set);
  }

  return set;
};

const permutation = (array, selectNumber, current, set) => {
  if (selectNumber === 0) {
    set.add(Number(current));
    return;
  }

  array.forEach((value, index) => {
    const rest = [...array.slice(0, index), ...array.slice(index + 1)];

    permutation(rest, selectNumber - 1, current + value, set);
  });
};

const getPrimeNumbers = (numbers) => {
  return numbers.filter(isPrimeNumber);
};

const isPrimeNumber = (number) => {
  if (number < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
};
```
