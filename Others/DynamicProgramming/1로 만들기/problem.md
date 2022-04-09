# 1로 만들기

[문제 링크](https://www.youtube.com/watch?v=5Lu34WIx2Us)

### 성능 요약

메모리: 128MB, 시간: 1초

### 문제

정수 X가 주어졌을 때, 정수 X에 사용할 수 있는 연산은 다음과 같이 4가지다.

1. X가 5로 나누어 떨어지면, 5로 나눈다.
2. X가 3으로 나누어 떨어지면, 3으로 나눈다.
3. X가 2로 나누어 떨어지면, 2로 나눈다.
4. X에서 1을 뺀다.

정수 X가 주어졌을 때, 연산 4개를 적절히 사용해서 값을 1로 만들고자 한다. 연산을 사용하는 횟수의 최솟값을 출력한다. 예를들어 26이면 다음과 같이 계산해서 3번의 연산이 최솟값이다.

26 -> 25 -> 5 -> 1

### 입력

첫째 줄에 정수 X가 주어진다. (1 <= X <= 30,000)

### 출력

첫째 줄에 연산을 하는 횟수의 최솟값을 출력한다.

### 예제 입력

```
26
```

### 예제 출력

```
3
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### 기존 풀이

```js
const n = Number(require("fs").readFileSync("./input.txt").toString().trim());

function Solution(n) {
  let count = 0;
  while (n !== 1) {
    if (n % 5 === 1) {
      n -= 1;
      count++;
    } else if (n % 5 === 0) {
      n /= 5;
      count++;
    } else if (n % 3 === 0) {
      n /= 3;
      count++;
    } else if (n % 2 === 0) {
      n /= 2;
      count++;
    }
  }
  console.log(count);
}

Solution(n);
```

점화식을 어떻게 세워야 할지 잘 감이 오지 않았다. 그래서 최적의 경우의 수를 찾기 위해
if, else 문을 통해 위와 같은 풀이를 했다.

</div>
</details>
