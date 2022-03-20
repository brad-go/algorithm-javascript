# 좌표 정렬하기 - 11651

[문제 링크](https://www.acmicpc.net/problem/10651)

### 성능 요약

메모리: 256MB, 시간 1초

### 문제

2차원 평면 위의 점 N개가 주어진다. 좌표를 y좌표가 증가하는 순으로, y좌표가 같으면 x좌표가 증가하는 순서로 정렬한 다음 출력하는 프로그램을 작성하시오.

### 입력

첫째 줄에 점의 개수 N (1 ≤ N ≤ 100,000)이 주어진다. 둘째 줄부터 N개의 줄에는 i번점의 위치 xi와 yi가 주어진다. (-100,000 ≤ xi, yi ≤ 100,000) 좌표는 항상 정수이고, 위치가 같은 두 점은 없다.

### 출력

첫째 줄부터 N개의 줄에 점을 정렬한 결과를 출력한다.

### 예제 입력

```
5
0 4
1 2
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

### 해결

```js
const [n, ...input] = require("fs")
  .readFileSync("./input.txt")
  .toString()
  .trim()
  .split("\n");

function Solution(input) {
  const coordinates = input.map((item) => {
    const coords = item.split(" ");
    const x = Number(coords[0]);
    const y = Number(coords[1]);
    return { x, y };
  });

  const compare = (coordA, coordB) => {
    if (coordA.y !== coordB.y) {
      return coordA.y - coordB.y;
    }
    if (coordA.x !== coordB.x) {
      return coordA.x - coordB.x;
    }
    return 0;
  };

  let result = "";
  const sortedCoordintes = coordinates.sort(compare);
  sortedCoordintes.forEach((item) => (result += `${item.x} ${item.y}\n`));
  console.log(result.trim());
}

Solution(input);
```

</div>
</details>
