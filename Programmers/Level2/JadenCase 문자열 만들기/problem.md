# JadenCase 문자열 만들기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12951

## 문제 분류

: 문자열, 구현

## 풀이 과정

1. 문자열을 공백을 기준으로 분할해 단어 배열로 만든다.
2. 만약 단어가 빈문자열이라면 그대로 반환한다. (공백이 연속해서 나올 수 있으므로)
3. 각 단어들의 첫글자로 대문자로 변환하고, 뒤에 단어들을 소문자로 변환한다.

## 풀이한 코드

```js
const solution = (s) => {
  const words = s.split(" ");

  return words.map((word) => {
    if (word === "") return word;

    const firstLetter = word[0].toUpperCase();
    const rest = word.slice(1).toLowerCase();

    return firstLetter + rest;
  });
};
```

## 코드 개선

연속된 공백문자가 s에 있을 경우 공백으로 나누기 때문에 원소 ''이 포함되게 된다. 이를 다른 단어들과 마찬가지로
인덱스를 통해 접근하게 되면 에러가 발생하기 때문에 기존 코드에서는 조건문을 통해 분기처리를 해주었었다.

그러나 `charAt()`을 통해 접근하면 문자열의 범위를 벗어나는 인덱스에 대해서는 빈 문자열(`''`)을 반환하기 때문에
분기처리 필요없이 더 간단하게 처리할 수 있었다.

```js
const solution = (s) => {
  return s
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
```
