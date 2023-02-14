# 2419. 암호 해독

## 문제 링크

https://www.acmicpc.net/problem/2149

## 문제 분류

: 구현, 문자열, 정렬

## 소요 시간

: 50분

## 풀이 방법

1. 키를 이용해서 암호화된 순서를 구한다.
   1.1. 암호화된 순서를 구하기 위해 키와 정렬한 키의 문자들을 비교하면서 같은 문자의 인덱스를 구한다.
   1.2. 중복된 인덱스가 있을 수 있기 때문에 확인하면서 순서 배열에 담아준다.
2. 암호문이 열번호가 작은 것 먼저 오도록 암호화되어 있기 때문에 열을 기준으로 각 행을 만들어 각 행의 암호문을 구한다.
3. 각 행의 암호문을 1에세 구한 순서를 기준으로 복호화해서 하나로 합쳐 반환해준다.

## 풀이 코드

```js
const solution = (key, cryptogram) => {
  const N = key.length;
  // 암호화된 순서 구하기
  const order = findEncryptOrder(key);
  // 암호문을 키 길이로 나눠주기
  const splitedCryptogram = getCryptogramSplitedByKeyLength(N, cryptogram);

  // 각 행의 암호문을 위에서 구한 순서를 이용해 복호화해주기
  const original = splitedCryptogram.reduce((acc, cur) => {
    const decrypted = order.map((index) => cur[index]).join("");
    acc += decrypted;
    return acc;
  }, "");

  return original;
};

const findEncryptOrder = (key) => {
  const order = [];
  const sorted = key.split("").sort();

  key.split("").forEach((key) => {
    const equals = [];

    // 기존 키와 정렬된 키에서 같은 문자열이 있다면 equals에 넣어주기
    sorted.forEach((char, index) => {
      if (key === char) equals.push(index);
    });

    // 중복 문자가 있을 수 있기 때문에 반복문을 통해 중복을 피한 순서 구해주기
    for (let i = 0; i < equals.length; i++) {
      if (order.includes(equals[i])) continue;

      order.push(equals[i]);
      break;
    }
  });

  return order;
};

const getCryptogramSplitedByKeyLength = (keyLength, cryptogram) => {
  // 행의 개수
  const rows = cryptogram.length / keyLength;
  // 행의 개수만큼 빈 문자열 만들기
  const splitedCryptogram = new Array(rows).fill("");

  // 암호문이 열번호가 작은 것부터 앞으로 오도록 배치되어 있기 때문에
  // 행 개수씩 증가시키면서 각 행의 암호화된 문자열 구하기
  for (let i = 0; i < cryptogram.length; i += rows) {
    for (let j = 0; j < rows; j++) {
      splitedCryptogram[j] += cryptogram[i + j];
    }
  }

  return splitedCryptogram;
};
```

## 코드 개선

로직은 비슷하지만 순서를 찾는 과정을 조금 더 단순화한 코드. 기존 코드는 키와 정렬된 키를 비교하면서
암호화 순서를 구했지만, 이번 코드는 정렬을 이용해서 암호화 순서를 찾고 풀어냈다.

```js
const solution = (key, cryptogram) => {
  const order = findEncryptOrder(key);
  const splited = getCryptogramSplitedByKeyLength(key.length, cryptogram);

  const original = splited.reduce((acc, cur) => {
    // 각 행의 문자열에 현재 암호화 순서 매기기
    const withOlder = cur.map((char, index) => ({ char, order: order[index] }));
    // 정렬해주고 문자만 남겨서 문자열로 만들기
    const decrypted = withOlder
      .sort((a, b) => a.order - b.order)
      .map(({ char }) => char)
      .join("");

    acc += decrypted;
    return acc;
  }, "");

  return original;
};

const findEncryptOrder = (key) => {
  const keyWithIndex = key.split("").map((char, index) => ({ char, index }));

  keyWithIndex.sort((a, b) => a.char.localeCompare(b.char));

  return keyWithIndex.map(({ index }) => index);
};

const getCryptogramSplitedByKeyLength = (keyLength, cryptogram) => {
  const rows = cryptogram.length / keyLength;
  const splitedCryptogram = Array.from(Array(rows), () => []);

  for (let i = 0; i < cryptogram.length; i += rows) {
    for (let j = 0; j < rows; j++) {
      splitedCryptogram[j].push(cryptogram[i + j]);
    }
  }

  return splitedCryptogram;
};

console.log(solution(key, cryptogram));
```
