# 영어 끝말잇기

## 문제 링크

https://school.programmers.co.kr/learn/courses/30/lessons/12981

## 문제 분류

: 구현

## 풀이 과정

1. 단어들을 앞에서 부터 확인하면서 앞에서 나왔던 단어나 앞 단어의 마지막 알파벳과 다른 알파벳으로 시작하는 단어의 인덱스를 찾는다.
2. 해당 인덱스를 통해 몇 번째 사람인지, 몇 번째 차례인지를 배열에 담아 반환한다.

## 풀이 코드

```js
const solution = (n, words) => {
  // 틀린 단어의 인덱스 찾기
  const index = words.findIndex((word, index, origin) => {
    // n은 2이상 words도 길이가 2이상이기 때문에 인덱스 한개라면 틀린 단어일 수 없음
    if (index < 1) return;

    // 이전 단어의 마지막 알파벳 찾기
    const lastWord = origin[index - 1];
    const lastChar = lastWord[lastWord.length - 1];

    // 만약 앞에서 사용한 단어거나 현재 단어의 첫 알파벳이 이전 단어의 알파벳과 다르다면 인덱스 반환
    return origin.indexOf(word) !== index || lastChar !== word[0];
  });

  // 찾은 인덱스를 기준으로 몇번째 사람인지, 몇번째 차례에 틀렸는지 반환
  return [(index % n) + 1, Math.ceil((index + 1) / n)];
};
```
