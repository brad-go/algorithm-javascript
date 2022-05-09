# 17. Letter Combinations of a Phone Number

- [문제 링크](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)

2-9 사이의 숫자를 포함한 문자열이 주어진다. 숫자가 나타낼 수 있는 모든 가능한 문자 조합을 임의의 순서로 반환하라.

각 숫자에 매핑된 문자열은 아래와 같다. 1은 아무 문자열도 가지지 않는다.

![keypad](https://www.researchgate.net/profile/Shumin-Zhai/publication/221518150/figure/fig1/AS:305488823635968@1449845619238/The-standard-12-key-telephone-keypad-character-layout-follows-the-ITU-E161-standard-8.png)

## 문제 풀이

우선 객체의 형태로 전화기 키패드를 저장해준다.

```js
const KEYPAD = {
  1: null,
  2: ["a", "b", "c"],
  3: ["d", "e", "f"],
  4: ["g", "h", "i"],
  5: ["j", "k", "l"],
  6: ["m", "n", "o"],
  7: ["p", "q", "r", "s"],
  8: ["t", "u", "v"],
  9: ["w", "x", "y", "z"],
};
```

그리고 탐색을 실행할 함수를 생성해주는데, 입력받은 숫자(`digits`)의 자릿수를 나타낼 `idx`와 그 자릿수까지 만들어진 문자열을 나타낼 `letter`를 매개변수로 받는 함수를 생성한다.

```js
const bt = (idx, letter) => {
  // 입력받은 수의 자릿수에 해당하는 수 찾기
  let num = digits[idx];
  // 찾은 수를 키패드에 입력해서 얻을 수 있는 문자들 배열로 가져오기
  let chars = KEYPAD[num];
};
```

숫자에 해당하는 문자열을 반복문을 통해 반복하면서 재귀적으로 이 함수를 다시 실행한다. 한 자릿수를 선택했으면 다음 자릿수를 선택할거니까 `idx + 1`을 인자로 넣어주고 현재 선택한 문자열을 더해서 넘겨준다.

```js
const bt = (idx, letter) => {
  let num = digits[idx];
  let chars = KEYPAD[num];

  for (let c of chars) {
    bt(idx + 1, letter + c);
  }
};
```

그러나 재귀 함수의 종료 조건이 필요하다. idx의 크기가 입력받은 수(digits)의 길이보다 길어진다면 더이상 결정 공간을 만들 수 없으므로 정답 배열에 넣어주면서 종료한다.

```js
if (idx >= digits.length) {
  answer.push(letter);
  return;
}
```

#### 전체 코드

```js
function Solution(digits) {
  const KEYPAD = {
    1: null,
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };

  const answer = [];

  // 빈 문자열이 들어올 경우 return
  if (!digits) return answer;

  const bt = (idx, letter) => {
    // 종료 조건 - 인덱스가 digits의 길이보다 길 경우
    if (idx >= digits.length) return answer.push(letter);

    let num = digits[idx];
    let chars = KEYPAD[num];

    for (let c of chars) bt(idx + 1, letter + c);
  };

  bt(0, "");

  return answer;
}

Solution(input);
```
