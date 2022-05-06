# 괄호 변환

## 문제 분류

: 구현

## 문제 설명

카카오에 신입 개발자로 입사한 "콘"은 선배 개발자로부터 개발역량 강화를 위해 다른 개발자가 작성한 소스 코드를 분석하여 문제점을 발견하고 수정하라는 업무 과제를 받았습니다. 소스를 컴파일하여 로그를 보니 대부분 소스 코드 내 작성된 괄호가 개수는 맞지만 짝이 맞지 않은 형태로 작성되어 오류가 나는 것을 알게 되었습니다.
수정해야 할 소스 파일이 너무 많아서 고민하던 "콘"은 소스 코드에 작성된 모든 괄호를 뽑아서 올바른 순서대로 배치된 괄호 문자열을 알려주는 프로그램을 다음과 같이 개발하려고 합니다.

### 용어의 정의

'(' 와 ')' 로만 이루어진 문자열이 있을 경우, '(' 의 개수와 ')' 의 개수가 같다면 이를 `균형잡힌 괄호 문자열`이라고 부릅니다.
그리고 여기에 '('와 ')'의 괄호의 짝도 모두 맞을 경우에는 이를 `올바른 괄호 문자열`이라고 부릅니다.
예를 들어, `"(()))("`와 같은 문자열은 "균형잡힌 괄호 문자열" 이지만 "올바른 괄호 문자열"은 아닙니다.
반면에 `"(())()"`와 같은 문자열은 "균형잡힌 괄호 문자열" 이면서 동시에 "올바른 괄호 문자열" 입니다.

'(' 와 ')' 로만 이루어진 문자열 w가 "균형잡힌 괄호 문자열" 이라면 다음과 같은 과정을 통해 "올바른 괄호 문자열"로 변환할 수 있습니다.

```js
1. 입력이 빈 문자열인 경우, 빈 문자열을 반환합니다.
2. 문자열 w를 두 "균형잡힌 괄호 문자열" u, v로 분리합니다. 단, u는 "균형잡힌 괄호 문자열"로 더 이상 분리할 수 없어야 하며, v는 빈 문자열이 될 수 있습니다.
3. 문자열 u가 "올바른 괄호 문자열" 이라면 문자열 v에 대해 1단계부터 다시 수행합니다.
   3-1. 수행한 결과 문자열을 u에 이어 붙인 후 반환합니다.
4. 문자열 u가 "올바른 괄호 문자열"이 아니라면 아래 과정을 수행합니다.
   4-1. 빈 문자열에 첫 번째 문자로 '('를 붙입니다.
   4-2. 문자열 v에 대해 1단계부터 재귀적으로 수행한 결과 문자열을 이어 붙입니다.
   4-3. ')'를 다시 붙입니다.
   4-4. u의 첫 번째와 마지막 문자를 제거하고, 나머지 문자열의 괄호 방향을 뒤집어서 뒤에 붙입니다.
   4-5. 생성된 문자열을 반환합니다.
```

"균형잡힌 괄호 문자열" p가 매개변수로 주어질 때, 주어진 알고리즘을 수행해 "올바른 괄호 문자열"로 변환한 결과를 return 하도록 solution 함수를 완성해 주세요.

### 매개변수 설명

p는 '(' 와 ')' 로만 이루어진 문자열이며 길이는 2 이상 1,000 이하인 짝수입니다.
문자열 p를 이루는 '(' 와 ')' 의 개수는 항상 같습니다.
만약 p가 이미 "올바른 괄호 문자열"이라면 그대로 return 하면 됩니다.

## 입출력 예

| P          | result     |
| ---------- | ---------- |
| "(()())()" | "(()())()" |
| ")("       | "()"       |
| "()))((()" | "()(())()" |

## 입출력 예 설명

### 입출력 예 #1

이미 "올바른 괄호 문자열" 입니다.

### 입출력 예 #2

- 두 문자열 u, v로 분리합니다.
  - u = `")("`
  - v = `""`
- u가 "올바른 괄호 문자열"이 아니므로 다음과 같이 새로운 문자열을 만듭니다.
  - v에 대해 1단계부터 재귀적으로 수행하면 빈 문자열이 반환됩니다.
  - u의 앞뒤 문자를 제거하고, 나머지 문자의 괄호 방향을 뒤집으면 `""`이 됩니다.
  - 따라서 생성되는 문자열은 `"("` + `""` + `")"` + `""`이며, 최종적으로 `"()"`로 변환됩니다.

### 입출력 예 #3

- 두 문자열 u, v로 분리합니다.
  - u = `"()"`
  - v = `"))((()"`
- 문자열 u가 "올바른 괄호 문자열"이므로 그대로 두고, v에 대해 재귀적으로 수행합니다.
- 다시 두 문자열 u, v로 분리합니다.
  - u = `"))(("`
  - v = `"()"`
- u가 "올바른 괄호 문자열"이 아니므로 다음과 같이 새로운 문자열을 만듭니다.
  - v에 대해 1단계부터 재귀적으로 수행하면 `"()"`이 반환됩니다.
  - u의 앞뒤 문자를 제거하고, 나머지 문자의 괄호 방향을 뒤집으면 `"()"`이 됩니다.
  - 따라서 생성되는 문자열은 `"("` + `"()"` + `")"` + `"()"`이며, 최종적으로 `"(())()"`를 반환합니다.
