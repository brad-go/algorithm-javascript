# 뉴스 클러스터링

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/17677

## 문제 분류

: 문자열, 구현

## 풀이 과정

1. 두 개의 문자열을 2글자씩 나눠 각각의 배열에 담는다.
2. 두 배열에서 교집합을 찾아낸다.
3. 자카드 유사도(교집합 원소의 개수 / 합집합 원소의 개수)를 구한다. 합집합 원소의 개수는 모든 원소의 개수 - 교집합의 개수로 구한다.
4. 유사도가 NaN이라면 65536을 아니면 유사도 \* 65536을 반환한다.

## 풀이 코드

```js
const solution = (str1, str2) => {
  // 두 글자씩 자른 문자열들
  const letters1 = splitByTwoLetters(str1);
  const letters2 = splitByTwoLetters(str2);
  // 모든 문자열
  const letters = [...letters1, ...letters2];

  // 교집합을 담을 배열
  const intersection = [];

  letters1.forEach((letter) => {
    // letter1의 글자가 letter2에 포함되었을 경우에만
    if (!letters2.includes(letter)) return;

    // 교집합 원소를 발견했을 경우 중복을 피하기 위해 letters2에서 해당 문자를 제거
    const index = letters2.findIndex((current) => current === letter);
    letters2[index] = null;

    intersection.push(letter);
  });

  // 자카드 유사도 = 교집합 개수 / 합집합 개수
  const similarity =
    intersection.length / (letters.length - intersection.length);

  // NaN인 경우는 65536, 아닌 경우는 유사도 * 65536
  return Number.isNaN(similarity) ? 65536 : Math.floor(similarity * 65536);
};

// 문자열을 두 글자씩 자르기
const splitByTwoLetters = (str1) => {
  const results = str1.split("").reduce((acc, cur, index, origin) => {
    if (index === origin.length - 1) return acc;

    const letters = [cur, origin[index + 1]];
    // 모두 알파벳인지 체크
    const isValid = letters.every((letter) => isAlphabet(letter));

    // 알파벳인 경우에만 담고 나머진 버리기
    if (isValid) acc.push(letters.join("").toLowerCase());

    return acc;
  }, []);

  return results;
};

// 알파벳인지 정규식을 통해 체크
const isAlphabet = (char) => {
  const regex = /[a-zA-Z]/g;

  return regex.test(char);
};
```

## 코드 개선

Set을 이용해서 합집합과 교집합의 개수를 구하는 방법도 있었다.

```js
const solution = (str1, str2) => {
  const letters1 = splitByTwoLetters(str1);
  const letters2 = splitByTwoLetters(str2);
  const letters = new Set([...letters1, ...letters2]);

  let intersection = 0;
  let union = 0;

  letters.forEach((letter) => {
    const hasLetter1 = letters1.filter((letter1) => letter1 === letter).length;
    const hasLetter2 = letters2.filter((letter2) => letter2 === letter).length;

    intersection += Math.min(hasLetter1, hasLetter2);
    union += Math.max(hasLetter1, hasLetter2);
  });

  return union === 0 ? 65536 : Math.floor((intersection / union) * 65536);
};

const splitByTwoLetters = (str1) => {
  const results = str1.split("").reduce((acc, cur, index, origin) => {
    if (index === origin.length - 1) return acc;

    const letters = [cur, origin[index + 1]];
    const isValid = letters.every((letter) => isAlphabet(letter));

    if (isValid) acc.push(letters.join("").toLowerCase());

    return acc;
  }, []);

  return results;
};

const isAlphabet = (char) => {
  const regex = /[a-zA-Z]/g;

  return regex.test(char);
};
```
