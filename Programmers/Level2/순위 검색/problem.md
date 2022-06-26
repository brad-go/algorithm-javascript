# 순위 검색

## 문제 분류

: 구현, 탐색, 정렬

## 풀이 과정

### Solution 1 (정확성 18/18, 효율성 0/4)

문제의 입력에서 info 배열의 크기가 50,000 query 배열의 크기가 100,000이었지만, 어떻게 정렬하거나 빠르게 찾아내야 할지 떠오르지 않았다. 이진 탐색을 사용하고 싶었지만, 비교해야할 것들이 많아서 방법이 떠오르지 않았다. 그래서 선형 탐색을 이용해서 풀이했고, 당연히 효율성에서 0점을 받게 되었다.

```js
function solution(info, query) {
  var answer = [];

  // 지원자 배열 입력받기
  const volunteers = info.map((i) => i.split(" "));
  // 조건 배열 입력받기
  const qualifications = query.map((q) =>
    q.split(" ").filter((v) => v !== "and")
  );

  const NO_MATTER = "-";

  qualifications.forEach((qualification) => {
    const [lan, group, career, food, score] = qualification;

    let count = 0;

    for (let volunteer of volunteers) {
      const [l, g, c, f, s] = volunteer;

      let qualified = true;

      if (l !== lan && lan !== NO_MATTER) qualified = false;
      if (g !== group && group !== NO_MATTER) qualified = false;
      if (c !== career && career !== NO_MATTER) qualified = false;
      if (f !== food && food !== NO_MATTER) qualified = false;
      if (Number(s) < Number(score)) qualified = false;

      if (qualified) count++;
    }

    answer.push(count);
  });

  return answer;
}
```