- 처음에 그대로 둔 문자열에 반환된 문자열을 이어 붙이면 `"()"` + `"(())()"` = `"()(())()"`가 됩니다.

<details><summary><b>문제 풀이</b></summary><div markdown="1">

```js
function Solution(p) {
  const brackets = {
    open: "(",
    close: ")",
  };

  // 균형잡힌 괄호인지 체크하는 함수
  const isBalanced = (p) => {
    let open = 0;
    let close = 0;

    for (let i = 0; i < p.length; i++) {
      if (p[i] === brackets.open) open++;
      else close++;
    }

    return open === close;
  };

  // 올바른 괄호인지 체크하는 함수
  const isCorrect = (p) => {
    const stack = [];

    for (let i = 0; i < p.length; i++) {
      if (p[i] === brackets.open) stack.push(p[i]);
      else stack.pop();
    }

    return stack.length === 0;
  };

  // 괄호를 u, v로 나누기
  const seperateBrakets = (p) => {
    for (let i = 0; i < p.length; i++) {
      if (isBalanced(p.slice(0, i + 1)) && isBalanced(p.slice(i + 1))) {
        return [p.slice(0, i + 1), p.slice(i + 1)];
      }
    }
    return [p, ""];
  };

  // 괄호가 올바르지 않다면 변환하기
  const convertBrakets = (p) => {
    if (isCorrect(p)) return p;

    let txt = "";
    const [u, v] = seperateBrakets(p);

    if (isCorrect(u)) {
      return u + convertBrakets(v);
    } else {
      let u2 = u.slice(1, -1).split("").reverse().join("");
      let string = brackets.open + convertBrakets(v) + brackets.close + u2;

      return string;
    }
  };

  const answer = convertBrakets(p);
  console.log(answer);
}

Solution(p);
```

한참을 걸려서 문제를 이해하고 제출했는데, 12번부터 통과가 되지 않는다.

### Solution

정말 오래 걸려서 해답을 찾았다. 문제는 문제를 제대로 이해하지 못한 것이었다.
문제에서 "괄호의 방향을 바꾸고"라는 말이 있는데, 이는 괄호 문자열의 순서를 뒤집으란 소리가 아니라
말그대로 괄호들 각각의 방향을 바꾸라는 뜻이었다. 그 부분을 고치니 바로 해결되었다.

기존의 괄호를 뒤집는 코드는 아래와 같다.

```js
let u2 = u.slice(1, -1).split("").reverse().join("");
```

위 코드를 다음과 같이 바꿔주었다.

```js
let u2 = u
  .slice(1, -1)
  .split("")
  .map((el) => (el === brackets.open ? brackets.close : brackets.open))
  .join("");
```

이 부분도 중요한 것 같다. u, v를 나눌 때, 둘다 균형잡힌 것인지 확인하고 분할을 하는 함수 부분이다.

```js
const seperateBrakets = (p) => {
  for (let i = 0; i < p.length; i++) {
    if (isBalanced(p.slice(0, i + 1)) && isBalanced(p.slice(i + 1))) {
      return [p.slice(0, i + 1), p.slice(i + 1)];
    }
  }
  return [p, ""];
};
```

사실 이 문제는 다시 풀라면 풀 수 있을지 모르겠다. 정말 이게 돼? 왜 안돼? 하며 조마조마 하면서 문제를 풀었다.

전체 코드는 다음과 같다.

```js
function Solution(p) {
  const brackets = {
    open: "(",
    close: ")",
  };

  // 균형잡힌 괄호인지 체크하는 함수
  const isBalanced = (p) => {
    let open = 0;
    let close = 0;

    for (let i = 0; i < p.length; i++) {
      if (p[i] === brackets.open) open++;
      else close++;
    }

    return open === close;
  };

  // 올바른 괄호인지 체크하는 함수
  const isCorrect = (p) => {
    const stack = [];

    for (let i = 0; i < p.length; i++) {
      if (p[i] === brackets.open) stack.push(p[i]);
      if (p[i] === brackets.close && stack[stack.length - 1] === brackets.open)
        stack.pop();
    }

    return stack.length === 0;
  };

  // 괄호를 u, v로 나누기
  const seperateBrakets = (p) => {
    for (let i = 0; i < p.length; i++) {
      if (isBalanced(p.slice(0, i + 1)) && isBalanced(p.slice(i + 1))) {
        return [p.slice(0, i + 1), p.slice(i + 1)];
      }
    }
    return [p, ""];
  };

  // 괄호가 올바르지 않다면 변환하기
  const convertBrakets = (p) => {
    if (isCorrect(p)) return p;

    let txt = "";
    const [u, v] = seperateBrakets(p);

    if (isCorrect(u)) {
      return u + convertBrakets(v);
    } else {
      let u2 = u
        .slice(1, -1)
        .split("")
        .map((el) => (el === brackets.open ? brackets.close : brackets.open))
        .join("");

      let string = brackets.open + convertBrakets(v) + brackets.close + u2;

      return string;
    }
  };

  const answer = convertBrakets(p);
  return answer;
}
```

</div></details>
