# 14584. 암호 해독

## 문제 링크

https://www.acmicpc.net/problem/14584

## 문제 분류

: 문자열, 브루트포스(완전 탐색)

## 소요 시간

: 40분

## 풀이 방법

암호화된 문자열이 몇 칸 뒤의 알파벳으로 변경되었는지 찾아야 하는 문제였다. 몇 칸인지 찾기 위해서는 몇 칸이 선택되는 규칙을 알 수 없으므로 완전 탐색을 사용해야 한다고 판단했고, 알파벳을 n칸만큼 미뤄보면서 암호화된 문자열을 복호화해보는 방식으로 문제를 풀이했다.

1. A - Z까지 담긴 알파벳이 담긴 알파벳 배열을 선언한다.
2. 0 ~ 알파벳의 개수만큼 알파벳을 밀어보면서 다음을 실행한다.
3. 기존 알파벳을 키로히거 밀어서 변경된 알파벳을 값으로 객체를 생성한다.
4. 암호화된 문자열의 각 문자를 3의 객체의 키값으로 집어넣어서 복호화한다.
5. 주어진 단어들 중 하나라도 복호화된 문자열에 포함된다면 해당 복호화된 문자열을 출력한다.

## 풀이 코드

```js
const solution = (N, cryptogram, words) => {
  // charCode를 이용해 알파벳 배열 선언
  const alphabets = new Array(26).fill().map((_, index) => {
    return String.fromCharCode(index + 97);
  });

  // 0부터 알파벳의 개수만큼 밀어서 복호화해봐야 하기 때문에 반복
  for (let i = 0; i < 26; i++) {
    // 복호화를 위해 기존 알파벳이 키, 변경된 알파벳이 값인 객체 생성
    const cryptography = alphabets.reduce((acc, cur, index) => {
      // 0 이하라면 뒤에서부터 계산
      const idx = index - i < 0 ? index - i + alphabets.length : index - i;
      acc[cur] = alphabets[idx];
      return acc;
    }, {});
    // 위 객체를 이용해 복호화해주기
    const decrypted = cryptogram
      .split("")
      .map((char) => cryptography[char])
      .join("");
    // 주어진 단어들 중 하나라도 복호화된 문자열에 포함되는지 확인하고 포함된다면 원본 문자열임
    const isOriginal = words.some((word) => decrypted.includes(word));

    if (isOriginal) return decrypted;
  }
};
```
