# 괄호 - 9012

[문제 링크](https://www.acmicpc.net/problem/9012)

### 성능 요약

메모리: 256MB, 시간 1초

### 문제

괄호 문자열(Parenthesis String, PS)은 두 개의 괄호 기호인 ‘(’ 와 ‘)’ 만으로 구성되어 있는 문자열이다. 그 중에서 괄호의 모양이 바르게 구성된 문자열을 올바른 괄호 문자열(Valid PS, VPS)이라고 부른다. 한 쌍의 괄호 기호로 된 “( )” 문자열은 기본 VPS 이라고 부른다. 만일 x 가 VPS 라면 이것을 하나의 괄호에 넣은 새로운 문자열 “(x)”도 VPS 가 된다. 그리고 두 VPS x 와 y를 접합(concatenation)시킨 새로운 문자열 xy도 VPS 가 된다. 예를 들어 “(())()”와 “((()))” 는 VPS 이지만 “(()(”, “(())()))” , 그리고 “(()” 는 모두 VPS 가 아닌 문자열이다.

여러분은 입력으로 주어진 괄호 문자열이 VPS 인지 아닌지를 판단해서 그 결과를 YES 와 NO 로 나타내어야 한다.

### 입력

입력 데이터는 표준 입력을 사용한다. 입력은 T개의 테스트 데이터로 주어진다. 입력의 첫 번째 줄에는 입력 데이터의 수를 나타내는 정수 T가 주어진다. 각 테스트 데이터의 첫째 줄에는 괄호 문자열이 한 줄에 주어진다. 하나의 괄호 문자열의 길이는 2 이상 50 이하이다.

### 출력

출력은 표준 출력을 사용한다. 만일 입력 괄호 문자열이 올바른 괄호 문자열(VPS)이면 “YES”, 아니면 “NO”를 한 줄에 하나씩 차례대로 출력해야 한다.

### 예제 입력 1

```
6
(())())
(((()())()
(()())((()))
((()()(()))(((())))()
()()()()(()()())()
(()((())()(
```

### 예제 출력 1

```
NO
NO
YES
NO
YES
NO
```

### 예제 입력 2

```
3
((
))
())(()
```

### 예제 출력 2

```
NO
NO
NO
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### 첫 번째 시도

```js
const [n, ...input] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

function Solution(input) {
  for (let string of input) {
    const stackLeft = [];
    const stackRight = [];
    const parenthesis = string.split("");
    parenthesis.forEach((ps) => {
      if (ps === "(") stackLeft.push(ps);
      else stackRight.push(ps);
    });
    console.log(stackLeft.length === stackRight.length ? "YES" : "NO");
  }
}

Solution(input);
```

문제를 너무 가볍게 생각했다. 스택을 제대로 이용할 생각을 못하고 괄호의 수만 같으면 문제가 해결될거라고 생각하고, 문제를 풀이했고 당연히 실패였다.

### Solution

```js
// 생략....
function Solution(input) {
  let result = "";
  for (let line of input) {
    const parenthesis = line.split("");

    const stack = [];
    while (parenthesis.length > 0) {
      const cur = parenthesis.pop();

      if (cur === ")") {
        stack.push(cur);
        continue;
      }
      if (cur === "(" && stack[0] === ")") {
        stack.pop();
      } else {
        stack.push(cur);
      }
    }
    if (stack.length > 0) result += "NO\n";
    else result += "YES\n";
  }
  console.log(result.trim());
}

Solution(input);
```

- 각 줄마다 들어온 입력을 `split()`해서 괄호들을 쪼개 배열에 담는다.
- stack 역할을 할 빈 배열 생성
- 쪼갠 괄호들의 배열의 길이가 0보다 클때까지 반복문을 돈다.
- 한 턴마다 가장 마지막 인덱스를 꺼내서 조건을 확인한다.
- 괄호가 ')'라면 스택에 넣고
- '(' 이면서 스택에 첫번째가 ')'라면 `pop()`, 아니라면 `push()` 한다.
  - 스택에는 ')'밖에 없으니까 '('를 만나면 유효한 괄호 모양이 된다.
- 반복문을 돌고 스택의 길이가 0보다 크다면 유효하지 않은 배열, 0이라면 유효한 배열이므로 각각 NO, YES를 result 문자열에 담아 출력한다.

### Solution 2

```js
function Solution(n, input) {
  let result = "";
  for (let i = 0; i < n; i++) {
    let stack = 0;

    for (let parenthesis of input[i]) {
      stack += parenthesis === "(" ? 1 : -1;

      if (stack < 0) break;
    }

    result += stack === 0 ? "YES\n" : "NO\n";
  }
  console.log(result.trim());
}

Solution(n, input);
```

- 기호 '(' 와 ')'의 개수를 세서 '('일시 1을 더해주고, ')' 이면 1을 뺐다.
- 괄호가 굳이 사용되야 할 필요가 없었으므로, 스택을 추상화.
- 만약 유효한 괄호를 가진 문자열이면 0이되야함.
- 만약 stack이 0 이하로 내려가면 유효하지 않은 문자열이므로 예외처리

### Solution 3

```js
const [n, ...input] = require("fs")
  .readFileSync("./input2.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(n, input) {
  const result = [];

  const validation = (parenthesis) => {
    const validateResult = parenthesis.replace(/\(\)/g, "");

    if (parenthesis.length !== validateResult.length) {
      return validation(validateResult);
    }

    return parenthesis[0] === ")" || parenthesis[parenthesis.length - 1] === "("
      ? "NO"
      : "YES";
  };

  for (let i = 0; i < n; i++) {
    result.push(validation(input[i]));
  }

  console.log(result.join("\n"));
}

Solution(n, input);
```

재귀로 푸는 방식을 보게되었다. 다들 정말 대단한 것 같다.

- 반복문을 돌면서 한 줄씩 유효한 괄호를 검사하는 함수의 결과를 result 배열에 넣는다.
- validation 함수는 정규식을 이용해 '()' 괄호를 제거한다.
- 제거한 결과와 들어온 문자열의 길이가 다르면 괄호를 더 제거해야 하므로 다시 validation 함수에 제거한 결과를 넣어준다. (재귀)
- 길이가 같아지면 남은 문자열이 있다면 유효하지 않은 괄호이다.

</div>
</details>

- 참고 : https://gurtn.tistory.com/68
