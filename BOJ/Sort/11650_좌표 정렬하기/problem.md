# 좌표 정렬하기 - 11650

[문제 링크](https://www.acmicpc.net/problem/10650)

### 성능 요약

메모리: 256MB, 시간 1초

### 문제

2차원 평면 위의 점 N개가 주어진다. 좌표를 x좌표가 증가하는 순으로, x좌표가 같으면 y좌표가 증가하는 순서로 정렬한 다음 출력하는 프로그램을 작성하시오.

### 입력

첫째 줄에 점의 개수 N (1 ≤ N ≤ 100,000)이 주어진다. 둘째 줄부터 N개의 줄에는 i번점의 위치 xi와 yi가 주어진다. (-100,000 ≤ xi, yi ≤ 100,000) 좌표는 항상 정수이고, 위치가 같은 두 점은 없다.

### 출력

첫째 줄부터 N개의 줄에 점을 정렬한 결과를 출력한다.

### 예제 입력

```
5
3 4
1 1
1 -1
2 2
3 3
```

### 예제 출력

```
1 -1
1 1
2 2
3 3
3 4
```

<details><summary><b>문제 풀이</b></summary>
<div markdown="1">

### 실패

#### 시간 초과로 실패

```js
const [n, ...input] = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

function Solution(n, input) {
  const coordiantes = input.map((item) => item.split(" ").map((v) => +v));

  const compare = (coordA, coordB) => {
    if (coordA[0] > coordB[0]) {
      return 1;
    }
    if (coordA[0] < coordB[0]) {
      return -1;
    }
    if (coordA[1] > coordB[1]) {
      return 1;
    }
    if (coordA[1] < coordB[1]) {
      return -1;
    }
    return 0;
  };

  const sortedCoordintes = coordiantes.sort(compare);
  sortedCoordintes.forEach((item) => console.log(item.join(" ")));
}

Solution(n, input);
```

### 해결

#### 가독성을 위해 객체로 만들기

##### 기존 코드

```js
const coordiantes = input.map((item) => item.split(" ").map((v) => +v));
```

##### 수정 코드

```js
const coordinates = input.map((item) => {
  const coords = item.split(" ");
  const x = Number(coords[0]);
  const y = Number(coords[1]);
  return { x, y };
});
```

sort 메서드를 사용할 때, 좌표를 비교하려면 `arr[0]` 이런식으로 사용해야 하는데 객체로 만들어 `arr.x`, `arr.y`로 만들어 가독성을 높였다. 그리고 `map`을 두 번 사용하게 되면 시간 복잡도가 더 높아지게 되므로 위와 같이 작성했다.

#### console.log() 한번만 사용하기

##### 기존 코드

```js
const sortedCoordintes = coordiantes.sort(compare);
sortedCoordintes.forEach((item) => console.log(item.join(" ")));
```

##### 수정 코드

```js
let result = "";
const sortedCoordintes = coordinates.sort(compare);
sortedCoordintes.forEach((item) => (result += `${item.x} ${item.y}\n`));
console.log(result.trim());
```

`result`라는 문자열 변수를 만들어 `console.log()`를 한 번만 사용함으로 해결할 수 있었다.

</div>
</details>
