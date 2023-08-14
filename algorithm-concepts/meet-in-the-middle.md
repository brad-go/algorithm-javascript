# Meet in the middle (중간에서 만나기)

**한개의 그룹으로 완전 탐색을 하지 못하는 경우 두 개의 그룹으로 나누어 탐색**하여 시간 복잡도를 줄이는 알고리즘이다.

예를 들어, N 크기 배열 원소의 모든 조합을 고려해야하는 문제가 있다고 해보자. 이때 N이 40이라면 경우의 수가 2^40(약 1조)으로 시간 내에 연산을 수행할 수 없다. 이런 경우를 위해 사용되는 기법인데, 해당 기법을 사용하면 2 \* (2^(n / 2))의 시간 복잡도로 문제를 해결할 수 있다.

Meet in the middle 기법은 분할정복과 비슷한 형태를 취하지만, 분할정복은 다수의 작은 문제 해결을 통해 커다란 하나의 문제를 해결하는 반면, Meet in the middle은 작은 문제 해결과 더불어 추가적인 연산이 필수적이라는 점에서 차이가 있다.

## 예제 코드

두 개의 배열에서 각각 하나의 요소를 선택하여 합이 특정한 값(9)이 되는 모든 조합을 찾는 예시이다.

```js
const array = [1, 2, 3, 4, 5];
const targetSum = 9;

const meetInTheMiddle = (array, targetSum) => {
  // 배열의 길이를 절반으로 나누어서 중간 지점 'half'를 계산하고, 왼쪽과 오른쪽으로 나눈다.
  const leftSums = generateSums(array.slice(0, Math.floor(half)));
  const rightSums = generateSums(array.slice(Math.floor(half)));

  // 왼쪽 부분합이 담긴 배열을 탐색
  const validPairs = leftSums.reduce((acc, cur) => {
    const target = targetSum - cur;

    // targetSum - 부분합이 오른쪽 부분합이 있는지 확인하기
    if (rightSums.includes(target)) {
      // 유효한 조합이라면 추가하기
      acc.push([cur, target]);
    }

    return acc;
  }, []);

  return validPairs;
};

// 하위 합을 생성하는 역할을 하는 함수. 주어진 배열에서 가능한 모든 부분합을 생성한다.
const generateSums = (array) => {
  const sums = [[]];

  array.forEach((num) => {
    const newSums = sums.map((subsum) => [...subsum, num]);

    sums.push(...newSums);
  });

  return sums.map((subsum) => subsum.reduce((acc, val) => acc + val, 0));
};

const result = meetInTheMiddle(array, targetSum);

console.log(result);
```

## 참고 문제

- [백준 1450](./BOJ/Gold1/1450_냅색%20문제/problem.md)

<br />

**[⬆ Back to Top](#meet-in-the-middle-중간에서-만나기)**
<br />
