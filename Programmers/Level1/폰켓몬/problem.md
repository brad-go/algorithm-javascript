# 폰켓몬

## 문제 분류

해쉬

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/1845

## 풀이 아이디어

1. 중복된 번호를 제외한 폰켓몬 종류의 수를 구한다.
2. 선택할 수 있는 폰켓몬 종류의 개수(n/2)와 중복을 제외한 폰켓몬 종류의 수를 비교한다.
3. 폰켓몬 종류의 수가 더 많다면 선택할 수 있는 폰켓몬 종류보다 더 많은 종류의 폰켓몬이 있으므로, 선택할 수 있는 폰켓몬 종류의 개수(n/2)를 반환한다.
4. 폰켓몬 종류의 수가 선택할 수 있는 폰켓몬 종류보다 적다면, 선택하려고하는 수보다 폰켓몬 종류가 수가 적으므로, 존재하는 폰켓몬 종류의 수를 반환한다.

## 풀이한 코드

```js
const solution = (nums) => {
  // 중복된 번호를 제외한 폰켓몬 종류의 수 구하기
  const pokemonVarieties = new Set(nums).size;
  // 선택할 수 있는 폰켓몬의 수
  const selectCount = nums.length / 2;

  return pokemonVarieties > selectCount ? selectCount : pokemonVarieties;
};
```
