# 후보키

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/42890

## 문제 분류

: 백트래킹, 구현

## 풀이 과정

모든 조합을 구한다는 방식으로 접근은 굉장히 쉽게 했는데, 유일성과 최소성을 판별하는 것이
상당히 어려웠다. 유일성을 판별하기 위해 set객체를 통해 중복되지 않는 키를 만드는 생각을 떠올리는 것도 까다로웠고, 특히 최소성을 판별하기 위한 아이디어는 떠올렸지만, 코드로 뽑아내기가 어려웠다.

1. 각 튜플들의 인덱스를 통해 선택할 수 있는 조합을 구한다.
2. 유일성을 만족하는 모든 조합을 구한다.
3. 최소성을 만족하는 모든 조합을 구한다.
4. 유일성과 최소성을 만족하는 조합(후보 키)의 개수를 반환한다.

## 풀이한 코드

```js
const solution = (relation) => {
  // 튜플들의 이름을 알 수 없으므로, 튜플들의 인덱스를 구한다.
  const indicies = Array.from(Array(relation[0].length), (_, index) => index);
  // 각 튜플들을 선택할 수 있는 모든 조합을 구한다.
  const combinations = indicies.reduce((acc, cur) => {
    acc.push(...getCombinations(indicies, cur + 1));

    return acc;
  }, []);

  // 유일성을 만족하는 모든 조합(키)만을 구한다.
  const uniqueCombinations = combinations.filter((combination) =>
    hasUniqueness(relation, combination)
  );
  // 최소성을 만족하는 모든 조합(키)만을 구한다.
  const minimalCombinations = uniqueCombinations.filter(hasMinimality);

  // 유일성과 최소성을 모두 만족하는 조합(후보 키)의 개수를 반환한다.
  return minimalCombinations.length;
};

// 모든 조합을 구하기 위한 함수
const getCombinations = (array, select) => {
  const results = [];

  if (select === 1) {
    return array.map((number) => [number]);
  }

  array.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, select - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);

    results.push(...attached);
  });

  return results;
};

// 유일성을 체크하는 함수
const hasUniqueness = (relation, combination) => {
  // 입력받은 relation을 반복하면서
  const candidates = relation.reduce((acc, cur) => {
    // 위에서 구한 조합을 통해 키를 만든다.
    // 여기서 combination은 위에서 구한 조합이므로 [0], [0, 2], [0, 1, 2, 3] 등이 될 수 있고,
    // cur은 [100, ryan, music, 2]와 같고,
    // 그러므로 ke의 모양은 다음과 같다. '100', '100 music', '100 ryan music 2'
    const key = combination.map((index) => cur[index]).join(" ");
    // set객체에 넣어준다.
    acc.add(key);

    return acc;
  }, new Set());

  // set객체에 넣었기 때문에 중복된 키가 있었다면 개수가 relation의 길이(총 학생들의 수)와 다르다.
  // 즉, 유일하게 식별할 수 있는 키가 아니었던 것.
  return candidates.size === relation.length;
};

// 최소성을 판별하기 위해 사용하는 함수
const hasMinimality = (combination, index, origin) => {
  // 현재 조합을 제외한 기존 배열(유일성을 만족하는 튜플의 조합들)
  const rest = origin.filter((_, idx) => index !== idx);
  // 현재 조합과 나머지 조합들을 비교해서 하나라도 다음을 만족한다면 최소성 만족 x.
  const isDuplicate = rest.some((restCombination) => {
    // 나머지 조합의 원소들이 현재 조합에 모두 포함된다면 최소성을 만족하지 않는다.
    // 예를 들어 [0]과 [1, 2]는 최소성을 만족할 수 있다.
    // [0]과 [0, 2]는 최소성을 만족하지 않는다.
    // 그렇다면 [2, 3]와 [1, 3, 4]는 어떨까?
    // 최소성을 만족한다고 할 수 없다. 3이 중복되지만
    // 3만으로는 최소성, 유일성을 판별할 수 없기 때문
    return restCombination.every((number) => combination.includes(number));
  });

  return !isDuplicate;
};
```
