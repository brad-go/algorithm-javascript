# 잃어버린 괄호 - 1541

[문제 링크](https://www.acmicpc.net/problem/1541)

## 문제 풀이

처음에 입력으로 주어진 문자열을 탐색하면서 -, + 연산을 만날때마다 다른 연산을 부여하려면 파싱을 어떻게 할까가 고민이었다. 정규식이 떠올라서 우선 연산자와 숫자로 나눴다.
최솟값을 만들기 위한 프로그램이라.. 직접 괄호를 하나하나 넣어볼 필요가 있을까? 하고 생각했다.

-가 있으면 다시 -가 나오기 전까지 그것들은 모두 괄호로 묶어도 된다는 것을 식을 쳐다보다가 알게되었다.

### 풀이 설명

1. 정규식을 이용해 연산자와 숫자들로 나눠준다.
2. 숫자의 수가 연산자 수보다 하나 더 많으므로 숫자 배열에서 첫번째 값을 떼어내어 정답 값에 넣어준다.
3. 괄호 안인지 밖인지를 표현할 변수를 하나 생성한다.
4. 배열의 길이만큼 반복하면서 -기호를 만나면 괄호 안으로 여기고 그 안의 그 안의 코드를 수행한다.
5. -기호를 만난 뒤에는 모두 숫자를 빼준다.

-기호를 만난 뒤에는 모두 숫자를 빼도 괜찮다. 빼기 연산자 다음의 수부터 괄호로 묶인다면 다시 -가 나오기 전까지 모두 음수로 만들 수 있다. 또 그 빼기 연산자 뒤의 수부터는 다시 괄호로 묶어 다시 빼기 연산자 전까지 모두 음수로 만들 수 있다. 그러므로 처음 -기호를 만나면 모두 음수로 여겨서 모두 빼줄 수 있다.

### 전체 코드

```js
const input = require("fs").readFileSync("./input4.txt").toString().trim();

const solution = (input) => {
  const operator = input.split(/\d/).filter((v) => v !== "");
  const numbers = input.split(/\D/).map(Number);

  let answer = numbers.shift();
  let inParenthesis = false;

  for (let i = 0; i < numbers.length; i++) {
    if (operator[i] === "-") inParenthesis = true;

    if (inParenthesis) {
      answer -= numbers[i];
      continue;
    }

    answer += numbers[i];
  }

  console.log(answer);
};

solution(input);
```

### 코드 개선

코드를 조금 더 개선하면 다음과 같다. 속도는 기존 코드가 가장 빠르지만 더 깔끔한 방식을 찾아보았다.

이 방식은 코드가 정말 간결해진다. 정규식을 이용하지 않고, 뺄셈 기호를 기준으로 먼저 식을 분할해준 뒤에, 각 요소들을 다시 한번 더하기 기호를 기준으로 분할 한 후에 더해준다. 이렇게 하면 빼기 기호를 기준으로 수들은 모두 더해져있다.

그리고 첫번째 수에서 나머지 수를 빼주면 된다.

```js
const solution = (input) => {
  // prettier-ignore
  const numbers = input.split("-").map((str) => 
    str.split("+").map(Number).reduce((acc, cur) => acc + cur), 0
  );
  // 첫번째 인자를 전달하지 않음으로써 배열이 첫번째 요소를 사용
  const answer = numbers.reduce((acc, cur) => acc - cur);
  console.log(answer);
};

solution(input);
```

두번째 다른 방식은 내 기존 풀이와 마찬가지로 정규식을 이용한다. 정규식을 이용해 모든 숫자만을 추출하고 첫번째 음수 기호의 인덱스를 찾는다. 그리고 그 인덱스를 기준으로 배열을 나눠서 양수, 음수를 만든 후 양수에서 음수를 빼주면 된다.

```js
const solution = (input) => {
  const sum = (arr) => {
    // prettier-ignore
    return arr.split(/[\+-]/).map(Number).reduce((acc, cur) => acc + cur, 0)
  };

  const firstMinus = input.indexOf("-");

  if (firstMinus === -1) console.log(sum(input));
  else {
    const positive = sum(input.slice(0, firstMinus));
    const negative = sum(input.slice(firstMinus + 1));
    console.log(positive - negative);
  }
};

solution(input);
```
