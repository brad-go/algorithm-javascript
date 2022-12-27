# 모음 사전

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/84512

## 문제 분류

: 완전 탐색

## 풀이 과정

1. 주어진 다섯 개의 알파벳을 순열을 통해 순서가 상관없는 모든 단어의 조합을 구해 사전을 만든다.
2. 사전을 정렬해준다.
3. 단어의 인덱스를 반환한다.

```js
const solution = (word) => {
  // 주어진 단어들
  const ALPHABETS = ["A", "E", "I", "O", "U"];
  // 사전을 만들고 정렬하기
  const dictionary = [...getDictionary(ALPHABETS)].sort();
  // 사전의 각 단어들에 번호 매겨주기
  const dictionaryMap = dictionary.reduce((acc, word, index) => {
    acc.set(word, index + 1);
    return acc;
  }, new Map());

  return dictionaryMap.get(word);
};

const getDictionary = (alphabets) => {
  const dictionary = new Set();

  // 모든 단어를 사전에 등록
  for (let i = 1; i <= alphabets.length; i++) {
    permutation(alphabets, "", i, dictionary);
  }

  return dictionary;
};

const permutation = (alphabets, current, select, dictionary) => {
  if (select === 0) {
    dictionary.add(current);
    return;
  }

  alphabets.forEach((alphabet, index) => {
    // 일반적인 순열과 달리 나머지가 아닌 모든 조합을 구해주므로 현재 알파벳을 제외할 필요가 없다.
    permutation(alphabets, current + alphabet, select - 1, dictionary);
  });
};
```
