# 병사 배치하기

[문제 링크](https://www.youtube.com/watch?v=5Lu34WIx2Us)

### 성능 요약

메모리: 256MB, 시간: 1초

### 문제

N명의 병사가 무작위로 나열되어 있다. 각 병사는 특정한 값의 전투력을 보유하고 있다.
병사를 배치할 대는 **전투력이 높은 병사가 앞쪽에 오도록 내림차순으로 배치**를 하고자 한다. 다시 말해 앞쪽에 있는 병사의 전투력이 항상 뒤쪽에 있는 병사보다 높아야 한다.
또한 배치 과정에서는 특정한 위치에 있는 병사를 열외시키는 방법을 이용한다. 그러면서도 남아 있는 병사의 수가 최대가 되도록 하고 싶다.

예를 들어, N = 7일 때 나열된 병사들의 전투력은 다음과 같다.

<table>
<tr>
<th>병사 변호</th>
<td>1</td>
<td>2</td>
<td>3</td>
<td>4</td>
<td>5</td>
<td>6</td>
<td>7</td>
</tr>
<tr>
<th>전투력</th>
<td>15</td>
<td>11</td>
<td>4</td>
<td>8</td>
<td>5</td>
<td>2</td>
<td>4</td>
</tr>
</table>

이때 3번 병사와 6번 병사를 열외시키면, 다음과 같이 남아 있는 병사의 수가 내림차순의 형태가 되며 5명이 된다. 이는 남아 있는 병사의 수가 최대가 되도록 하는 방법이다.

<table>
<tr>
<th>병사 변호</th>
<td>1</td>
<td>2</td>
<td>4</td>
<td>5</td>
<td>7</td>
</tr>
<tr>
<th>전투력</th>
<td>15</td>
<td>11</td>
<td>8</td>
<td>5</td>
<td>4</td>
</tr>
</table>

병사에 대한 정보가 주어졌을 때, 남아 있는 병사의 수가 최대가 되도록 하기 위해서 열외시켜야 하는 병사의 수를 출력하는 프로그램을 작성하시오.

### 입력

첫째 줄에 N이 주어진다. (1 <= N <= 2,000) 둘째 줄에 각 병사의 전투력이 공백으로 구분되어 차례대로 주어진다. 각 병사의 전투력은 10,000,000보다 작거나 같은 자연수이다.

### 출력

첫째 줄에 남아 있는 병사의 수가 최대가 되도록 하기 위해서 열외시켜야 하는 병사의 수를 출력한다.

### 예제 입력

```
7
15 11 4 8 5 2 4
```

### 예제 출력

```
2
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### Solution

```js
const [n, ...soldiers] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split(/\s/)
  .map((v) => +v);

function Solution(n, soldiers) {
  const dp = new Array(n).fill(0);

  let count = 0;
  for (let i = 1; i < n; i++) {
    if (soldiers[i] > soldiers[i - 1]) count++;

    dp[i] = count;
  }

  console.log(dp);
}

Solution(n, soldiers);
```

이렇게 푸는게 맞나?? 문제의 정답을 체크할 수 없으니 아쉽다. 하지만 그냥 한 번에 답에 도달해서 이게 맞는 것 같은데, 뭘까...?

</div>
</details>
