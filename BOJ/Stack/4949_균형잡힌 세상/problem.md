# 균형잡힌 세상 - 4949

[문제 링크](https://www.acmicpc.net/problem/4949)

### 성능 요약

메모리: 128MB, 시간 1초

### 문제

세계는 균형이 잘 잡혀있어야 한다. 양과 음, 빛과 어둠 그리고 왼쪽 괄호와 오른쪽 괄호처럼 말이다.

정민이의 임무는 어떤 문자열이 주어졌을 때, 괄호들의 균형이 잘 맞춰져 있는지 판단하는 프로그램을 짜는 것이다.

문자열에 포함되는 괄호는 소괄호("()") 와 대괄호("[]")로 2종류이고, 문자열이 균형을 이루는 조건은 아래와 같다.

모든 왼쪽 소괄호("(")는 오른쪽 소괄호(")")와만 짝을 이뤄야 한다.
모든 왼쪽 대괄호("[")는 오른쪽 대괄호("]")와만 짝을 이뤄야 한다.
모든 오른쪽 괄호들은 자신과 짝을 이룰 수 있는 왼쪽 괄호가 존재한다.
모든 괄호들의 짝은 1:1 매칭만 가능하다. 즉, 괄호 하나가 둘 이상의 괄호와 짝지어지지 않는다.
짝을 이루는 두 괄호가 있을 때, 그 사이에 있는 문자열도 균형이 잡혀야 한다.
정민이를 도와 문자열이 주어졌을 때 균형잡힌 문자열인지 아닌지를 판단해보자.

### 입력

하나 또는 여러줄에 걸쳐서 문자열이 주어진다. 각 문자열은 영문 알파벳, 공백, 소괄호("( )") 대괄호("[ ]")등으로 이루어져 있으며, 길이는 100글자보다 작거나 같다.

입력의 종료조건으로 맨 마지막에 점 하나(".")가 들어온다.

### 출력

각 줄마다 해당 문자열이 균형을 이루고 있으면 "yes"를, 아니면 "no"를 출력한다.

### 예제 입력 1

```
So when I die (the [first] I will see in (heaven) is a score list).
[ first in ] ( first out ).
Half Moon tonight (At least it is better than no Moon at all].
A rope may form )( a trail in a maze.
Help( I[m being held prisoner in a fortune cookie factory)].
([ (([( [ ] ) ( ) (( ))] )) ]).
 .
.
```

### 예제 출력 1

```
yes
yes
no
no
no
yes
yes
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### 실패

```js
const [...input] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

function Solution(input) {
  const string = input.slice(0, -1);
  let result = "";

  for (let line of string) {
    const regex = /[^\(\)\[\].]/g;
    const parenthesis = line.replace(regex, "");
    const stack = [];

    for (let i = 0; i < parenthesis.length; i++) {
      const cur = parenthesis[i];

      if (cur === ".") {
        result += stack.length === 0 ? "yes\n" : "no\n";
        break;
      }

      if (cur === "(" || cur === "[") {
        stack.push(cur);

        continue;
      }

      if (cur === "]" && stack[stack.length - 1] === "[") {
        stack.pop();
        continue;
      } else if (cur === "]" && stack[stack.length - 1] === "(") {
        result += "no\n";
        break;
      }

      if (cur === ")" && stack[stack.length - 1] === "(") {
        stack.pop();
        continue;
      } else if (cur === ")" && stack[stack.length - 1] === "[") {
        result += "no\n";
        break;
      }
    }
  }

  console.log(result.trim());
}

Solution(input);
```

정규식을 이용해서 괄호를 제외한 문자열을 제거하고, 문제를 풀어보려고 했다. 이전과 같은 방식으로 스택 하나를 두고 조건에 따라 해결해보려고 했는데, 코드가 점점 길어지면서 스파게티 코드가 되버렸다. 더이상 코드를 이해할 수 없었고, 문제를 푸는데 실패했다.

### Solution

```js
function Solution(input) {
  const lines = input.slice(0, -1);

  const open = ["(", "["];
  const close = [")", "]"];

  const result = [];

  for (let line of lines) {
    const stack = [];
    let valid = true;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (open.includes(char)) stack.push(char);
      else if (close.includes(char)) {
        if (stack.pop() !== open[close.indexOf(char)]) {
          result.push("no");
          valid = false;
          break;
        }
      }
    }

    if (valid) {
      if (stack.length === 0) result.push("yes");
      else result.push("no");
    }
  }

  console.log(result.join("\n"));
}

Solution(input);
```

- 여는 괄호, 닫는 괄호를 가진 각각의 배열을 만든다.
- 반복문을 돌면서 문자열이 여는 괄호 배열에 포함된다면 스택에 넣는다.
- 문자열이 닫는 괄호에 포함된다면 스택에서 하나 꺼낸다.

  - 닫는 괄호 배열에서 현재 문자가 몇번째 인덱스인지 확인한다. (소괄호인지, 중괄호인지)
  - 여는 괄호 배열의 같은 인덱스 번호를 가진 문자를 찾는다.
  - 스택에서 꺼낸 것과 비교한 후 다르다면 균형을 이루지 않는 것이므로 종료한다.

- 문자열을 끝까지 확인했을 때, 균형잡힌 것으로 생각되면 스택에 남아있는 길이를 확인한다.
- 길이가 0이라면 통과 아니면 패스

다른 방식을 생각하다가 도저히 모르겠어서 다른 사람의 풀이를 봤다.
왜 저런 방식을 생각못했을까 ㅠ 나는 오히려 스택을 두개를 두고 풀이를 해보려고했는데, 제대로 동작하게 구현하지 못했다.

</div>
</details>
